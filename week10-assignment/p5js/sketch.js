let b
let pad

let handPose;
let video;
let hands = [];

let indexFinger
let gameGo = false

let score = 0

function preload() {
  handPose = ml5.handPose({flipped: true});
}

function setup() {
  createCanvas(640, 480);
  // Create the webcam video and hide it
  video = createCapture(VIDEO, {flipped: true});
  video.size(640, 480);
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
  
  indexFinger = createVector(0, 0);
  
  b = new Ball(width*0.5, height*0.5)
  pad = new Paddle(width-100, height*0.5-50)
}

function draw() {
  //background(0, 170, 0);
  image(video, 0, 0, width, height);

  if(gameGo){
    drawHands()
    b.move()
    b.display()
    
    if(b.reset()){
      score--
    }
    

    pad.display()

    if(b.position.dist(pad.position) <= pad.w){
      b.velocity = pad.bounce(b.velocity)
      score++
    }
  }
  fill(255)
  textSize(32)
  textAlign(CENTER, CENTER)
  text(`Score: ${score}`, width / 2, 30)
}

function drawHands() {
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i]
    let thumb = hand.keypoints[4] // 大拇指
    let indexFinger = hand.keypoints[8] // 食指

    if (thumb && indexFinger) {
      pad.move(indexFinger, thumb) // 使用手指控制挡板
    }

    fill(0, 255, 0)
    noStroke()
    circle(indexFinger.x, indexFinger.y, 10) // 显示食指位置
    circle(thumb.x, thumb.y, 10) // 显示大拇指位置
  }
}


function gotHands(results) {
  // save the output to the hands variable
  hands = results;
  gameGo = true
}
