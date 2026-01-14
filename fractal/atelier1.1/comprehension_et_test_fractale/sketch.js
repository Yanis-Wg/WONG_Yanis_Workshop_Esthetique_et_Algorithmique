// FRACTALE GENERER PAR CHATGPT :
// function setup() {
//   createCanvas(600, 600);
//   angleMode(DEGREES);
//   background(0);
//   stroke(255);
  
//   translate(width / 2, height);
//   branch(120);
// }

// function branch(len) {
//   line(0, 0, 0, -len);
//   translate(0, -len);

//   if (len > 10) {
//     push();
//     rotate(25);
//     branch(len * 0.67);
//     pop();

//     push();
//     rotate(-25);
//     branch(len * 0.67);
//     pop();
//   }
// }
// Etude et compréhension de la fractale + test
let theta=0;
function setup() {
  // Parametre la taille du canva, unité des angles = degré
  createCanvas(800, 750);
  angleMode(DEGREES);
}

function draw(){
  // Détecte la position x de la souris et change de valeur
  theta=map(mouseX,0,width, 0, 90);
  // Background noir
  background(0);
  // Bordure blanche
  stroke(255);
  // Place la branche au milieu du canva et tout en bas
  translate(width / 2, height);
  // Appel la fonction qui dessine la fractale et lui donne comme argument une valeur qui sert de taille de départ 
  branch(220);
}

function branch(len) {
  // Trace la ligne de la longueur de l'argument (comme translate positionne l'appelle de la fonction pas besoin de mettre de taille)
  // c'est - len car len = bas du canva et nous on souhaite remonté dans le canva
  line(0, 0, 0, -len);
  // Ensuite on ne bouge pas sur l'axe x mais on se positionne au bout de la ligne tracé
  translate(0, -len);
  // Tant que la valeur de l'argument est supérieur à 1 on répète les instructions
  if (len > 1) {
    // push sauvegarde la position et l'angle de rotation de la ligne initial
    push();
    // on tourne de theta degré
    rotate(theta);
    // et on fait la récursivité pour tracé la ligne sauf que cette fois la valeur de l'argument est égale à 67% de sa valeur initial. On se replace donc au bout de la ligne et on répéte l'opération tant que la valeur de l'argument >10
    branch(len * 0.67);
    // Une fois que len<=1 on repart à la position initial sauvegarder dans push, ce qui nous fait au final retourner au bout du premier trait grâce à pop
    pop();
    // repositionne a partir des données de push
    push();
    // On effectue la rotation dans le sens opposé (à gauche)
    rotate(-theta);
    // Meme principe répéter
    branch(len * 0.67);
    pop();
  }
}
