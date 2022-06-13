let cars    = [];
let carSize = 50;
let carGap  = 10;
let score = 0;
let fox = 0;
let foxSpeed = 5;
let gif_bomp_pong_tai;
let win = 0;


function preload(){
   gif_bomp_pong_tai = loadImage("https://64.media.tumblr.com/83cc25c7c7273570c5c3d0a38122cfa1/tumblr_n3dvfdSj5V1r5zq6ao7_r2_400.gifv");
}

function setup() {
  createCanvas(900, 800);
  gif_bomp_pong_tai.resize(width,height);
  for(let i = 0; i < width/carSize; i++) {
    cars[i] = new Car(random(0,width),random(0, height),random(1,3),random(1,3));
  }

  fox = new Fox();
  coin = new Coin(random(0,width),random(0,height));

}

function draw() {
  colorMode(RGB);
  background(255);
  strokeWeight(2);
  stroke(0);
  fill('#95C8D7');
  quad(0, 0, width, 0, width/3, height,0,height);
  fill('#B6E3E9');
  quad(400, 0, width, 0, width, height, width/3, height);
  fill('D1EAF5');
  quad(400, 0, width, 0, width/2, height, width/3, height);
  fill('#789CCE');
  quad(400, 0, width/8, 0, width, height, width/3, height);
  noStroke();

  for(let i = 0; i < height/carSize; i++) {
    cars[i].body();
    cars[i].move();
    cars[i].bounce();
    cars[i].checkCollision();
  }

  fox.body();
  fox.move();
  //console.log(fox.x); 
  coin.body();
  coin.checkCollision();
  console.log("score is "+ score); 
  if(score == 5){
    console.log("YOU WIN");
    image(gif_bomp_pong_tai, 0, 0);
    fill(50);
    fill(0);
    textSize(200);
    textAlign(CENTER, CENTER);
    text('YOU WIN',width/2,height/2);
  }
}
function keyTyped(){
  if(key === 'r'){
    score = 0;
    fox.x = width/2;
    fox.y = height ;
  }
}

class Coin{
  
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  body(){
  fill('#DFBE26');
  ellipse(this.x,this.y,30);
  fill('#C5971D');
  ellipse(this.x,this.y,22);
  }
  checkCollision() {
    let d = dist(fox.x-70,fox.y-120,this.x ,this.y);

    if(d < 35) {
      coin.x = random(0,width);
      coin.y = random(0,height);
      score += 1;
    }
  }
}

class Car {

  constructor(x,y,speedx,speedy){
    this.x = x;
    this.y = y;
    this.speedx = speedx;
    this.speedy = speedy;
  }

  body() {
    stroke(1);
    fill('#DD2DD8');
    ellipse(this.x, this.y,carSize+45,carSize-30);
    fill('#7B2ADB');
    arc(this.x, this.y, 60, 70, PI, TWO_PI);
    fill('#E7EE16');
    ellipse(this.x, this.y-15,carSize-35,carSize-35);
    //ellipse(this.x, this.y-15,60,50);
  }

  move() {
    this.x += this.speedx;
    this.y += this.speedy;
  }
  
  bounce(){
    if(this.x < 0|| this.x > width){
      this.speedx *= -1;
      
    }
    if(this.y < 0|| this.y > height){
      this.speedy *= -1;
      
    }
  }

  checkCollision() {
    let d = dist(fox.x-70,fox.y-120,this.x ,this.y-15);

    if(d < carSize/2 + 35) {
      fox.x = width/2;
      fox.y = height ;
      score = 0;
    }
  }

}

class Fox {

  constructor() {
    this.x = width/2;
    this.y = height - 30;
  }

  body() {
  
  //body
  fill(255, 153, 0);
  stroke(2);
  ellipse(this.x-55,this.y-90, 70, 70);
  fill(250);
  ellipse(this.x-55,this.y-90, 35, 30);
  
  //front legs
  fill(205, 77, 10);
  rect(this.x-40,this.y-90,35,35,300,80,5,5);
  fill(205, 77, 10);
  rect(this.x-108,this.y-90,35,35,300,80,5,5);

  //ears
  fill(255, 153, 0);
  triangle(this.x -110, this.y -200, this.x -94, this.y -140, this.x -70, this.y -180);
  fill(255, 153, 0);
  triangle(this.x , this.y -200, this.x -14, this.y -140, this.x -40, this.y -180);
    
  //head
  fill(195, 67, 0);
  ellipse(this.x -55,this.y -160, 60, 50);
  
  //eyes
  fill(195, 67, 0);
  ellipse(this.x -87,this.y -130, 65, 55);
  fill(195, 67, 0);
  ellipse(this.x -23,this.y -130, 65, 55);
  fill(250);
  ellipse(this.x -87,this.y -130, 55, 55);
  fill(250);
  ellipse(this.x -23,this.y -130, 55, 55);
  fill(0);
  ellipse(this.x -87,this.y -130, 10, 10);
  fill(0);
  ellipse(this.x -23,this.y -130, 10, 10); 
  //fill(255);
  //ellipse(this.x-55,this.y-90, 70, 70);
  }
  
  move() {
     if(keyIsDown(LEFT_ARROW)) {
       this.x -= foxSpeed;
     }
     if(keyIsDown(RIGHT_ARROW)) {
       this.x += foxSpeed;
     }
     if(keyIsDown(UP_ARROW)) {
      this.y -= foxSpeed;
     }
    if(keyIsDown(DOWN_ARROW)) {
       this.y += foxSpeed;
    }
  }
}

