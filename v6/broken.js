var Sine = function(posX, posY, width, height, ctx){
	this.posX = posX;
	this.posY = posY;

	this.mouseX = 0;
	this.mouseY = 0;

	this.width = width;
	this.height = height;

 	this.speed = 1;

	this.r = Math.random()*(255-100)+100;
	this.g = Math.random()*(255-100)+100;
	this.b = Math.random()*(255-100)+100;

	this.color = "rgba("+this.r+","+this.g+","+this.b+")";

	this.directionX = 1;
	this.directionY = 1;
	this.directionSpd = 1;

	this.density = 100;
	seconds = 0;
	autopilot = false;

	this.move = function(e){


			// this.posY = Math.random()*this.height;		

		this.r = Math.random()*(255-this.density)+this.density;
		this.g = Math.random()*(255-this.density)+this.density;
		this.b = Math.random()*(255-this.density)+this.density;

		this.color = "rgba("+this.r+","+this.g+","+this.b+")";

		step = this.width/500;

		this.posX += this.directionX * step + this.speed;
		this.posY += this.directionY * step + this.speed;
		this.speed *= this.directionSpd;

		if(this.posX>=this.width || this.posX<0){
			this.directionX *= -1;
		}			
		if(this.posY>=this.height || this.posY<0){
			this.directionY *= -1;
		}
		if(this.speed>100 || this.speed<=1){
			this.directionSpd *= -1;
		}

		ctx.beginPath();
		ctx.moveTo(this.posX-Math.random()*500, this.posY);
		ctx.lineTo(this.posX+Math.random()*500, this.posY);
		// ctx.lineTo(this.width, this.posY);
		ctx.strokeStyle = this.color;
		ctx.lineWidth = Math.random()* 20;
		ctx.stroke();	
	};




}