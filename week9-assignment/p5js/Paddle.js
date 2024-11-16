class Paddle {
    constructor(_x, _y) {
      this.position = createVector(_x, _y)
      this.w = 20 // 固定宽度
      this.h = 100 // 动态高度，根据手指距离调整
      this.clr = color(0, 0, 255)
    }
  
    display() {
      fill(this.clr)
      rectMode(CENTER)
      rect(this.position.x, this.position.y, this.w, this.h)
    }
  
    move(finger1, finger2) {
      // 计算大拇指和食指的中点作为挡板位置
      this.position.x = (finger1.x + finger2.x) / 2
      this.position.y = (finger1.y + finger2.y) / 2
  
      // 动态调整挡板高度为两点之间的距离
      this.h = dist(finger1.x, finger1.y, finger2.x, finger2.y)
    }
  
    bounce(_incomingVector) {
      let normal = createVector(
        this.position.x - _incomingVector.x,
        this.position.y - _incomingVector.y
      ).normalize()
      return p5.Vector.reflect(_incomingVector, normal)
    }
  }
  