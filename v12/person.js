var Person = function(particles, particlesIndex){	//Particles, particlesIndex, images
	this.width = 50; 
	this.height = 50;
	this.radius = this.width;
	// this.posX = Math.random()*(canvas.width/1.5 -canvas.width/3) + canvas.width/3; //(max - min) + min
	this.posX = canvas.width/2;
	this.posY = canvas.height/2;
    this.vx = .5;
    this.vy = .7;
	this.gravity = 0.01;
	this.acceleration = 1;
	this.scale = Math.random();
	this.rotation = 0;
	this.color = "rgba(255, 50, 20,"+Math.random()*0.6+")";
	this.opacity = Math.random() * (.70 - .45) + 0.45;
	this.life = 0;
	this.maxLife = 1000;
    this.particles = particles;
	this.particlesIndex = particlesIndex;
	this.particlesIndexPrev = particlesIndex;
	this.id = this.particlesIndex;
	this.particles[this.particlesIndex] = this;
};

Person.prototype.draw = function(ctx, gravity){
	this.posX += this.vx;
	this.posY += this.vy;
	this.life++;
	// this.scale += 0.01;
	this.vy *= this.acceleration;
	this.vx *= this.acceleration;
	this.vy += this.gravity;
	this.rotation += .01;

 	// var distance = particles[this.particlesIndexPrev].posX - particles[this.particlesIndex].posX;

	// if(distance<=100){
	// 	// console.log(particles[this.particlesIndex].id)
	// }

	var num = Math.random();
	num *= Math.floor(Math.random()*2) == 1 ? 3 : -3;
		
	if(Math.random() < 1){
		// this.vx = num;
		// this.vy = num;
	}

	if (this.life >= this.maxLife){
		delete particles[this.particlesIndex];
	};	

	if(this.posX < 0 || this.posX > canvas.width){
		this.posX = this.posX;
		this.vx *= -1;
	}
	else if(this.posY < 0 || this.posY > canvas.height){
		 this.posY = canvas.height;
		 this.vy *= -1;
	}

	ctx.save();
	// ctx.globalAlpha = this.opacity;
	// ctx.translate(this.posX, this.posY); 
	// ctx.rotate(this.rotation);
	// ctx.translate(-this.posX, -this.posY); 
	
	// ctx.fillRect(this.posX-this.width/2, this.posY-this.height/2, this.width, this.height);
	ctx.beginPath();
	ctx.arc(this.posX, this.posY, this.width/2, 0, 2 * Math.PI, false);
	ctx.fillStyle = "rgba(255, 255, 255, .2)";
	ctx.fill();
	// ctx.lineWidth = 1;
	// ctx.strokeStyle = 'white';
 	// ctx.stroke();
	ctx.restore();
}