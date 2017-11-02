var main = function(){
	var canvas =  document.createElement("canvas");
	canvas.id = "cool canvas";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.body.appendChild(canvas);
	ctx = canvas.getContext("2d");
	
	var cubeSize = 30;
	var counter = 0;
	var x, y;
	var amountRectsX = window.innerWidth / cubeSize;
	var amountRectsY = window.innerHeight / cubeSize;

	for(var i=0;i<=amountRectsX;i++){
		for(var j=0;j<=amountRectsY;j++){
			ctx.fillStyle = `rgba(${Math.round(Math.random()*((i*j)))},${cubeSize},${cubeSize},1)`;
			ctx.fillRect(i*cubeSize, j*cubeSize, cubeSize, cubeSize);
		}
			counter++;
	}

}

