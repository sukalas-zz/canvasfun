class Particle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.direction = 1;
        this.speed = 0.25;
        this.accelerationX = 1;
        this.accelerationY = 1;
        this.width = width;
        this.height = height;
        this.angle = Math.PI;
    }

    move() {
        this.x += this.speed * this.direction * this.accelerationX;
        this.angle += 0.025;
        this.y += this.speed * this.direction * this.accelerationY;

        if(Math.random() < 0.5){
            // this.direction *= -1;
        }

        if(this.x > window.innerWidth) {
            this.x = -10;
        }
        if(this.y < 0) {
            this.y = window.innerHeight;
        }
        if(this.y > window.innerHeight) {
            this.y = 0;
        }
    }

}