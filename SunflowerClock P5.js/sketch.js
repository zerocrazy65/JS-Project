let sun
function preload(){
  sun = loadImage("pic/sunflower.png")
}
function setup(){
  createCanvas(800, 800)
  angleMode(DEGREES)
}

function draw(){
  background('#41DDD6')
  translate(width / 2 , height / 2-200)
  let sec = second()
  let min = minute()
  let ho = hour()
  let date = day()
  let circle = 30
  let circle2 = 15
  rectMode(CORNER)
  fill(53, 111, 33)
  rect(-30, 0, 50,600)
  fill(117, 91, 17)
  rect(-10, 0, 10,600)
  ellipse(0,0,200,200)
    let x  = date%7
    for(let d = 0; d < x; d++){
    fill(8, 52, 18)
    if(d%2 == 0  ){
      ellipse(60,300+d*50,100,50)
    }else if(d%2 >= 0){
      ellipse(-70,200+d*50,100,50)
    }
    console.log('d is ' +d)
   }
  
    for(let f = 0; f < date; f += 7){
      if(f/7 >= 1 && f%7 == 0){
       image(sun, -500+f*25, 380,300,300);
      }else if(date/7 < 1){
       sun.reset();
      }
     console.log('f is = '+ f)
    }
  for(let h = 0; h < ho*15; h += circle2){
    rotate(circle2)
    fill(238, 193, 10)
    ellipse(150, 0, 150,80)
    console.log('hour = ' + ho)
  }
  for(let m = 0; m < min*6; m += circle){
    rotate(circle)
    fill(238, 158, 10)
    ellipse(100, 0, 150,80)
    console.log('minute = ' + min)
  }
  for(let s = 0; s < sec*6; s += circle){
    rotate(circle)
    fill(123, 84, 5)
    ellipse(50, 0, 100,50)
    console.log('second = '+ sec)
  }
   fill(97, 55, 5)
   ellipse(0,0,100,100)
}
