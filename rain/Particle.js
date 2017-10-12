var bannerboy = bannerboy || {};

/* Particle class
================================================= */

bannerboy.Particle = function() {
	this.x = 0;
	this.y = 0;
	this.vx = 0;
	this.vy = 0;
	this.mass = 0;
	this.radius = 0;
	this.friction = 0;
	this.springs = [];
	this.gravitations = [];
	this.rotation = 0;
	this.rotationSpeed = 0;
	this.scale = 0;
	this.opacity = 0;
	this.progress = 0;
	this.lifespan;
};

bannerboy.Particle.prototype.addSpring = function(point, k, length) {
	this.removeSpring(point);
	this.springs.push({
		point: point,
		k: k,
		length: length || 0
	});
};

bannerboy.Particle.prototype.removeSpring = function(point) {
	for(var i = 0; i < this.springs.length; ++i) {
		if(point === this.springs[i].point) {
			this.springs.splice(i, 1);
			return;
		}
	}
};

bannerboy.Particle.prototype.addGravitation = function(p) {
	this.removeGravitation(p);
	this.gravitations.push(p);
};

bannerboy.Particle.prototype.removeGravitation = function(p) {
	for (var i = 0; i < this.gravitations.length; ++i) {
		if(p === this.gravitations[i]) {
			this.gravitations.splice(i, 1);
			return;
		}
	}
};

bannerboy.Particle.prototype.accelerate = function(ax, ay) {
	this.vx += ax;
	this.vy += ay;
};

bannerboy.Particle.prototype.update = function(deltaTime) {
	this.age++;
	this.progress = this.age / this.lifespan;
	if(this.progress > 1) this.progress = 1;
	this.handleSprings();
	this.handleGravitations();
	this.vx *= this.friction;
	this.vy *= this.friction;
	this.x += this.vx;
	this.y += this.vy;
	this.rotation += this.rotationSpeed;
};

bannerboy.Particle.prototype.handleGravitations = function() {
	for (var i = 0; i < this.gravitations.length; ++i) {
		this.gravitateTo(this.gravitations[i]);
	};
};

bannerboy.Particle.prototype.handleSprings = function() {
	for(var i = 0; i < this.springs.length; ++i) {
		var spring = this.springs[i];
		this.springTo(spring.point, spring.k, spring.length);
	}
};

bannerboy.Particle.prototype.gravitateTo = function(p2) {
	var dx = p2.x - this.x;
	var dy = p2.y - this.y;
	var distSQ = dx * dx + dy * dy;
	var dist = Math.sqrt(distSQ);
	var force = p2.mass / distSQ;	
	var ax = dx / dist * force;
	var ay = dy / dist * force;

	this.vx += ax;
	this.vy += ay;
};

bannerboy.Particle.prototype.springTo = function(point, k, length) {
	var dx = point.x - this.x;
	var dy = point.y - this.y;
	var dist = Math.sqrt(dx * dx + dy * dy);
	var springForce = (dist - length || 0) * k;
	this.vx += dx / dist * springForce;
	this.vy += dy / dist * springForce;
};

bannerboy.Particle.prototype.getSpeed = function() {
	return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
};

bannerboy.Particle.prototype.setSpeed = function(speed) {
	var heading = this.getHeading();
	this.vx = Math.cos(heading) * speed;
	this.vy = Math.sin(heading) * speed;
};

bannerboy.Particle.prototype.getHeading = function() {
	return Math.atan2(this.vy, this.vx);
};

bannerboy.Particle.prototype.setHeading = function(heading) {
	var speed = this.getSpeed();
	this.vx = Math.cos(heading) * speed;
	this.vy = Math.sin(heading) * speed;
};

bannerboy.Particle.prototype.getLifeCurve = function() {
	return Math.sin(this.progress * Math.PI);
};
