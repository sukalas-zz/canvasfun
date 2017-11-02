var Tornado = function(posX, posY, width, height, radius, particleRadius, angleSpeed){
	this.posX = posX;
	this.posY = posY;
	this.cx = this.posX;
	this.cy = this.posY;	
	this.speed = 1;
	this.angle = 0; 
	this.width = width;
	this.height = height;
	this.angleSpeed = angleSpeed;
	this.radius = radius;
	this.particleRadius = particleRadius;
	this.color = {r:0,g:0,b:0,a:0};
}

Tornado.prototype.turbulance = function(ctx){
	// this.posX += this.speed;
	// this.posY += this.speed;
	if(Math.random()<.01){
		this.color.r = Math.round(Math.random()*155);
		this.color.g = Math.round(Math.random()*255);
		this.color.b = Math.round(Math.random()*255);
		this.color.a = 1;
	}

	this.angle += this.angleSpeed * Math.PI / 360; 

	newX = this.cx + this.radius * Math.cos(this.angle);
	newY = this.cy + this.radius * Math.sin(this.angle);

	ctx.beginPath();
	ctx.arc(newX, newY, this.particleRadius, 0, 2 * Math.PI, false);
	ctx.fillStyle = 'rgba('+this.color.r+','+this.color.g+','+this.color.b+','+this.color.a+')';
	ctx.fill();
}