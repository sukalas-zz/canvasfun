var bannerboy = bannerboy || {};

/* Canvas ParticleRenderer class
================================================= */

bannerboy.ParticleRenderer = function(settings, system) {
	
	this.type = "Canvas";
	this.settings = settings;
	this.system = system;
	
	// no canvas provided, let's create one
	if(!this.settings.canvas) {
		this.settings.clearCanvas = true;
		var banner = document.getElementById("banner");
		var defaults = {
			parent: banner || document.body,
			width: banner ? banner.get("width") : 300,
			height: banner ? banner.get("height") : 250,
			type: "canvas"
		}
		var canvasSettings = bannerboy.combineObjects(defaults, this.settings);
		bannerboy.deleteProps(canvasSettings, this.system.deleteProps);
		this.canvas = bannerboy.createElement(canvasSettings);
	} else {
		this.canvas = this.settings.canvas;
	}

	this.ctx = this.canvas.getContext("2d");
	this.width = this.canvas.width;
	this.height = this.canvas.height;


}

bannerboy.ParticleRenderer.prototype.clearCanvas = function() {
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

bannerboy.ParticleRenderer.prototype.renderParticles = function(particles) {
	
	if(this.settings.clearCanvas) this.clearCanvas();
	for(var i = 0; i < particles.length; ++i) {
		this.renderParticle(particles[i]);		
	}
}

bannerboy.ParticleRenderer.prototype.renderParticle = function(particle) {
	if(particle.img) {
		this.ctx.save();
		this.ctx.translate(particle.x, particle.y);
		this.ctx.rotate(particle.rotation);
		this.ctx.scale = particle.scale;
		this.ctx.globalAlpha = particle.opacity;
		var image = particle.img;
		this.ctx.drawImage(image, -image.width * particle.scale / 2, -image.height * particle.scale / 2, image.width * particle.scale, image.height * particle.scale);
		this.ctx.restore();
	}
}