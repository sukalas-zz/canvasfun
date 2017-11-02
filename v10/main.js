var main = function(){

	var createCanvas = function(width, height){
	    canvas = document.createElement('canvas');
		canvas.id = "canvas";
		canvas.width = width;
		canvas.height = height;
		document.body.appendChild(canvas);
		ctx = canvas.getContext('2d');
		ctx.fillStyle = 'rgba(200,0,0,1)';
		ctx.fillRect(10, 10, 55, 50);
		ctx.id = "redBox";
		// console.log(ctx.id);
		particles = {};
		particlesIndex = 0;
		particleNum = 1;
	}

	var canvas, ctx,
		images_src = [
			"bubble_1.png",
			"bubble_2.png",
			"bubble_3.png"
		],
		images = [], 
		frames = 0;

	createCanvas(window.innerWidth, window.innerHeight);

	for(var i=0;i<images_src.length;i++){
		var img = new Image();   // Create new img element
		img.src = images_src[i]; // Set source path
		images[i] = img;
	}

	function loop(){
	  clear();
	  update();
	  draw();
	  queue();
	}

	function clear(){

		ctx.fillStyle = "rgba(0, 0, 0, .75)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		// console.log("cleaning")

	}

	function queue(){
		window.requestAnimationFrame(loop); // replace with tick
	}

	function update(){
	}

	function draw(){
		for(var i = 0; i< particleNum; i++){
			var bubbles = new Person(particles, particlesIndex++, images[Math.round(Math.random()*2)]);
		}
		for(var i in particles){
			bubbles.particles[i].draw(ctx); 
		}
	}

	loop();

};


