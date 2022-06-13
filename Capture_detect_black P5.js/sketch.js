let capture;
let grid =18;

function setup() {
  createCanvas(800, 600);
  capture = createCapture(VIDEO);
  capture.size(width / grid, height / grid);
  capture.hide();
}

function draw() {
  background(255); 
  capture.loadPixels();
  for (let y = 0; y < capture.height; y++) {
    for (let x = 0; x < capture.width; x++) {
      let index = (y * capture.width + x) *4 ;
      let r = capture.pixels[index + 0];
      let g = capture.pixels[index + 1];
      let b = capture.pixels[index + 2];
      let bright = (r + g + b) / 3;
      let dist = map(bright, 255, 0, 0, grid);
      noStroke();
      fill(0);
      ellipse(x * grid, y * grid, dist, dist);
    }
  }

}