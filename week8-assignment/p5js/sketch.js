let handPose;
let video;
let hands = [];
let ballx, bally
let ballspeedx, ballspeedy
let ballRadius = 15

let player1Score = 0
let player2Score = 0

let leftRectY
let rightRectY

let gameStarted = false 

function preload() {
  // 加载手势识别模型
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640*1.5, 480*1.5);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640*1.5, 480*1.5);
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands)
  
  let leftRectY = height / 2
  let rightRectY = height / 2  
  
  //创建开始按钮
  const startButton = createButton('START')
  startButton.position(width / 2 - 40, height + 45)
  startButton.mousePressed(startGame)
  
  // 设置按钮样式
  startButton.style('width', '100px')       // 按钮宽度
  startButton.style('height', '100px')      // 按钮高度
  startButton.style('border-radius', '20%') // 将按钮变成圆形
  startButton.style('font-size', '20px')    // 调整按钮字体大小
  startButton.style('background-color', 'rgb(255,255,0)') //设置按钮背景颜色
  startButton.style('color', 'rgb(0,0,255)')     // 设置字体颜色
  startButton.style('border', 'none')       // 去掉按钮边框
  startButton.style('cursor', 'pointer')    // 鼠标悬停时显示指针
  startButton.style('border', '3px solid rgb(0,0,255)')
  
  resetBall()

}

function draw() {
  background(0,10)
  // Draw the webcam video
      // 将画布的水平轴翻转
  push()
  translate(width, 0); // 将原点移动到画布右上角
  scale(-1, 1); // 水平翻转画布

  
  image(video,0,0,width,height)
  //pop()


  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    // console.log(hand.keypoints)
    let keypoint9 = hand.keypoints[9]
    
    //定义玩家位置
    if(keypoint9.x < width / 2){
      leftRectY = keypoint9.y
    }else{
      rightRectY = keypoint9.y
    }
    
}
    
      fill(255, 255, 0);
      stroke(10);
      rect(10, leftRectY - 100, 10, 200) // 左侧矩形
      rect(width - 20, rightRectY - 100, 10, 200) // 右侧矩形
    
      //let rectX = width - keypoint9.x 
    
    //检测小球
   if (ballx - ballRadius < 20 && bally > leftRectY - 100 && bally < leftRectY + 100) {
    ballspeedx = ballspeedx * -1
  }
  
  if (ballx + ballRadius > width - 20 && bally > rightRectY - 100 && bally < rightRectY + 100) {
    ballspeedx = ballspeedx * -1
  }
      


     // pop()
  
  //小球
  fill(0,255,255)
  stroke(0)
  ellipse(ballx, bally, ballRadius * 2, ballRadius * 2)
  
  //检测游戏是否开始
  if(gameStarted === true){
  ballx = ballx + ballspeedx
  bally = bally + ballspeedy
}
  
  
  //检测小球和边界碰撞  
  if(bally - ballRadius <0 || bally + ballRadius> height){
    ballspeedy = ballspeedy*-1
  }
  
  
  //得分判定
  if(ballx - ballRadius < 0 ){
    player1Score++
    resetBall()
  }else if(ballx + ballRadius > width){
    player2Score++
    resetBall()
  }
  
  pop()
  //显示得分
  fill(0)
  textSize(40)
  textAlign(CENTER, CENTER)
  text(`${player1Score}`, width / 4, 50)
  text(`${player2Score}`, (3 * width) / 4, 50)
  
  
}

function startGame(){
  gameStarted = true
  ballspeedx = random(1)<0.5?random(5,10):random(-10,-5)
  ballspeedy = random(1)<0.5?random(5,10):random(-10,-5)
}



// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}


function resetBall(){

  ballx = width/2
  bally = height/2
  ballspeedx = random(1)<0.5?random(5,10):random(-10,-5)
  ballspeedy = random(1)<0.5?random(5,10):random(-10,-5)
  
}