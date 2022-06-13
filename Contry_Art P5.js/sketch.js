let BG;
let img;
let back;
let turtle;
let value = 0;
var num = 500;
var noiseScale = 320, noiseStrength = 1;
var particles = [num];
var particles2 = [num];
var particles3 = [num];
let mode = 0;
var inc = 0.1;
var scl = 10;
var cols, rows;
var zoff = 0;
var fr;
var particlesX = [];
var flowfield;
var points = [];
var mult;
let r_5;
let factor_5 = 0;
let keys = 0;
let input;
let modeus = 0;
let soundaf 
let soundmore 
let soundus
let soundsus 
let soundas 
let soundeu 
let soundaus

function preload() {
    back = loadImage('pic/back.jpg');
    BG = loadImage('https://cdn.shopify.com/s/files/1/0230/2984/1992/products/kids-cartoon-world-map-wall-mural_1200x630.jpg');
    turtle = loadImage('pic/turtle.png')
    soundaf = loadSound('pic/soundaf.mp3')
     soundmore = loadSound('pic/andonandon.mp3')
     soundus = loadSound('pic/soundus.mp3')
     soundsus = loadSound('pic/soundsus.mp3')
     soundas = loadSound('pic/soundas.mp3')
     soundeu = loadSound('pic/soundeu.mp3')
     soundaus = loadSound('pic/soundaus.mp3')

}

function setup() {
    createCanvas(800, 600);
    BG.resize(width, height);
    back.resize(width, height);
    turtle.resize(width, height);
    let button = createButton("save");
    button.mousePressed(saveImg);
    input = createInput();
    let button2 = createButton('submit','num');
    button2.mousePressed(onInput);
    for (let i = 0; i < num; i++) {
        //x value start slightly outside the right of canvas, z value how close to viewer
        var loc = createVector(random(width * 1.2), random(height), random(0, 10));
        var loc2 = createVector(random(width), random(height), random(0, 10));
        var loc3 = createVector(random(width * 4), random(height), random(0, 10));
        var angle = 0; //any value to initialize
        var dir = createVector(cos(angle), sin(angle));
        var dir2 = createVector(sin(angle), cos(angle));
        var speed = random(0.5, 3);
        // var speed = random(5,map(mouseX,0,width,5,20));   // faster
        particles[i] = new Particle(loc, dir, speed);
        particles2[i] = new Particle2(loc2, dir2, speed);
        particles3[i] = new Particle3(loc3, dir, speed);
        cols = floor(width / scl);
        rows = floor(height / scl);
        fr = createP('');
        flowfield = new Array(cols * rows);
        for (var u = 0; u < 300; u++) {
            particlesX[u] = new ParticleX();
        }
    }
    /////////////
    noiseDetail(1); //ถ้าเอาออกมันจะวิ่งไม่ตรง
    shuffle(points, true);
    r2 = random(255);
    g1 = random(255);
    g2 = random(255);
    b1 = random(255);
    b2 = random(255);

    mult = random(0.002, 0.01) //กำหนดการไหล่ของเส้น
    image(turtle, 0, 0);

    /////////////
    r_5 = height / 2 - 16;

} 
function onInput() { 
  keys = input.value() 
  input.value('');
  console.log('key : ',keys)
  
}
function getVector(index, total) {
    const angle = map(index % total, 0, total, 0, TWO_PI);
    const v = p5.Vector.fromAngle(angle + PI);
    v.mult(r_5);
    return v;
}
function draw() {
    if (mode == 1) {
        mode1()
    }
    if (mode == 2) {
      mode2()
    }
    if (mode == 3) {
      mode3()
    }
    if (mode == 4) {
        mode4()
    }
    if (mode == 5) {
        mode5()
    }
}
function mouseClicked() {
    if (value > 0) {
        if (mouseX < 7 * width / 7 && mouseY < height / 7) {
            console.log("NONE");
            console.log("m2");
            mode = 2;
            soundmore.play()
        } //เว้นแกน x แถว 1 (บนสุด)
        else if ((mouseX < 2 * width / 7 && mouseY < 3 * height / 7) || (mouseX < 3 * width / 7 && mouseY < 2 * height / 7) || (mouseX < width / 7 && mouseY < 4 * height / 7)) {
            console.log("North America");
            console.log("m3");
            image(back, 0, 0);
            mode = 3;
            soundus.play()
        }
        else if ((mouseX < width / 7 && mouseY < 6 * height / 7) || (mouseX < 3 * width / 7 && mouseY < 3 * height / 7)) {
            console.log("NONE");
            console.log("m2");
            mode = 2;
            soundmore.play()
        } //เว้นว่าง (x,y) = (3,3),(1,5),(1,6)
        else if (mouseX < 2 * width / 7 && mouseY < 4 * height / 7) {
            console.log("South America");
            console.log("m3");
            image(back, 0, 0);
            mode = 3
            soundsus.play()
        }
        else if (mouseX < 3 * width / 7 && mouseY < 4 * height / 7) {
            console.log("AFRICA");
            console.log("m1");
            mode = 1;
           soundaf.play()
        }
        else if ((mouseX < 3 * width / 7 && mouseY < 5 * height / 7) || (mouseX < 2 * width / 7 && mouseY < 6 * height / 7)) {
            console.log("South America");
            console.log("m3");
            image(back, 0, 0);
            mode = 3
            modeus = 2
           soundsus.play()
        }
        else if (mouseX < 3 * width / 7 && mouseY < 6 * height / 7) {
            console.log("NONE");
            console.log("m2");
            mode = 2;
            soundmore.play()
        } //เว้นว่าง (x,y) = (3,6)
        else if (mouseX < 4 * width / 7 && mouseY < 3 * height / 7) {
            console.log("Europe");
            console.log("m4");
            mode = 4
            soundeu.play()
        }
        else if (mouseX < 4 * width / 7 && mouseY < 6 * height / 7) {
            console.log("AFRICA");
            console.log("m1");
            mode = 1;
            soundaf.play()
        }
        else if ((mouseX < 6 * width / 7 && mouseY < 4 * height / 7) || (mouseX < width && mouseY < 2 * height / 7)) {
            console.log("ASIA");
            console.log("m5");
            mode = 5;
            soundas.play()
        }
        else if ((mouseX < 5 * width / 7 && mouseY < 6 * height / 7) || (mouseX < width && mouseY < 4 * height / 7)) {
            console.log("NONE");
            console.log("m2");
            mode = 2;
            soundmore.play()
        } //เว้นว่าง (x,y) = (7,3),(7,4),(5,5),(5,6)
        else if (mouseX < width && mouseY < 6 * height / 7) {
            console.log("AUSTRALIA");
            mode = 1
            modeus = 3
            soundaus.play()
        }
        else if (mouseX < width && mouseY < height) {
            console.log("NONE");
            console.log("m2");
            mode = 2;
            soundmore.play()
        } //เว้นแกน x แถว 7(ล่างสุด)
    }
    value += 1
    console.log(value)
}
function mousePressed() {
    if (value === 0) {
        image(BG, 0, 0);
    }
}
function mode1(){
  if(modeus == 0){
        fill(0, 10);
     }
  else if(modeus == 3){
     colorMode(HSB, 10,10);
     }
        noStroke();
        rect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].run();
            particles2[i].run();
            particles3[i].run();
        }
}
function mode2(){
  var yoff = 0;
        for (var y = 0; y < rows; y++) {
            var xoff = 0;
            for (var x = 0; x < cols; x++) {
                var index = x + y * cols;
                var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
                var v = p5.Vector.fromAngle(angle);
                v.setMag(1);
                flowfield[index] = v;
                xoff += inc;
                stroke(0, 50);
                // push();
                // translate(x * scl, y * scl);
                // rotate(v.heading());
                // strokeWeight(1);
                // line(0, 0, scl, 0);
                // pop();
            }
            yoff += inc;
            zoff += 0.0003;
        }

        for (var i = 0; i < particlesX.length; i++) {
            particlesX[i].follow(flowfield);
            particlesX[i].update();
            particlesX[i].edges();
            particlesX[i].show();
        }

}
function mode3(){
        noStroke();
        if(modeus == 2){
          angleMode(DEGREES);
           }
        var density = keys * 5; //กำหนดว่าจะสร้างเส้นกี่เส้น
        var space = width / density;
        for (var xq = 0; xq < width; xq += space) {
            for (var yq = 0; yq < height; yq += space) {
                var p = createVector(xq + random(-10, 10), yq + random(-10, 10)) //กำหนดจุดเริ่มต้น
                points.push(p);
            }
        }
        if (frameCount * 5 <= points.length) {
            var max = frameCount * 2;
        }
        else {
            var max = points.length;
        }

        for (var e = 0; e < max; e++) {

            fill(255, keys*4+100, keys*20);

            var angleq = map(noise(points[e].x * mult, points[e].y * mult), 0, 1, 0, 720);

            points[e].add(createVector(cos(angleq), sin(angleq))); //ให้มันวิ่ง


            if (dist(width / 2, height / 2, points[e].x, points[e].y) < 700) //กำหนดขอบเขตของวงกลม
            {
                ellipse(points[e].x, points[e].y, 1); //สร้างเส้น
            }

        }
}
function mode4(){
        createCanvas(800, 600, WEBGL);
        angleMode(DEGREES);
        background(30);
        rotateX(60);
        noFill()
        stroke(255)
        for (var o = 0; o < keys*2; o++) //จำนวนวงกลม
        {
            var rq = map(sin(frameCount / 2), -1, 1, 100, 200);
            var gq = map(o, 0, 20, 100, 255);
            var bq = map(sin(frameCount), -1, 1, 255, 100);

            stroke(rq, gq, bq);
            strokeWeight(4);

            beginShape();
            for (var j = 0; j < 360; j += 5) { //ความเหลี่ยมของรูป
                var rad = o * 20; //ระห่างของแต่ละเส้น หรือ ความใหญ่ของวงกลม
                var x1 = rad * cos(j);
                var y1 = rad * sin(j);
                var z1 = sin(5 * frameCount + o * 20) * 50; // 50 ความสูง

                vertex(x1, y1, z1);
            }
            endShape(CLOSE);
        }
}
function mode5(){
        background(0);
        const total = keys*100; //int(map(mouseX, 0, width, 0, 200));
        factor_5 += 0.015;

        translate(width / 2, height / 2);
        stroke(255, 150);
        strokeWeight(2);
        noFill();
        ellipse(0, 0, r_5 * 2);

        strokeWeight(2);
        for (let i = 0; i < total; i++) {
            const a = getVector(i, total);
            const b = getVector(i * factor_5, total);
            line(a.x, a.y, b.x, b.y);
        }
        translate(width * 2, height * 2);
}
function saveImg() {
    save('myCanvas.jpg');
}

class Particle {
    constructor(_loc, _dir, _speed) {
        this.loc = _loc;
        this.dir = _dir;
        this.speed = _speed;
        // var col;
    }
    run() {
        this.move();
        this.checkEdges();
        this.update();
    }
    move() {
        let angle = noise(this.loc.x / noiseScale, this.loc.y / noiseScale, frameCount / noiseScale) * TWO_PI * noiseStrength; //0-2PI
        this.dir.x = cos(angle);
        this.dir.y = sin(angle);
        var vel = this.dir.copy();
        var d = 1;  //direction change 
        vel.mult(this.speed * d); //vel = vel * (speed*d)
        this.loc.add(vel); //loc = loc + vel
    }
    checkEdges() {
        //float distance = dist(width/2, height/2, loc.x, loc.y);
        //if (distance>150) {
        if (this.loc.x < 0 || this.loc.x > width || this.loc.y < 0 || this.loc.y > height) {
            this.loc.x = random(width * 1.2);
            this.loc.y = random(height);
        }
    }
    update() {
        fill(0, 250, keys*5);
        ellipse(this.loc.x + 10, this.loc.y, this.loc.z);
    }
}
class Particle2 {
    constructor(_loc, _dir, _speed) {
        this.loc = _loc;
        this.dir = _dir;
        this.speed = _speed;
        // var col;
    }
    run() {
        this.move();
        this.checkEdges();
        this.update();
    }
    move() {
        let angle = noise(this.loc.x / noiseScale, this.loc.y / noiseScale, frameCount / noiseScale) * TWO_PI * noiseStrength; //0-2PI
        this.dir.x = cos(angle);
        this.dir.y = sin(angle);
        var vel = this.dir.copy();
        var d = 1;  //direction change 
        vel.mult(this.speed * d); //vel = vel * (speed*d)
        this.loc.add(vel); //loc = loc + vel
    }
    checkEdges() {
        //float distance = dist(width/2, height/2, loc.x, loc.y);
        //if (distance>150) {
        if (this.loc.x < 0 || this.loc.x > width || this.loc.y < 0 || this.loc.y > height) {
            this.loc.x = random(width * 1.2);
            this.loc.y = random(height);
        }
    }
    update() {
        fill(keys*15, 250, 250);
        ellipse(this.loc.x, this.loc.y, this.loc.z);
    }
}
class Particle3 {
    constructor(_loc, _dir, _speed) {
        this.loc = _loc;
        this.dir = _dir;
        this.speed = _speed;
        // var col;
    }
    run() {
        this.move();
        this.checkEdges();
        this.update();
    }
    move() {
        let angle = noise(this.loc.x / noiseScale, this.loc.y / noiseScale, frameCount / noiseScale) * TWO_PI * noiseStrength; //0-2PI
        this.dir.x = cos(angle);
        this.dir.y = sin(angle);
        var vel = this.dir.copy();
        var d = 1;  //direction change 
        vel.mult(this.speed * d); //vel = vel * (speed*d)
        this.loc.add(vel); //loc = loc + vel
    }
    checkEdges() {
        //float distance = dist(width/2, height/2, loc.x, loc.y);
        //if (distance>150) {
        if (this.loc.x < 0 || this.loc.x > width || this.loc.y < 0 || this.loc.y > height) {
            this.loc.x = random(width * 2);
            this.loc.y = random(height * 2);
        }
    }
    update() {
        fill(250, keys*15, 250);
        ellipse(this.loc.x, this.loc.y, this.loc.z);
    }
}

class ParticleX {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxspeed = 4;
        this.prevPos = this.pos.copy();
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    follow(vectors) {
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);
        var index = x + y * cols;
        var force = vectors[index];
        this.applyForce(force);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    show() {
        stroke(255, 10);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
    }

    updatePrev() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    edges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrev();
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrev();
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrev();
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrev();
        }
    }
}
