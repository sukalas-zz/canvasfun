var main =  function(){
	var setup = function(){
		canvas = document.createElement('canvas');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx = canvas.getContext('2d');
		document.body.appendChild(canvas);

		particles = {};
		particleNum = 5;

		for(var i=0;i<particleNum;i++){
			particles[i] = new Tornado(Math.random()*canvas.width, canvas.height, canvas.width, canvas.height, particles, particleNum, ctx);
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
	for(var i=0;i<particleNum;i++){
		particles[i].turbulance(ctx);
	}
}

var clean = function(){
	ctx.fillStyle = "rgba(10,50,50,0.1)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

loop();
}