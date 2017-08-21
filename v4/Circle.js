var Node = function(posX, posY, radius, color, canvas, e){
	this.posX = posX;
	this.posY = posY;
	this.speed = 1;
	this.radius = radius;
	this.color = color;

	this.move = function(ctx, mouseX, mouseY, release){
		// ctx.globalCompositeOperation = "lighten";
		// ctx.globalCompositeOperation = "destination-atop"
		ctx.beginPath();

	   	if(!release){
	   		this.posX = mouseX;
			this.posY = mouseY;

			var mappedPosX = convertRange(mouseX, [0, window.innerWidth], [0, 255] )
			var mappedPosY = convertRange(mouseY, [0, window.innerHeight], [0, 255] )
			this.color = "rgba("+mappedPosY+", "+mappedPosY+", "+mappedPosX+", 1)";

			ctx.arc(this.posX+this.radius/2, this.posY, radius, 0, 2 * Math.PI, false);
		}
		else{
			this.color = "rgba("+mappedPosY+", "+mappedPosY+", "+mappedPosX+", 1)";
			ctx.arc(this.posX+this.radius/2, this.posY, radius, 0, 2 * Math.PI, false);
		}

	    ctx.fillStyle = this.color;
	    ctx.fill();
	    ctx.closePath();

	}
}