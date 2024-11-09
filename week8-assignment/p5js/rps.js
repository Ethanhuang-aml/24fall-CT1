class RPS{
    constructor(type, x, y){
      this.type = type
      this.position = createVector(x, y)
      this.velocity = p5.Vector.random2D()
      this.velocity.setMag(random(2,5))
      
      this.setAppearance()
    }
    
    // 设置不同手势的形状
    setAppearance(){
      if(this.type === "scissors"){
        this.color = color(TWO_PI * 1, 0.8, 0.8)
        }else if(this.type === "rock"){
          this.color = color(TWO_PI * 0.1, 0.8, 0.8)
        }else if(this.type === "paper"){
          this.color = color(TWO_PI * 0.3, 0.8, 0.8)
        }
    }
    
    move(){
      this.position.add(this.velocity)
      if(this.position.x < 0 || this.position.x > width) this.velocity.x *= -1
      if(this.position.y < 0 || this.position.y > height) this.velocity.y *=-1
    }
    
    display(){
      fill(this.color)
      noStroke()
      
  
      if(this.type === "scissors"){    // 剪刀用叉表示
        stroke(this.color)
        strokeWeight(5)
        line(this.position.x -10, this.position.y -10, this.position.x +10, this.position.y +10)
        line(this.position.x +10, this.position.y -10, this.position.x -10, this.position.y +10)
      }else if(this.type === "rock"){
        noStroke()
        ellipse(this.position.x, this.position.y, 40, 40)
      }else if(this.type === "paper"){
        rectMode(CENTER)
        rect(this.position.x, this.position.y, 30, 50)
      }
    }
    
    
    // 交互逻辑
    interactWith(otherRPS){
      // 检查是否按键
      if(dominantType&&otherRPS.type === dominantType){
        this.type = dominantType
        this.setAppearance()
      }else if(this.position.dist(otherRPS.position) < 50){
        // 正常交互逻辑
        if(this.type ==="scissors"&&otherRPS.type === "rock"){
          this.type = "rock"
          this.setAppearance()
        }else if(this.type ==="rock"&&otherRPS.type === "paper"){
          this.type = "paper"
          this.setAppearance()
        }else if(this.type === "paper"&&otherRPS.type === "scissors"){
          this.type = "scissors"
          this.setAppearance()
        }
      }
    }
     
  }