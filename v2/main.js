var main = function(){
	var canvas =  document.createElement("canvas");
	canvas.id = "cool canvas";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.body.appendChild(canvas);
	ctx = canvas.getContext("2d");

	var cubeSize = 20;
	var counter = 0;
	var speed = 100;

window.onmousedown = function(){
	cubeSize++;
}

setInterval(function(){ 

	var amountRectsX = window.innerWidth / cubeSize;
	var amountRectsY = window.innerHeight / cubeSize;

	for(var i=0;i<=amountRectsX;i++){
		for(var j=0;j<=amountRectsY;j++){
			var min = Math.pow(j, 1);
			var max = Math.pow(j, 1.8);
			var randomRange = Math.floor(Math.random() * (max + min) - min);
			ctx.fillStyle = "rgba("+randomRange+","+Math.round(255/cubeSize)+","+Math.round(255/cubeSize)+",1)";
			ctx.fillRect(i*cubeSize, j*cubeSize, cubeSize, cubeSize);
		}
	}
 }, speed);




}

