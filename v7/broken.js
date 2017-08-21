var Sine = function(posX, posY, width, height, ctx){
	this.posX = posX;
	this.posY = posY;

	this.mouseX = 0;
	this.mouseY = 0;

	this.width = width;
	this.height = height;

 	this.speed = 5;
 	this.angle = 360;
	this.directionX = 1;
	this.directionY = 1;
	this.directionSpd = 1;

	this.color = "rgba(255, 255, 255, 1)";

	this.density = 0;
	seconds = 0;
	autopilot = false;

	this.move = function(e){

		// this.posY = Math.random()*this.height;		

		step = this.width/700;

		this.angle += 0.125;

		this.posX += (step + this.speed) * this.directionX;
		this.posY += Math.sin(this.angle) * this.directionY;

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

		this.r = Math.random()*(255-this.density)+this.density;
		this.g = Math.random()*(255-this.density)+this.density;
		this.b = Math.random()*(255-this.density)+this.density;

		this.color = "rgba("+this.r+","+this.g+","+this.b+")";
		
		ctx.beginPath();
		ctx.moveTo(this.posX-Math.random()*25, this.posY);
		ctx.lineTo(this.posX+Math.random()*25, this.posY);
		ctx.strokeStyle = this.color;
		ctx.strokeStyle = this.color;
		ctx.lineWidth = Math.random()*10;
		ctx.stroke();	
	};




}