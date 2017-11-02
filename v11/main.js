var main = function(){ 

	var createCanvas = function(width, height){
	    canvas = document.createElement('canvas');
		canvas.id = "canvas";
		canvas.width = width;
		canvas.height = height;
		document.body.appendChild(canvas);
		ctx = canvas.getContext('2d');
		ctx.id = "particle_canvas";
		particles = {};
		particlesIndex = 0;
		particleNum = 100;
	}

	var canvas, ctx, p1, p2,
		runs = false;
		frames = 0;

	createCanvas(window.innerWidth, window.innerHeight);

	function loop(){
	  clear();
	  setup()
	  update();
	  draw();
	  queue();
	}

	function clear(){
		ctx.fillStyle = "rgba(0, 0, 0, .5)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		// console.log("cleaning")
	}

	function queue(){
		window.requestAnimationFrame(loop); // replace with tick, see if better
	}

	function update(){

		if(typeof stoner.particles[0]!= "undefined"){ // Avoid undefined error when life > maxlife
			// stoner.particles[0].vx += .01;
			// stoner.particles[1].vx -= .01;
			// console.log("how many times?")
		}
		else{ // Reset it - Loop
			runs =!runs; // Becomes false
			particlesIndex = 0;
		}


	}

	function calcDist(p1, p2){
		var x1 = stoner.particles[p1].posX; // The pointX in the middle
		var x2 = stoner.particles[p2].posX;
		var dx = (x2 - x1);

		var y1 = stoner.particles[p1].posY; // The pointY in the middle
		var y2 = stoner.particles[p2].posY;
		var dy = (y2 - y1);

		var distance = (dx * dx) +  (dy * dy);
		var realDistance  = Math.sqrt(distance); 
		// console.log("the distance is :", realDistance)
		var radius = stoner.particles[p1].width;
		var strokeClr = Math.random() * 255;
		var strokeTrs = Math.random();
		// console.log(radius)
		if (realDistance<=radius*10){ // Draw a line when they are within a range
			ctx.beginPath();
	        ctx.moveTo(x1, y1);
	        ctx.lineTo(x2, y2);
	        ctx.strokeStyle = "rgba(255, 255, 255, .5)";
	        ctx.stroke();
	      	ctx.closePath();
      		ctx.lineWidth = .3;
      		return true;
		}

		if(realDistance<=radius){ // Bounce back when they touch each other
			stoner.particles[p1].vx *= -1;
			stoner.particles[p2].vx *= -1;			
			stoner.particles[p1].vy *= -1;
			stoner.particles[p2].vy *= -1;
			ctx.beginPath();			
			ctx.arc(x1, y1, stoner.particles[p1].width/2, 0, 2 * Math.PI, false);
			ctx.fillStyle ="rgba(255, 255, 255, .7)";// Draw a rectangle to see the center
			ctx.fill();
		}
			// ctx.fillStyle ="rgba(255, 0, 0, 1)";// Draw a rectangle to see the center
			// ctx.fillRect(x1, y1,  stoner.particles[p1].width/100,  stoner.particles[p1].height/100);
			// ctx.fillRect(x2, y2,  stoner.particles[p1].width/100,  stoner.particles[p1].height/100);
	}

	function draw(){
		for(var i in particles){
			stoner.particles[i].draw(ctx); 
		}
	}
	function setup(){
		if(!runs){ // Is False
			for(var i = 0; i< particleNum; i++){
				stoner = new Person(particles, particlesIndex++);
				// console.log(particleNum, "new Stoners are created!")
				for(var i in particles){ // Loop through object
					stoner.particles[i].posX = Math.random() * canvas.width;
					stoner.particles[i].posY = Math.random() * canvas.height;
				}
			}
			runs = !runs; //Becomes true
		}

		if(typeof stoner.particles[0]!= "undefined"){

			for(var i=0; i<particleNum; i++){
				for(var j=i+1; j<particleNum; j++){
					calcDist(i, j);
					// console.log("i :"+i, "j :"+j)
				}
			}
		}
	}

	loop();

};


