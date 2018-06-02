class Particle {
	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	move(){
		this.x += 0.1;
		console.log('x:', this.x);
	}
}