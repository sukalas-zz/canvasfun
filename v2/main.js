var main = function(){
	var x,y = 0;
	var once = false;

	var elem = make("DIV",);
		elem.id = "anId";

function setup(){
	if(!once){
		var canvas = make("canvas");
		canvas.id = "aCanvas";
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		document.body.appendChild(canvas);
	    ctx = canvas.getContext('2d');

	    num = 1;
	    sinuses = [num]; 

	    minHeight = (canvas.height/3);
	    maxHeight = (canvas.height/1.5);

	    for(i=0;i<num;i++){
	    	sinuses["sinus_"+i] = new Sine(0, Math.random()*(maxHeight-minHeight)+minHeight, canvas.width, canvas.height, ctx);
	    	console.log("sinuses[i]", sinuses["sinus_"+i])
	    }
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
	for(var i=0;i<num;i++){
		sinuses["sinus_"+i].move()
	}
}

function clear(){
	ctx.fillStyle="rgba(0,0,0,.05)";
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