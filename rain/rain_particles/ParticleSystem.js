var bannerboy = bannerboy || {};

/* ParticleSystem class
================================================= */

bannerboy.ParticleSystem = function(settings) {

	// combine settings with default values
	this.settings = bannerboy.combineObjects({
		preCalc: false,
		autoStart: true,
		gravity: 0.06,
		wind: 0,		
		turbulence: 0.1,
		friction: 0.97,
		vx: 0,
		vy: 0,
		areaPadding: 50,		
		opacity: 1,
		scale: 1,
		rotationSpeed: 0,
		rotation: 1,
		fps: 60,
		reverseRender: false,
		recycleStrays: true,
		immortal: false,
	}, settings);
	
	// properties that shouldn't go into createElement in any of the renderers
	this.deleteProps = ["preCalc", "scale", "rotation", "opacity", "reverseRender", "images", "clearCanvas", "autoStart", "emitter", "onUpdate", "onUpdateParticle", "onUpdateParticles", "onEmitParticle", "renderParticle", "renderParticles"];

	// create renderer
	this.renderer = new bannerboy.ParticleRenderer(this.settings, this);
	
	// if no emitter provided set it to the same size as the canvas
	this.emitter = this.settings.emitter || {
		x: 0,
		y: 0,
		width: this.renderer.width,
		height: this.renderer.height
	};
	
	// store a copy of the image array if provided
	if(this.settings.images) this.images = this.settings.images.slice();

	// set particle update callbacks (these will be ignored if null)
	this.onEmitParticle = this.settings.onEmitParticle;
	this.onUpdateParticle = this.settings.onUpdateParticle;
	this.onUpdateParticles = this.settings.onUpdateParticles;

	// override render functions if provided
	if(this.settings.renderParticle) this.renderer.renderParticle = this.settings.renderParticle;
	if(this.settings.renderParticles) this.renderer.renderParticles = this.settings.renderParticles;

	// calculate lifespan / particlesPerSecond / maxParticles
	this.lifespan = this.settings.lifespan;
	this.maxParticles = this.settings.maxParticles;
	this.particlesPerSecond = this.settings.particlesPerSecond;
	if(this.maxParticles && this.particlesPerSecond && this.lifespan) {
		this.lifespan = null; // ignore lifespan if all three are provided
		console.log("Particles: Lifespan changed to honor maxParticles & particlesPerSecond");
	}
	if(!this.maxParticles) this.maxParticles = this.lifespan * this.particlesPerSecond;
	if(!this.particlesPerSecond) this.particlesPerSecond = this.maxParticles / this.lifespan;
	if(!this.lifespan) this.lifespan = this.maxParticles / this.particlesPerSecond;
	
	console.log("Particles:\n\tRenderer: " + this.renderer.type + "\n\tLifespan: " + this.lifespan + "\n\tMax particles: " + this.maxParticles + "\n\tParticles per second: " + this.particlesPerSecond);
	
	// time variables
	
	this.oldTime = new Date().getTime() / 1000;
	this.lastEmitTime = this.oldTime;
	this.currentTime;
	this.fps = this.settings.fps;
	this.updateInterval = (1 / this.settings.fps);
	this.isRunning = false;
	this.deltaTime;
	this.emitInterval = (1 / this.particlesPerSecond);
	this.particlesPerFrame = this.updateInterval / this.emitInterval;
	this.particleRest = 0;
	
	// create particles
	this.activeParticles = [];
	this.idleParticles = [];

	if(this.images) this.prepareImages();
	for(var i = 0; i < this.maxParticles; ++i) {
		var particle = new bannerboy.Particle(0, 0, 0, 0);
		this.idleParticles.push(particle);
		if(this.renderer.onCreateParticle) this.renderer.onCreateParticle(particle);
	}

	if(this.renderer.onInit) this.renderer.onInit(this.idleParticles);

	// preCalc
	if(this.settings.preCalc) this.preCalc();

	// autostart
	if(this.settings.autoStart) this.start();
}

bannerboy.ParticleSystem.prototype.preCalc = function() {
	
	// pre-run particle system one cycle before starting to render
	var precalcFrames = this.lifespan * this.fps;
	for(var i = 0; i < precalcFrames; ++i) {
		this.update(i + 1);
	}
	this.settings.preCalc = false // only do this once...
	this.update();
}

bannerboy.ParticleSystem.prototype.start = function() {
	this.isRunning = true;

	// start update	
	TweenLite.ticker.addEventListener("tick", this.update, this);
}

bannerboy.ParticleSystem.prototype.stop = function(hard) {
	// stop update
	this.isRunning = false;
	if(hard) {
		console.log("removeEventListener")
		TweenLite.ticker.removeEventListener("tick", this.update);
	}
}

bannerboy.ParticleSystem.prototype.prepareImages = function() {
	for(var i = 0; i < this.images.length; ++i) {
		var img = new Image();
		img.src = this.images[i];
		this.images[i] = img;
	}
}

// main update
bannerboy.ParticleSystem.prototype.update = function(preCalc) {

	// calculate time stuff
	this.currentTime = preCalc ? preCalc * (1/30) : new Date().getTime() / 1000;
	this.deltaTime = (this.currentTime - this.oldTime);
		
	if(preCalc || this.fps == 60 || this.deltaTime > this.updateInterval) {

		this.oldTime = this.currentTime - (this.deltaTime % this.updateInterval);

		// abort if last update was suspiciously long ago, user has returned from other tab
		if(this.deltaTime > this.updateInterval * 3) return;
		
		var sum = this.particlesPerFrame + this.particleRest;
		this.particleRest = sum % 1;

		// emit new particle if it is time
		if(this.isRunning || preCalc) {
			this.emitParticles(Math.floor(sum));
		}
		
		// call onUpdate callback (if provided)
		if(this.onUpdateParticles) this.onUpdateParticles(this.activeParticles)

		// loop through all active particles
		var i = this.activeParticles.length;
		while(i--) {

			var particle = this.activeParticles[i];		

			// apply wind, gravity and turbulence
			if(this.settings.wind || this.settings.gravity) particle.accelerate(this.settings.wind, this.settings.gravity);
			if(this.settings.turbulence) particle.accelerate(bannerboy.utils.randomRange(-this.settings.turbulence, this.settings.turbulence), bannerboy.utils.randomRange(-this.settings.turbulence, this.settings.turbulence));

			// call onUpdateParticle callback (if provided)
			if(this.onUpdateParticle) this.onUpdateParticle(particle);

			// update particle with new values
			particle.update(this.deltaTime);

			// retire particle 
			if(

				// if it's out of bounds
				(this.settings.recycleStrays &&
					(particle.x < -this.settings.areaPadding ||
					 particle.x > this.renderer.width + this.settings.areaPadding ||
				 	 particle.y < -this.settings.areaPadding ||
				 	 particle.y > this.renderer.height + this.settings.areaPadding)
				)
				// or if older than lifespan
				|| !this.settings.immortal && particle.age > this.lifespan * this.fps
				
			) {
				this.idleParticles.push(this.activeParticles.splice(i, 1)[0]);
				if(this.renderer.onParticleDeath) this.renderer.onParticleDeath(particle);
			}
		}

		// render particles
		this.renderer.renderParticles(this.settings.reverseRender ? this.activeParticles.slice().reverse() : this.activeParticles);
	}

	if(!this.activeParticles.length && !this.isRunning) { // soft stop has played out
		this.stop(true); // do hard stop
	}
}

// activate particles
bannerboy.ParticleSystem.prototype.emitParticles = function(numberToActivate) {
	
	// function is explicitly called from implementation side
	// temporarily unpause to get the update going
	if(!this.isRunning && !this.settings.preCalc) {
		this.start();
		this.isRunning = false;
	}

	for(var i = 0; i < numberToActivate; ++i) {

		// grab an idle particle if possible, otherwise repurpose a live one (if legal)
		var particle;
		if(this.idleParticles.length) {
			particle = this.idleParticles.shift();
		} else if(!this.settings.immortal) {
			particle = this.activeParticles.shift();
		} else {
			return;
		}
		
		// reset life
		particle.age = 0;
		particle.progress = 0;
		particle.lifeCurve = 0;

		// reset connections to other particles
		particle.springs = [];
		particle.gravitations = [];

		// set position somewhere within the emitter
		particle.x = this.emitter.x + Math.random() * (this.emitter.width || 0);
		particle.y = this.emitter.y + Math.random() * (this.emitter.height || 0);

		// set 
		particle.opacity = this.settings.opacity;
		particle.lifespan = this.lifespan * this.fps;
		particle.friction = this.settings.friction;
		particle.rotationSpeed = this.settings.rotationSpeed;
		
		if(this.settings.heading != null && this.settings.speed != null) {			
			particle.setSpeed(this.settings.speed);
			particle.setHeading(this.settings.heading);
		} else {
			particle.vx = this.settings.vx;
			particle.vy = this.settings.vy;
		}
		
		particle.scale = this.settings.scale;
		particle.rotation = this.settings.rotation;

		// randomize image (if provided)
		if(this.images) particle.img = this.images[bannerboy.utils.randomInt(0, this.images.length - 1)];
		
		// call onEmitParticle callback (if provided)
		if(this.onEmitParticle) this.onEmitParticle(particle);
		if(this.renderer.onEmitParticle) this.renderer.onEmitParticle(particle);
		
		// activate!
		this.activeParticles.push(particle);
	}		
}
