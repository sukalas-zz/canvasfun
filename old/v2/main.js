var main = function(){
	var x,y = 0;
	var once = false;

	var svg = '<svg id="svgLine" height="210" width="500">\
	 		   <line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" />\
	  		   Sorry, your browser does not support inline SVG.\
			   n</svg>';

	var elem = make("DIV",);
		elem.id = "anId";

	elem.innerHTML  = svg;

function setup(){
	if(!once){
		var canvas = make("canvas");
		canvas.id = "aCanvas";
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		document.body.appendChild(canvas);
	    ctx = canvas.getContext('2d');

	    barCode = new Line(canvas.width/2, 0, canvas.width, canvas.height, ctx);

		once = !once;
	}
}

function loop(){
	setup();
	draw();
	drive();
	clear();
}

function draw(){
	requestAnimationFrame(loop);
}

function drive(){
	barCode.move();
}

function clear(){
	ctx.fillStyle = 'rgba(0,0,0,.1)';
	ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

loop();


<!-- Helpers -->
function getId(id){
	return document.getElementById(id);
}
function make(type){
	return document.createElement(type);
}

}