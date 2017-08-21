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
	var cubeSize = 30;
	var counter = 0;
	var x, y;
	var amountRectsX = window.innerWidth / cubeSize;
	var amountRectsY = window.innerHeight / cubeSize;

	for(var i=0;i<=amountRectsX;i++){

		for(var j=0;j<=amountRectsY;j++){
			// x = 
			ctx.fillStyle = "rgba("+Math.random()*((i*j))+","+cubeSize+","+cubeSize+",1)";
			// ctx.fillStyle = "rgba("+i+","+0+","+0+",1)";
			ctx.fillRect(i*cubeSize, j*cubeSize, cubeSize, cubeSize);

			// ctx.strokeStyle = "black";
			// ctx.strokeRect(i*cubeSize-cubeSize, j*cubeSize-cubeSize, cubeSize, cubeSize); 

			// ctx.fillStyle = "rgba(255, 255, 255,.3)";
			// ctx.font="5x Arial";
			// ctx.fillText(counter, i*cubeSize+cubeSize/2.5, j*cubeSize-cubeSize/2.5);

		}
			counter++;
	}

}

