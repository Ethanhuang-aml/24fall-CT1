let rps = []
let dominantType = null; // 全局变量，表示当前的统治手势类型

function setup() {
 createCanvas(800, 600)
 colorMode(HSB,TWO_PI,1,1)
 
 const scissorsButton = createButton('Scissors')
 scissorsButton.position(20, height + 20)
 scissorsButton.mousePressed(()=>dominantType = "scissors")
 
 const rockButton = createButton('Rock')
 rockButton.position(90,height+20 )
 rockButton.mousePressed(()=>dominantType="rock")
 
 const paperButton = createButton('Paper')
 paperButton.position(140,height+20)
 paperButton.mousePressed(()=>dominantType="paper")
 
   // 添加“消除统治”按钮
 const clearDominantButton = createButton('Reset');
 clearDominantButton.position(200, height + 20);
 clearDominantButton.mousePressed(() => dominantType = null); // 点击后清除统治类型

}



function draw() {
 background(0)
 
   // 遍历每个手势对象
   rps.forEach((p,index)=>{
   p.move()
   p.display()
     
     
// 与其他手势交互
   for(let i = 0; i<rps.length; i++){
     if(i !==index){
       p.interactWith(rps[i])
     }
   }
 })
}



function mouseReleased(){
 const types = ["scissors", "rock", "paper"]
 const randomType = random(types)
 rps.push(new RPS(randomType, mouseX, mouseY))
}