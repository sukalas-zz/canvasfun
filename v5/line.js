var Line = function(posX, posY, width, height, ctx){
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

	this.direction = 1;
	this.speedDir = 1;

	this.density = 100;
	seconds = 0;
	autopilot = false;

	this.move = function(e){



		if(autopilot){
			console.log("autopilot is working")

			this.posX += this.speed * this.direction;
			this.speed += .25 * this.speedDir;

			if(this.speed>100 || this.speed<=1){
				this.speedDir *= -1;
			}		
			if(this.posX>=this.width || this.posX<1){
				this.direction *= -1;
			}

			this.posY = Math.random()*this.height;		
		}

		if(typeof mouseX !== "undefined"){
			this.posX = mouseX;

		}
		setInterval(function() {
			seconds++;
			console.log(seconds)
			if(seconds >=500){
				autopilot = true;
			}
		}, 2000);

		document.onmousemove = getMouseCords;

		function getMouseCords(e){
		seconds = 0;
		autopilot = false;
			e = e || window.e;
			this.mouseX = e.clientX;
			this.mouseY = e.clientY;

			mouseX = this.mouseX;
			mouseY = this.mouseY;
		}



		this.r = Math.random()*(255-this.density)+this.density;
		this.g = Math.random()*(255-this.density)+this.density;
		this.b = Math.random()*(255-this.density)+this.density;

		this.color = "rgba("+this.r+","+this.g+","+this.b+")";

		ctx.beginPath();
		ctx.moveTo(this.posX, 0);
		ctx.lineTo(this.posX, this.height);
		ctx.strokeStyle = this.color;
		ctx.lineWidth = Math.random()*100;
		ctx.stroke();	
	};




}