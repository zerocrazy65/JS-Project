var start = 0

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  
  noiseDetail(4)
}

function draw() {
  background(30);
  noStroke()
  
  translate(width/2 , height/2)
  
  var space = 1
  
  for (var i = 0; i < 360; i += space){
    
    var xoff = map(cos(i), -1, 1, 0, 3)
    var yoff = map(sin(i), -1, 1, 0, 3)
    
    var n = noise(xoff+start, yoff+start)
    
    var h = map(n, 0, 1, -150, 150)
    
    var r = map(sin(i), -1, 1, 10, 240)
    var g = map(h, -150, 150, 0, 120)
    var b = map(n, 0, 1, 150, 255)
    
    rotate(space)
    
    fill(r, g, b)
    ellipse(h, n, h*20, n)
  }
  start += 0.01
}