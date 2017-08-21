class Particle{
  constructor(index, posX, posY, width, height, innerWidth, innerHeight) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.innerWidth = innerWidth;
    this.innerHeight = innerHeight;
    this.speed = .25;
    this.directionX = 1;
    this.directionY = 1;
    this.color = {r:255,g:255,b:255, a:Math.random()*(0.8 + 0.3) - 0.3};
    this.visited = new Array();
    this.particle = new Array();
    this.rad = 2*Math.PI/180;
    this.life = 100;
    this.index = index;
    this.particle[this.index] = this;
  }
 swim(){
    this.rad += 0.257;

    this.posX += this.speed * this.directionX;
    this.posY += this.speed * this.directionY;

    this.speed += Math.sin(this.rad)/10;

    if(this.posX<=0 || this.posX >=this.innerWidth){
      this.directionX *= -1;
    }    

    if(this.posY<=0 || this.posY >=this.innerHeight){
      this.directionY *= -1;
    }
    if(Math.random()<.25){
      this.directionX = Math.random()>.5?this.directionX=1:this.directionX=-1;
      this.directionY = Math.random()>.5?this.directionY=1:this.directionY=-1;
    }
    // this.color.r = 100;
    // this.color.g = 0;
    // this.color.b = 40;

    // this.colorFinal = "rgba("+this.color.r+","+this.color.g+","+this.color.b+","+this.color.a+")";

  return this.colorFinal; 
  }

}