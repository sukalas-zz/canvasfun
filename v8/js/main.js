var main =  function(){
	var setup = function(){
		canvas = document.createElement('canvas');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx = canvas.getContext('2d');
		document.body.appendChild(canvas);
		particles = {};
		particleNum = 1500;
		particleIndex = 0;

		for(var i=0;i<=particleNum;i++){
			tornado =  new Tornado(canvas.width/2, canvas.height/2, canvas.width, canvas.height, Math.floor(Math.random()*3000), Math.floor(Math.random()*20),Math.random()*(4-2)+2, ctx);
			particles[i] = tornado;
		}
	}

	setup();

var loop = function(){
	timer();
	clean();
	draw();
}

var timer = function(){
	requestAnimationFrame(loop)
}

var draw = function(){
	for(var i=0;i<=particleNum;i++){
		particles[i].turbulance(ctx);
	}
}

var clean = function(){
	ctx.fillStyle = "rgba(10,50,50,.65)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

loop();
}