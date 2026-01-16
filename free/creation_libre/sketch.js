// Déclaration de Variable
let eraseOrNot_canva=false;
let pauseOrPlay=false;
let mic;
// Mold
let molds=[];
let num=1; 
let d;
let tempsDerniereAction=0;
let delai=12000;
function setup(){
  createCanvas(windowWidth-20, windowHeight-20);
  angleMode(DEGREES);
  d=pixelDensity();
  // Creation des objets m de type Mold
  for(let i=0;i<num;i++){
    molds[i]=new Mold();
  }
  // AudioIn traite le son entrant dans le micro
  // new permet de créer un objet
  mic = new p5.AudioIn();
  mic.start();
}
function draw(){
// Captation du son du micro avec AudioIn, start pour commencer à capter le son et getLevel pour le niveau du son de 0 à 1
  let vol=mic.getLevel();
  if(pauseOrPlay===true){
    return;
  }
  if(vol>0.005)
  {
    if(num<8000){
      num=num*3;
      for(let i=0;i<num;i++){
        molds[i]=new Mold();
      }
    }
  }else if (millis() - tempsDerniereAction > delai) {
      num=num/7;
      if(num>7){
        for(let i=0;i<num;i++){
          molds[i]=new Mold();
        }
      }
      tempsDerniereAction = millis();
  }


  // Mold
  background(0,5);
  loadPixels();
  for(let i=0;i<num;i++){
    molds[i].update();
    molds[i].display();
  }
}

function mouseClicked(){
  userStartAudio();
}

function keyPressed(){
  pauseOrPlay=!pauseOrPlay;
}