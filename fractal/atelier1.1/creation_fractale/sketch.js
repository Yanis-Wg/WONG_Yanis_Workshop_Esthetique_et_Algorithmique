let theta=2;
function setup() {
  // Parametre la taille du canva, unité des angles = degré
  createCanvas(750, 750);
  frameRate(85);
  angleMode(DEGREES);
}
let clique=2;
let play=true;

function keyPressed(){
  if(key=== ' '){
    play=!play;
  }
}
function draw(){
  if(!play){
    return;
  }
  theta=map(mouseX,0,width, 0, 90)

  if(mouseIsPressed){
    clique++;
  }
  if(clique%2===0){
    // Bande blanche
    stroke(255);
    // Background noir
    background(0);
  }else if(clique%2!=0){
    let r=random(0,255);
    let v=random(0,255);
    let b=random(0,255);
    // Bande aléatoire
    stroke(r,v,b);
    // Background 
    background(255);
  }
  // Enregistre la position
  push();
  // Place la branche au milieu du canva 
  translate(width / 2, 90+height);
  // Appel la fonction qui dessine la fractale et lui donne comme argument une valeur qui sert de taille de départ 
  branch_middle_bottom(115);
  branch_middle_bottom(115);
  branch_middle_bottom(115);
  branch_middle_bottom(115);
  branch_middle_bottom(115);
  branch_middle_bottom(115);
  branch_middle_bottom(115);
  branch_middle_bottom(115);
  branch_middle_bottom(115);
  branch_middle_bottom(115);
  branch_middle_bottom(115);
  branch_middle_bottom(115);
  // Rétablis la position enregistrer dans push
  pop();
  // Enregistre la position
  push();
  translate(50, 90+height);
  // Appel la fonction qui dessine la fractale et lui donne comme argument une valeur qui sert de taille de départ 
  branch_middle_left(115);
  branch_middle_left(115);
  branch_middle_left(115);
  branch_middle_left(115);
  branch_middle_left(115);
  branch_middle_left(115);
  branch_middle_left(115);
  branch_middle_left(115);
  branch_middle_left(115);
  // Rétablis la position enregistrer dans push
  pop();
  // Enregistre la position
  push();
  translate(width-50, 90+height);
  // Appel la fonction qui dessine la fractale et lui donne comme argument une valeur qui sert de taille de départ 
  branch_middle_right(115);
  branch_middle_right(115);
  branch_middle_right(115);
  branch_middle_right(115);
  branch_middle_right(115);
  branch_middle_right(115);
  branch_middle_right(115);
  branch_middle_right(115);
  branch_middle_right(115);
  // Rétablis la position enregistrer dans push
  pop();
  // Enregistre la position
  push();
  translate(width-213, 90+height);
  // Appel la fonction qui dessine la fractale et lui donne comme argument une valeur qui sert de taille de départ 
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  // Rétablis la position enregistrer dans push
  pop();
  // Enregistre la position
  push();
  translate(213, 90+height);
  // Appel la fonction qui dessine la fractale et lui donne comme argument une valeur qui sert de taille de départ 
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  branch_middle_inverted(55);
  // Rétablis la position enregistrer dans push
  pop();
}

function branch_middle_bottom(len) {
  // Trace la ligne de la longueur de l'argument (comme translate positionne l'appelle de la fonction pas besoin de mettre de taille)
  // c'est - len car len = bas du canva et nous on souhaite remonté dans le canva
  // Ensuite on ne bouge pas sur l'axe x mais on se positionne au bout de la ligne tracé
  line(0, 0, 0, -len);
  translate(0, -len);   
  // Tant que la valeur de l'argument est supérieur à 5 on répète les instructions
  if (len > 5) {
    // push sauvegarde la position et l'angle de rotation de la ligne initial
    push();
    // on tourne de 55 degré * theta
    rotate(55*theta);
    // et on fait la récursivité pour tracé la ligne sauf que cette fois la valeur de l'argument est égale à 67% de sa valeur initial. On se replace donc au bout de la ligne et on répéte l'opération tant que la valeur de l'argument >55 * theta
    branch_middle_bottom(len * 0.67);
    // Une fois que len<=  5 on repart à la position initial sauvegarder dans push, ce qui nous fait au final retourner au bout du premier trait grâce à pop
    pop();
    // On sauvegarde cette position 
    push();
    // On effectue la rotation dans le sens opposé (à gauche)
    rotate(-55*theta);
    // Meme principe répéter
    branch_middle_bottom(len * 0.67);
    pop(); 
  }
}


function branch_middle_left(len) {
  line(0, 0, 0, -len);
  translate(0, -len);   
  if (len > 5) {
    push();
    rotate(65*theta);
    branch_middle_left(len * 0.67);
    pop();
    push();
    rotate(-65*theta);
    branch_middle_left(len * 0.67);
    pop(); 
  }
}


function branch_middle_right(len) {
  line(0, 0, 0, -len);
  translate(0, -len);   
  if (len > 5) {
    push();
    rotate(65*theta);
    branch_middle_right(len * 0.67);
    pop();
    push();
    rotate(-65*theta);
    branch_middle_right(len * 0.67);
    pop(); 
  }
}


function branch_middle_inverted(len) {
  line(0, 0, 0, -len);
  translate(0, -len);   
  if (len > 1) {
    push();
    rotate(65*theta);
    branch_middle_inverted(len * 0.57);
    pop();
    push();
    rotate(-65*theta);
    branch_middle_inverted(len * 0.57);
    pop(); 
  }
}