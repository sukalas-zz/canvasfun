var main = function(){
	var canvas =  document.createElement("canvas");
	canvas.id = "cool canvas";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.body.appendChild(canvas);
	ctx = canvas.getContext("2d");

	// ctx.globalCompositeOperation = "color";
	// ctx.fillStyle = "rgba(255, 0, 255, .9)";
	// ctx.filter = 'blur(5px)';
	// ctx.fillRect(200, 200, 200, 200);	
	// ctx.globalCompositeOperation = "overlay";
	// ctx.fillStyle = "rgba(0, 255, 0, .9)";
	// ctx.fillRect(200, 200, 150, 220);
	var cubeSize = 20;
	var counter = 0;
	var easing;
	var amountRectsX = window.innerWidth / cubeSize;
	var amountRectsY = window.innerHeight / cubeSize;


setInterval(function(){ 
	for(var i=0;i<=amountRectsX;i++){
		for(var j=0;j<=amountRectsY;j++){

			// easing = Math.random()*(i*j/10);
			var min = Math.pow(j, 1);
			var max = Math.pow(j, 1.8);
			var randomRange = Math.random() * (max + min) - min;

			// easing = Math.random()*(Math.pow(i, 2)/j);
			// easing = Math.random()*(i/Math.sin(j));
			// easing = Math.random()*(Math.sin(i)*5/Math.sin(j)*3);
			// easing = Math.random()*(Math.sin(i)/Math.sin(j));

			ctx.fillStyle = "rgba("+randomRange+","+255/cubeSize+","+255/cubeSize+",1)";
			ctx.fillRect(i*cubeSize, j*cubeSize, cubeSize, cubeSize);

			// ctx.strokeStyle = "white";
			// ctx.strokeRect(i*cubeSize-cubeSize, j*cubeSize-cubeSize, cubeSize, cubeSize); 
			// ctx.fillStyle = "rgba(255, 255, 255,.3)";
			// ctx.font="5x Arial";
			// ctx.fillText(counter, i*cubeSize+cubeSize/2.5, j*cubeSize-cubeSize/2.5);
		}
	}
 }, 100);

}

