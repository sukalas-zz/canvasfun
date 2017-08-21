var main = function(){
	var canvas =  document.createElement("canvas");
	canvas.id = "cool canvas";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.body.appendChild(canvas);
	ctx = canvas.getContext("2d");

	var circleRadius = 10;
	var easing;
	var mouse = {x:0, y:0};
	var depositNode = false;

	var node = new Node(mouse.x, mouse.y, circleRadius, "rgba(255, 255, 255, 1)", canvas)

	document.body.addEventListener("mousemove", function(e){
		return mouse = {
			x: e.clientX,
			y: e.clientY
		};
	})	

	document.body.addEventListener("click", function(e){
		depositNode = true;
		var node_2 = new Node(mouse.x, mouse.y, circleRadius, "rgba(255, 255, 255, 1)", canvas)
	})


setInterval(function(){ 	
	ctx.clearRect(0, 0, canvas.width,  canvas.height);
	// ctx.fillStyle = "rgba(0,0,0,.5)";
	// ctx.rect(0, 0, canvas.width,  canvas.height);
	// ctx.fill();
	node.move(ctx, mouse.x, mouse.y, depositNode);
 },30);

}

