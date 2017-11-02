var Tornado = function(posX, posY, width, height, particles, particleNum){
	this.posX = posX;
	this.posY = posY;
	// this.cx = this.posX;
	// this.cy = this.posY;	
	this.width = width;
	this.height = height;
	this.angleSpeed = 1;
	this.radius = 1;
	this.particleRadius = 1;
	this.speed = 1;
	this.angle = 0; 
	this.color = {r:255,g:255,b:255,a:1};

	this.particlesIndex = 0;
	this.particles = particles;
	this.direction = 1;
	this.life = 0;
	this.maxLife = 500;
	for(var i=0;i<particleNum;i++){
		this.particles[i] = this;
		// console.log(this)
	}
}

Tornado.prototype.turbulance = function(ctx){
	this.particlesIndex++
	this.life++

	if(this.particlesIndex<particleNum){
		this.particles[this.particlesIndex].posX;
		this.particles[this.particlesIndex].posY = this.particles[this.particlesIndex].posY - 1;
		this.particles[this.particlesIndex].angle += this.angleSpeed * Math.PI / 180; 
		this.particles[this.particlesIndex].radius += 0.25;
		this.particles[this.particlesIndex].particleRadius += 0.025;
	}else{
		this.particlesIndex = 0;
	}

	if(this.particles[this.particlesIndex].life>=this.particles[this.particlesIndex].maxLife){
		// delete this.particles[this.particlesIndex];
	}

	newX = (this.posX + this.radius * Math.cos(this.angle)) * this.direction;
	newY = (this.posY + this.radius * Math.sin(this.angle)) * this.direction;

	if(this.posY<100 || this.posX < 100 || this.posY>this.height || this.posX > this.width){
		this.direction *= -1;
		this.particleRadius *= 1.001 ;
	}

	console.log(this.posY)

	ctx.beginPath();
	ctx.arc(newX, newY, this.particleRadius, 0, 2 * Math.PI, false);
	ctx.fillStyle = 'rgba('+this.color.r+','+this.color.g+','+this.color.b+','+this.color.a+')';
	ctx.fill();
}