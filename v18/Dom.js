class Dom {
    constructor(id, width, height) {
        this.e = document.createElement('canvas');
        this.ctx = this.e.getContext('2d');
        this.e.id = id;
        this.e.width = width;
        this.e.height = height;
    }

    draw(x, y, width, height, color) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }
    
    changeColor(magicNum){
        let red; let green; let blue; let a;
        if(magicNum < 0.35){
            red = Math.floor( Math.floor(Math.random() * 255));
            green = Math.floor(Math.random() * 255);
            blue = Math.floor(Math.random() * 255);
            a = Math.round(Math.random() * (0.75 - .25) + .25);
        } else {
            red = '255';
            green ='255';
            blue = '255';
            a = 0.8;
        }
        let color = `rgba(${red},${green},${blue},${a})`;
        return color;
    }

    clean(x, y, width, height) {
        this.ctx.clearRect(x, y, width, height);
    }

    cleanFaded(x, y, width, height, color) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }
}