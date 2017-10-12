var main = function(){
	var canvas =  document.createElement("canvas");
	canvas.id = "cool canvas";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.body.appendChild(canvas);
	ctx = canvas.getContext("2d");

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
			var randomRange = Math.floor(Math.random() * (max + min) - min);

			ctx.fillStyle = "rgba("+randomRange+","+Math.round(255/cubeSize)+","+Math.round(255/cubeSize)+",1)";
			ctx.fillRect(i*cubeSize, j*cubeSize, cubeSize, cubeSize);

		}
	}
 }, 100);

}

