var main = function(){
	var canvas =  document.createElement("canvas");
	canvas.id = "cool canvas";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.body.appendChild(canvas);
	ctx = canvas.getContext("2d");

	var circleRadius = 400;
	var easing;
	var circleAmount = 3;

	var flower = new Circle(window.innerWidth/2.5, window.innerHeight/2, circleRadius, "rgba(100, 50, 240, .5)")
	var flower2 = new Circle(window.innerWidth/2, window.innerHeight/2, circleRadius, "rgba(0, 255, 255, .5)")
	var flower3 = new Circle(window.innerWidth/2.25, window.innerHeight/1.5, circleRadius, "rgba(0, 0, 255, .5)")


setInterval(function(){ 	
	// ctx.clearRect(0, 0, canvas.width,  canvas.height);
	// ctx.globalCompositeOperation = "overlay";
	ctx.globalCompositeOperation = "lighten";

	ctx.fillStyle = "rgba(0,0,0,1)";
	ctx.rect(0, 0, canvas.width,  canvas.height);
	ctx.fill();

	for(var i=0; i<=circleAmount; i++){
		flower.move(ctx);
		flower2.move(ctx);
		flower3.move(ctx);
	}

 },30);

}

