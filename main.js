let main = function(){
	let h = new helpers();

	let particleNum = 50;
	const MaxParticleNum = particleNum;
	let bool = false;
	let frames = 0;
	let range = 250;
	let rangeOriginal = range;
	let colorStrength;
	let width = window.innerWidth;
	let height = window.innerHeight;
	let canvas = h.c('canvas');
	let ctx = canvas.getContext('2d');
		canvas.width = width;
		canvas.height = height;

	let p = new Array();
	p.width = 1;
	p.height = p.width;

	let mouse = {x:0, y:0};

	document.body.appendChild(canvas);

	for(let i=0;i<=particleNum;i++){
		p[i] = new Particle(i, Math.random()*width, Math.random()*height, p.width, p.height, width, height);
	}

	let loop = function(){
		clean();
		draw();
		swim();
		requestAnimationFrame(loop);
	}

	let swim = function(){
		for(let i=0;i<=particleNum;i++){
				p[i].swim();

			for(let j=i;j<=particleNum;j++){
				let distance = getDistance(p[i].posX, p[i].posY, p[j].posX, p[j].posY);
				let thickness = h.m(distance, 0, range, 1, 0.01);

				if(distance < range){
					ctx.restore();
					ctx.beginPath();
					ctx.moveTo(p[i].posX,p[i].posY);
					ctx.lineTo(p[j].posX, p[j].posY);
					ctx.lineWidth = thickness;
					ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
					ctx.stroke();
					ctx.save();
				}
				let distanceM = getDistance(mouse.x, mouse.y, p[i].posX, p[i].posY);

				if(distanceM < range / 2){				
					ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
					ctx.stroke();
				}
			}

		}
	}

	let draw = function(){
		// ctx.restore(); // restore to the default state
		for(let i=0;i<=particleNum;i++){
			ctx.restore();
			ctx.fillStyle = p[i].colorFinal;
			ctx.fillRect(p[i].posX, p[i].posY, p.width, p.height);
			ctx.save();
		}

	}
	let getDistance = function(x1, y1, x2, y2){
		let vx, vy;
		vx = x2 - x1;
		vy = y2 - y1;
		let distance = Math.sqrt(vx*vx + vy*vy);

		return distance;
	}

	let clean = function(){
      ctx.beginPath();
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0,0,0,.3)';
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
		// console.log(mouse.x)
		return mouse;
	}

	window.onclick = function(){
			blockMouseDownUp = true;
			range -= 5;
			return range;
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

	window.onkeydown = function(evt) {
	    evt = evt || window.event;

		if(evt.ctrlKey){
		    if (evt.ctrlKey && evt.keyCode == 38) {
		    	if(particleNum < MaxParticleNum){
		    		particleNum += 10;
		    	}
		    }
		    if(evt.ctrlKey && evt.keyCode == 40) {
	 			particleNum -= 10;
		    }
		return particleNum;
		}
		else if(evt.keyCode == 38 || evt.keyCode == 40){
 			if (evt.keyCode == 38) {
		        range += 1;
		    }
		    if(evt.keyCode == 40) {
	 			range -= 1;
		    }
		return range;
		}
	};
		setInterval(function(){
			window.onresize  = function(){
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			}
		}, 500)
}