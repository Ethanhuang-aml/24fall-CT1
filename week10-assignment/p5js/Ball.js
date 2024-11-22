class Ball{
    constructor(_x, _y){
      this.position = createVector(_x, _y);
      this.velocity = createVector(3, random(-2, 2));
      this.acceleration = createVector(0, 0);
      
      this.maxSpeed = 5
      
      this.radius = 20
      this.clr = color(255, 0, 0)
    }
    
    display(){
      fill(this.clr)
      circle(this.position.x, this.position.y, this.radius*2)
    }
    
    move(){
      this.velocity.add(this.acceleration)
      this.position.add(this.velocity)
      
      if(
        this.position.y - this.radius*0.5 <= 0 ||
        this.position.y + this.radius * 0.5 >= height
        ){
        this.velocity.y *= -1
      }
      if(this.position.x - this.radius*0.5 <= 0){
        console.log("flip")
        this.velocity.x *= -1
      }
    }
    
    reset(){
      if(this.position.x > width + 10){
        this.position.x = width*0.5
        this.position.y = height*0.5
        return true
      }
      else {
        return false
      }
    }
  }