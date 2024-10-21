let angle  // 当前角度
let angleVel  // 角速度
let angleAcc  // 角加速度
let origin  // 钟摆的原点
let length  // 钟摆的长度
let ballRadius = 40  // 钟摆球的半径
let gravity = 0.3  // 重力常数
let ballColor
let lineColor

let noiseColor

let t = 0//噪声变化

function setup() {
  createCanvas(windowWidth,windowHeight)
  colorMode(HSB, TWO_PI, 1, 1)
  origin = createVector(width / 2, height / 2)  // 钟摆的悬挂点
  length = 250  // 钟摆的长度
  angle = PI / 4  // 初始角度，设置为45度
  angleVel = 0  // 初始角速度
  angleAcc = 0  // 初始角加速度
  ballColor = color (0,1,1)//小球初始颜色
  lineColor = color(1,1,1)

}

function draw() {
  background(0)
  
  //绘制背景噪声
  let centerX = width / 2;  // 画布的中心X坐标
  let centerY = height / 2;  // 画布的中心Y坐标
  
  if(abs(angle - PI/4) < 0.001 || 
     abs(angle + PI/4) < 0.001){
    noiseColor= color (random(TWO_PI), 1, 1)
  }
  stroke(noiseColor)
  noFill()//不填充
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.1) {
    let r = noise(t + a) * 500; // 使用柏林噪声生成半径
    let x = centerX + r * cos(a);  // 根据角度和半径计算 x 坐标
    let y = centerY + r * sin(a);  // 根据角度和半径计算 y 坐标
    vertex(x, y);
  }
  endShape(CLOSE);

  t += 0.01; // 增加时间，生成动画效果
  

  // 计算角加速度（钟摆的运动方程）
  angleAcc = (-1 * gravity / length) * sin(angle)

  // 更新角速度和角度
  angleVel = angleVel + angleAcc

  angle = angle + angleVel

  //小球颜色变化
  if(abs(angle - PI/4) < 0.001 || 
     abs(angle + PI/4) < 0.001){
    ballColor= color (random(TWO_PI), 1, 1)
  }
  
  //绳子颜色变化
  if(abs(angle - PI/4) < 0.001 || 
     abs(angle + PI/4) < 0.001){
    lineColor= color (random(TWO_PI), 0.5, 1)
  }
  
  // 计算钟摆球的位置
  let ballX = origin.x + length * sin(angle)
  let ballY = origin.y + length * cos(angle)

  // 绘制钟摆的线和球
  stroke(lineColor)
  strokeWeight(3)
  line(origin.x, origin.y, ballX, ballY)  // 绘制钟摆的线
  fill(ballColor)
  ellipse(ballX, ballY, ballRadius, ballRadius)  // 绘制钟摆的球

  

  
}



function windowResized(){
resizeCanvas(windowWidth,windowHeight)
origin.set(width / 2, height / 2) // 重新将悬挂点设置为窗口的中心
}
