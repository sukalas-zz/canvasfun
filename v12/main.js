var main = function(){
	var h = new helpers();

	var particleNum = 10000;
	var bool = false;
	var frames = 0;
	var width = window.innerWidth;
	var height = window.innerHeight;
	var canvas = h.c('canvas');
	var ctx = canvas.getContext('2d');
		canvas.width = width;
		canvas.height = height;

	ctx.fillStyle = "rgba(0,0,0,1)";
	ctx.fillRect(0, 0, width, height);
	let p = new Array();
	p.width = 2;
	p.height = p.width;
	document.body.appendChild(canvas);
	for(let i=0;i<=particleNum;i++){
		p[i] = new Particle(i, Math.floor(width/2), Math.floor(height/2), p.width, p.height, width, height);
	}

	var loop = function(){
		clean();
		draw();
		swim();
		requestAnimationFrame(loop);
		// console.log("loop", counter++)
	}

	var swim = function(){
		for(let i=0;i<=particleNum;i++){
			p[i].swim();
		}
	}

	var draw = function(){
		// ctx.restore(); // restore to the default state
		for(let i=0;i<=particleNum;i++){
			// ctx.restore(); // save the default state
			// color = rgba(p[i].color.r, p[i].color.g, p[i].color.b, p[i].color.a);
			// color = "rgba("+p[i].color.r+","+p[i].color.g+","+p[i].color.b+","+p[i].color.a+")";
			ctx.fillStyle = p[i].colorFinal;
			ctx.fillRect(p[i].posX, p[i].posY, p.width, p.height);
			// ctx.save(); // save the default state
		}

	}

	var clean = function(){
		ctx.fillStyle = "rgba(0,0,0,.6)";
		ctx.fillRect(0, 0, width, height);
	}

	loop();
}