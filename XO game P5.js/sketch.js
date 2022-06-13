let box;
let coordinateX;
let coordinateY;
let winner;
let player = 0;
let gif_Trollface;
let img;

function preload(){
  gif_Trollface = loadImage("https://i.imgur.com/z1NMAbi.gif");
  img = loadImage("https://cdn.pixabay.com/photo/2015/05/27/15/49/monkey-786858_960_720.png");
}

function setup() {
  createCanvas(800, 800);
  gif_Trollface.resize(width,height);
  ellipseMode(CORNER);
  strokeWeight(1);
  stroke(0,0,0);
  box = [0,0,0,0,0,0,0,0,0];
  
  coordinateX = [0,width/3,2*width/3,
                 0,width/3,2*width/3,
                 0,width/3,2*width/3];
  coordinateY = [0,0,0,
                 height/3,height/3,height/3,
                 2*height/3,2*height/3,2*height/3];
}

function draw() {
  background(255);
  image(img, 0, 0);
  // vertical
  line(width/3,0,width/3,height);
  line(2*width/3,0,2*width/3,height);
  
  // horizontal
  line(0,height/3,width,height/3);
  line(0,2*height/3,width,2*height/3);
 
  for(let i = 0 ; i < 49 ; i++){
    if(box[i] ==  1){
      noFill();
      ellipse(coordinateX[i],coordinateY[i],width/3,height/3);
    }
    else if(box[i] == 2){
      line(coordinateX[i],coordinateY[i],coordinateX[i] + width/3,coordinateY[i] + height/3);
      line(coordinateX[i] + width/3,coordinateY[i],coordinateX[i],coordinateY[i] + height/3);
    }
  }
  
  //Win
  // on row
  if(box[0] == box[1] && box[0] == box[2] && box[0] != 0){
    if(box[0] == 1){
      winner = "O";
    }
    else if(box[0] == 2){
      winner = "X";
    }
    else{
      winner = "Null";
    }
  }
  // left column
  if(box[0] == box[3] && box[0] == box[6] && box[0] != 0){
    if(box[0] == 1){
      winner = "O";
    } else if(box[0] == 2){
      winner = "X";
    } else{
      winner = "Null";
    }
  }
  // middle row
  if(box[3] == box[4] && box[3] == box[5] && box[3] != 0){
    if(box[3] == 1){
      winner = "O";
    } else if(box[3] == 2){
      winner = "X";
    } else{
      winner = "Null";
    }
  }
  // middle column
  if(box[1] == box[4] && box[1] == box[7] && box[1] != 0){
    if(box[1] == 1){
      winner = "O";
    } else if(box[1] == 2){
      winner = "X";
    } else{
      winner = "Null";
    }
  }
  // below row
  if(box[6] == box[7] && box[6] == box[8] && box[6] != 0){
    if(box[6] == 1){
      winner = "O";
    } else if(box[6] == 2){
      winner = "X";
    } else{
      winner = "Null";
    }
  }
  // right column
  if(box[2] == box[5] && box[2] == box[8] && box[2] != 0){
    if(box[2] == 1){
      winner = "O";
    } else if(box[2] == 2){
      winner = "X";
    } else{
      winner = "Null";
    }
  }
  // diagonal left
  if(box[0] == box[4] && box[0] == box[8] && box[0] != 0){
    if(box[0] == 1){
      winner = "O";
    } else if(box[0] == 2){
      winner = "X";
    } else{
      winner = "Null";
    }
  }
  // diagonal right
  if(box[2] == box[4] && box[2] == box[6] && box[2] != 0){
    if(box[2] == 1){
      winner = "O";
    } else if(box[2] == 2){
      winner = "X";
    } else{
      winner = "Null";
    }
  }
  // winner report
  if(winner == "O" || winner == "X"){
     console.log(winner + " is the winner"); 
     winner = "reset";
     image(gif_Trollface, 0, 0);
  }
}
function keyTyped() {
  if (key === 'r') {
     box = [0,0,0,0,0,0,0,0,0];
     gif_Trollface.reset();
  }
}
function mouseClicked(){
  if(player == 2){
    player = 0;
  } 
//----- player 1 -----//
  if(player == 1){
    if(mouseX < width/3 && mouseY < height/3){
      if(box[0] == 0){
        box[0] += 2;
        player += 1;
      } 
    }
    else if(mouseX < 2*width/3 && mouseY < height/3){
      if(box[1] == 0){
        box[1] += 2;
        player += 1;
      }
    }
    else if(mouseX < width && mouseY < height/3){
      if(box[2] == 0){
        box[2] += 2;
        player += 1;
      }
    }
    else if(mouseX < width/3 && mouseY < 2*height/3){
      if(box[3] == 0){
        box[3] += 2;
        player += 1;
      }
    }
    else if(mouseX < 2*width/3 && mouseY < 2*height/3){
      if(box[4] == 0){
        box[4] += 2;
        player += 1;
      }
    }
    else if(mouseX < width && mouseY < 2*height/3){
      if(box[5] == 0){
        box[5] += 2;
        player += 1;
      }
    }
    else if(mouseX < width/3 && mouseY < height){
      if(box[6] == 0){
        box[6] += 2;
        player += 1;
      }
    }
    else if(mouseX < 2*width/3 && mouseY < height){
      if(box[7] == 0){
        box[7] += 2;
        player += 1;
      }
    }
    else if(mouseX < width && mouseY < height){
      if(box[8] == 0){
        box[8] += 2;
        player += 1;
      }
    } 
}
//----- player 2 -----//
  else if(player == 0){
    if(mouseX < width/3 && mouseY < height/3){
      if(box[0] == 0){
        box[0] += 1;
        player += 1;
      }
    }
    else if(mouseX < 2*width/3 && mouseY < height/3){
      if(box[1] == 0){
        box[1] += 1;
        player += 1;
      }
    }
    else if(mouseX < width && mouseY < height/3){
      if(box[2] == 0){
        box[2] += 1;
        player += 1;
      }
    }  
    else if(mouseX < width/3 && mouseY < 2*height/3){
      if(box[3] == 0){
        box[3] += 1;
        player += 1;
      }
    }
    else if(mouseX < 2*width/3 && mouseY < 2*height/3){
      if(box[4] == 0){
        box[4] += 1;
        player += 1;
      }
    }
    else if(mouseX < width && mouseY < 2*height/3){
      if(box[5] == 0){
        box[5] += 1;
        player += 1;
      }
    }
    else if(mouseX < width/3 && mouseY < height){
      if(box[6] == 0){
        box[6] += 1;
        player += 1;
      }
    }
    else if(mouseX < 2*width/3 && mouseY < height){
      if(box[7] == 0){
        box[7] += 1;
        player += 1;
      }
    }
    else if(mouseX < width && mouseY < height){
      if(box[8] == 0){
        box[8] += 1;
        player += 1;
      }
    }
  }
}