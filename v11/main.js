var main = function(){
	var h = new helpers();

	var particleNum = 1500;
	var bool = false;
	var frames = 0;
	var range = 20;
	var rangeOriginal = range;
	var colorStrength;
	var width = window.innerWidth;
	var height = window.innerHeight;
	var canvas = h.c('canvas');
	var ctx = canvas.getContext('2d');
		canvas.width = width;
		canvas.height = height;

	let p = new Array();
	p.width = 1;
	p.height = p.width;

	var mouse = {x:0, y:0};


	document.body.appendChild(canvas);

	for(let i=0;i<=particleNum;i++){
		p[i] = new Particle(i, Math.random()*width, Math.random()*height, p.width, p.height, width, height);
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

			for(let j=i;j<=particleNum;j++){
				var distance = getDistance(p[i].posX, p[i].posY, p[j].posX, p[j].posY);
				var thickness = h.m(distance, 0, range, 1, 0.01);

				if(distance<range){
					ctx.restore();
					ctx.beginPath();
					ctx.moveTo(p[i].posX,p[i].posY);
					ctx.lineTo(p[j].posX, p[j].posY);
					ctx.lineWidth = thickness;
					ctx.strokeStyle = "rgba(255, 255, 255, .25)";
					ctx.stroke();
					ctx.save();
				}
				var distanceM = getDistance(mouse.x, mouse.y, p[i].posX, p[i].posY);

				if(distanceM<range){				
					ctx.strokeStyle = "rgba(255, 255, 255, 1)";
					ctx.stroke();
				}
			}

		}
	}

	var draw = function(){
		// ctx.restore(); // restore to the default state
		for(let i=0;i<=particleNum;i++){
			ctx.restore();
			ctx.fillStyle = p[i].colorFinal;
			ctx.fillRect(p[i].posX, p[i].posY, p.width, p.height);
			ctx.save();
		}

	}
	var getDistance = function(x1, y1, x2, y2){
		var vx, vy;
		vx = x2 - x1;
		vy = y2 - y1;
		var distance = Math.sqrt(vx*vx + vy*vy);

		return distance;
	}

	var clean = function(){
      ctx.beginPath();
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0,0,0,.2)';
      ctx.fill();
	}

	loop();


	//INTERACTION

	document.body.addEventListener("mousedown", mousedown);
	document.body.addEventListener("mouseup", mouseup);

	window.onmousemove = function(e){
		mouse = {
			x:e.clientX,
			y:e.clientY
		}
		console.log(mouse.x)
		return mouse;
	}

	function mousedown(){
		mousedownID = setInterval(whilemousedown, 100 /*execute every 100ms*/);
	}	

	function whilemousedown(){
		range -= 5;
		return range;
	}

	function mouseup(){
		clearInterval(mousedownID);
		range = rangeOriginal;
		return range;
	}
}