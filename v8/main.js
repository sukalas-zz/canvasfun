var main = function(){
	var h = new helpers();

	var particleNum = 200;
	var bool = false;
	var frames = 0;
	var range = 150;
	var rangeOriginal = range;
	var colorStrength;
	var width = window.innerWidth;
	var height = window.innerHeight;
	var canvas = h.c('canvas');
	var ctx = canvas.getContext('2d');
		canvas.width = width;
		canvas.height = height;

	var step = 10;
	let p = new Array();
	p.width = 2;
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
				// var p2pDist = getDistance(p[i].posX, p[i].posY, p[j].posX, p[j].posY);
				// var p2pLine = h.m(p2pDist, 0, range, 1, 0.01);

				var m2pDist = getDistance(mouse.x, mouse.y, p[i].posX, p[i].posY);
				var m2pLine = h.m(m2pDist, 0, range*2, 1, 0.01);

				// if(p2pDist<range)drawLine(p[j].posX, p[j].posY, p[i].posX, p[i].posY, p2pLine);
			}

			if(m2pDist<range){
				// drawLine(mouse.x, mouse.y, p[i].posX, p[i].posY, m2pLine);
				// var dir = getDir(p[i].lastX, p[i].lastY, p[i].posX, p[i].posY);
				// p[i].width = 5;p[i].height = 5;
				p[i].acceleration -= 0.05;
			}				
			else{
				p[i].acceleration = 0;
				p[i].width = p.width;p[i].height = p.width;
			}
			p[i].lastX = p[i].posX;p[i].lastY = p[i].posY;

		}

	}

	var draw = function(){
		// ctx.restore(); // restore to the default state
		for(let i=0;i<=particleNum;i++){
			ctx.restore();
			ctx.fillStyle = p[i].colorFinal;
			ctx.fillRect(p[i].posX, p[i].posY, p[i].width, p[i].height);
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

	var drawLine = function(fromX, fromY, toX, toY, thickness){
		ctx.beginPath();
		ctx.moveTo(fromX, fromY);
		ctx.lineTo(toX, toY);
		ctx.lineWidth = thickness;
		ctx.strokeStyle = "rgba(255, 255, 255, .7)";
		ctx.stroke();
		ctx.save();
	}	

	var getDir = function(xPre, yPre, xNow, yNow){
		var dir = {
			dirX:xNow - xPre,
			dirY:yNow - yPre
		}
		return dir;
	}

	var clean = function(){
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