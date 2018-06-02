let Main = (function() {
	
	let I = function() {
		let c = document.getElementById("canvas");
			c.width = window.innerWidth;
			c.height = window.innerHeight;
		let ctx = c.getContext('2d');
		var p = new Particle(0,0,1,ctx);
		loop(p);
	}

	let loop = function(p) {
		// clean();
		p.move();
		requestAnimationFrame(loop);
	}

	let Particle = function(x=0, y=0, speed=1, ctx) {
		this.x = x;
		this.y = x;
		this.speed = speed;
		this.ctx = ctx;

		this.move = function() {
			this.x += 0.1;
			this.paint();
		}

		this.paint = function() {
			ctx.rect(this.x, this.y, 20, 20);
			ctx.stroke();
		}

		return this;
	}

	return {
		init: I
	}
})();