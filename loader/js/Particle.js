class Particle {
    constructor(x, y, width, height, canvasW, canvasH) {
        this.x = x;
        this.y = y;
        this.direction = 'right';
        this.acceleration = 1;
        this.speed = 5;
        this.width = width;
        this.height = height;
        this.color = "black";
        this.canvasW = window.innerWidth;
        this.canvasH = window.innerWidth;
        this.start = 0;
        this.clearColor = `rgba(0, 0, 0, 0.05)`;
        this.directions = ['right', 'down', 'left', 'up'];
    }

    move(dir) {
    	// this.speed = this.speed + 1;

        switch (this.direction) {
            case 'right':
                this.x += this.speed;
                this.color = `rgba(24, 21, 237, 0.3)`;
                break;
            case 'down':
                this.y += this.speed;
                this.color = `rgba(85, 21, 237, 0.3)`;
                break;
            case 'left':
                this.x -= this.speed;
                this.color = `rgba(132, 21, 237, 0.3)`;
                break;
            case 'up':
                this.y -= this.speed;
                this.color = `rgba(60, 21, 237, 0.3)`;
                break;
        }


        if(this.x > this.canvasW) {
        	this.x = 0;
        } else if( this.x < 0) {
        	this.x = this.canvasW;
        }
         if(this.y > this.canvasH) {
        	this.y = 0;
        } else if( this.y < 0) {
        	this.y = this.canvasH;
        }

    
        if(Math.random()<0.01){
        	let rand = Math.floor(Math.random() * 4);
        	console.log(rand)
        	this.direction = this.directions[rand];
        }

    }
}