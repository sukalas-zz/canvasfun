class Circle{
    width:number;
    height:number;

    contructor(posX, posY, width:number, height:number){
    }
    display(){
        let canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(95,50,40,0,2*Math.PI);
        ctx.closePath();
        console.log(canvas.width);
        document.body.appendChild(canvas);
    }
}