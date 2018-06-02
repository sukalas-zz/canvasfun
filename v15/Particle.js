class Particle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.direction = 1;
        this.speed = 0.6;
        this.accelerationX = 1;
        this.accelerationY = 1;
        this.friction = 0;
        this.width = width;
        this.height = height;
        this.angle = Math.PI;
    }

    move() {
        this.x += this.speed * this.direction * this.accelerationX + Math.sin(this.angle);
        this.y += this.speed * this.direction * this.accelerationY + Math.cos(this.angle);
        this.angle -= 0.025;

        // if(Math.random() < 0.25){
        //     this.directionX *= -1;
        //     this.directionY *= -1;
        // }

        if(this.x > window.innerWidth || this.x < 0) {
            this.x = Math.random() * ((window.innerWidth/2 + 5) - 5) - window.innerWidth/2 ;
            this.y = Math.random() * ((window.innerHeight/2 + 5) - 5) - window.innerHeight/2 ;
        }
        if(this.y < 0 || this.y > window.innerHeight) {
            this.x = window.innerWidth /2;
            this.y = window.innerHeight/2;
        }
    }

}