let data;


function preload() {
  //data = loadTable(url, 'csv', 'header');
  data = loadTable('data/Grade-1.csv', 'csv', 'header');
  
  
}

function setup() {
    createCanvas(800, 800)
}

function draw() {
  background(255);
  noLoop()
  console.log(data)
  if(data){
  let numRow = data.getRowCount() 
 for(let d = 0; d < numRow; d ++){
      let name = data.getColumn('First name')
      let level = data.getColumn('class')
      let num = data.getColumn('number')
      let grade = data.getColumn('grade')
      let w = map(num[d],0,100,10,80) //miles by itself was small, so * to get a bigger #
      let h = 10;
      let c = map(grade[d],0,4,0,500)
      let l = map(level[d],1,4,255,20)
      fill(l)
      const x = c
      const y = 10+d*68
      ellipse(x,y,w,w);
      fill(0)
      text(name[d],x,y+w/2+15)
      line(0,y,x,y)
  }
 }
}
