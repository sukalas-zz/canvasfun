var main = function(){
	var x,y = 0;
	var once = false;

	var elem = make("div",);
		elem.id = "anId";

function setup(){
	if(!once){
		var canvas = make("canvas");
		canvas.id = "aCanvas";
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		document.body.appendChild(canvas);
	    ctx = canvas.getContext('2d');

	    sinus1 = new Sine(0, 0, canvas.width, canvas.height, ctx);

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
	sinus1.move();
}

function clear(){
	ctx.fillStyle = 'rgba(0,0,0,.05)';
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