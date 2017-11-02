var Person = function(particles, particlesIndex, images){	//Particles, particlesIndex, images
	this.images = images;
	this.width = 100;
	this.height = 100;
	// this.posX = Math.random()*(canvas.width/1.5 -canvas.width/3) + canvas.width/3; //(max - min) + min
	this.posX = Math.random()* canvas.width;
	this.posY = Math.random() * canvas.height;
	// this.posY = canvas.height/2;
    this.vx = Math.random();
    this.vy = Math.random();
	this.gravity = -0.015;
	this.acceleration = 1.005;
	this.scale = 0.05;
	this.rotation = Math.random()* 0.01;
	this.color = "rgba(255, 50, 20,"+Math.random()*0.6+")";
	// this.opacity = Math.random() * (.90 - .65) + 0.65;
	this.opacity = 0.5;
	this.life = 0;
	this.maxLife = 350;

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
	this.scale *= this.acceleration;
	// this.vx += this.gravity;
	this.vy += this.gravity;
	this.vy *= this.acceleration;
	this.opacity *= this.acceleration;
	// this.color++; 

    var distance = particles[this.particlesIndexPrev].posX - particles[this.particlesIndex].posX;

	if(distance<=100){
		console.log(particles[this.particlesIndex].id)
	}

	var num = Math.random();
	num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
	// var rotation = Math.floor(Math.random()*2) == 1 ? 0.15 : 0.15;
		
	if(Math.random() < .05){
		this.vx = num;
		// this.rotation += rotation;
		// this.vy = Math.random();
	}
	
	particles[this.id]

	if (this.life >= this.maxLife){
		delete particles[this.id];
	};

	if(this.posX < 0 || this.posX > canvas.width){
		this.posX = this.vx;
		this.vx *= -1;
		// delete particles[this.id]; //POP THEM!
	}
	else if(this.posY < 0 || this.posY > canvas.height){
		 this.posY = canvas.height;
		 // this.vy *= -1;
	}

	ctx.save();	
	// ctx.translate(this.posX+this.width/2, this.posY+this.height/2); 
	// ctx.translate(this.width/2, this.height/2); 
	// ctx.rotate(this.rotation);
	// ctx.translate(-this.posX+this.width/2, -this.posY+this.height/2); 
	// ctx.globalAlpha = this.opacity;
	ctx.globalAlpha = this.opacity;
	ctx.drawImage(this.images, this.posX, this.posY, this.width*this.scale, this.height*this.scale);
	ctx.restore();
}