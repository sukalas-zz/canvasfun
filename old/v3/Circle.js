var Circle = function(posX, posY, radius, color){
	this.posX = posX;
	this.posY = posY;
	this.speed = .025;
	this.radius = radius;
	this.color = color;
	
	this.move = function(ctx){
		this.posX += this.speed ;
		// this.posY += this.speed;
		this.pathRec = this.posX - posX;

		if(Math.random()<.003){
			this.speed *= -1;
		}
		if(this.pathRec <=-20 || this.pathRec >=20){
			this.speed *= -1;
		}

		console.log(this.pathRec)

		// ctx.globalCompositeOperation = "lighten";
		ctx.globalCompositeOperation = "destination-atop";

		ctx.beginPath();
	    ctx.arc(this.posX+this.radius/2, this.posY-this.radius/2, radius, 0, 2 * Math.PI, false);
	    ctx.fillStyle = this.color;
	    ctx.fill();
	    ctx.closePath();
	}
}