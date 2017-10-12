class Circle{
    contructor(posX, posY, width, height){
    }
    display(){
        let canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(95,50,40,0,2*Math.PI);
        ctx.closePath();
        document.body.appendChild(canvas);
    }
}