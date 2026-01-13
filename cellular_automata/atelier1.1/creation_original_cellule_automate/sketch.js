// Taille de chaque cellule/rectangle du tableau
let cellSize = 10;
// Nombre de colonnes
let columnCount;
// Nombre de lignes
let rowCount;
// Tableau de valeur/rectangle
let currentCells = [];
let nextCells = [];

let randBorderRad;
let randCellSize;





function setup() {
  // Influe sur le rythme de l'évolution de la cellule automate
  frameRate(9);
  createCanvas(720, 720);

  // Calcul le nombre colonnes et de lignes du canva en fonction de la taille de cellule choisis.
  // Calcul la hauteur et la largeur du canva en taille de cellule
  columnCount = floor(width / cellSize);
  rowCount = floor(height / cellSize);

  // Ce premier remplissage vide permet d'afficher un tableau noir avant d'initialiser le tableau avec le clique de manière aléatoire
  // Remplissage des colonnes du tableau par des valeurs vides
  for (let column = 0; column < columnCount; column++) {
    currentCells[column] = [];
  }

  // Remplissage des colonnes du tableau par des valeurs vides
  for (let column = 0; column < columnCount; column++) {
    nextCells[column] = [];
  }

}


  // Lorsqu'on appui sur le canva le tableau fait appel à la fonction qui réinitialise de maniere aléatoire les valeurs du tableau entre 0 et 1
function mousePressed() {
    randomizeBoard();
    loop();
}

// Réinitialise de manière aléatoire les valeurs du tableau entre 0 et 1 
function randomizeBoard() {
  for (let column = 0; column < columnCount; column++) {
      for (let row = 0; row < rowCount; row++) {
        currentCells[column][row] = random([0,1]);
        // if(floor(random(0,rowCount-1)===7)){
        //   currentCells[column][random(0,rowCount-1)]='p';
        // }
      if(random(0,1)<0.0015){
          currentCells[column][row]='p';
      }
    }
  }
}

function generate() {
  // Loop through every spot in our 2D array and count living neighbors
  for (let column = 0; column < columnCount; column++) {
    for (let row = 0; row < rowCount; row++) {
      // Stocke la position de la colonne gauche de la position actuelle, si elle est à une bordure stocke la position de droite
      let left = (column - 1 + columnCount) % columnCount;

      // Stocke la position de la colonne droite de la position actuelle, si elle est à une bordure stocke la position de gauche
      let right = (column + 1) % columnCount;
      
      // Stocke la position de la ligne au dessus de la position actuelle, si elle est à une bordure stocke la position en bas de la position actuelle
      let above = (row - 1 + rowCount) % rowCount;
      
      // Stocke la position de la ligne en dessous de la position actuelle, si elle est à une bordure stocke la position au dessus de la position actuelle
      let below = (row + 1) % rowCount;
      
      // variable permettant de compter le nombre de cellule vivante autour de la position actuelle
      let neighbours =
      currentCells[left][above] +
      currentCells[column][above] +
      currentCells[right][above] +
      currentCells[left][row] +
      currentCells[right][row] +
      currentCells[left][below] +
      currentCells[column][below] +
      currentCells[right][below];
        
        // Règles d'évolution de la cellule automate    
        // TOUT LES CHANGEMENTS DE VALEURS SONT STOCKES DANS LE TABLEAU A DOUBLE ENTREE "nextCells"
      // 1. Toute les cellules ayant moins de deux cellules vivantes autour d'elles meurent
      // 2. Toute les cellules ayant plus de trois cellules vivantes autour d'elles meurent

      // SI LA CASE VAUT 1
      if(currentCells[column][row]===1){
        if(neighbours===0){
          nextCells[left][above]=1;
          nextCells[right][above]=1;
          nextCells[left][below]=1;
          nextCells[right][below]=1;
          nextCells[column][row] = currentCells[column][row];
        }
        if(neighbours===1){
          nextCells[column][below]=1;
          nextCells[right][above]=1;
          nextCells[column][row]=0;
        }
        if(neighbours===3){
          nextCells[column][row]=random([0,'p']);
          nextCells[column][above]=1;
          nextCells[right][row]=0;
          nextCells[left][row]=0;
          nextCells[column][row] = currentCells[column][row];
        }else if(neighbours>2 && neighbours!='p'){
          nextCells[left][above]=random([0,1]);
          nextCells[column][above]=random([0,1]);
          nextCells[left][row]=0;
          nextCells[right][row]=random([0,1]);
          nextCells[left][below]=0;
          nextCells[column][below]=0;
        }

      // SI LA CASE VAUT 0
      }else if(currentCells[column][row]===0){
        if(neighbours===0){
          nextCells[column][row]=1;
          nextCells[column][above]=1;
          nextCells[left][row]=1;
        }
        if(neighbours===1){
          nextCells[right][below]=1;
          nextCells[column][row]=1;
        }
        if(neighbours===2){
          nextCells[left][above]=1;
          nextCells[right][above]=1;
          nextCells[column][row] = currentCells[column][row];
        }else if(neighbours>2 && neighbours!='p'){
          nextCells[left][column]=1;
          nextCells[right][above]=0;
          nextCells[right][row]=0;
          nextCells[column][below]=0;
          nextCells[column][row] = currentCells[column][row];
        }

      // SI LA CASE VAUT 'p'
      }else if(currentCells[column][row]==='p'){
        if(neighbours<2){
          nextCells[column][row] = currentCells[column][row];
          nextCells[left][above]=random([0,1]);
          nextCells[column][above]=random([0,1]);
          nextCells[right][above]=random([0,1]);
          nextCells[left][row]=random([0,1]);
          nextCells[right][row]=random([0,1]);
          nextCells[left][below]=random([0,1]);
          nextCells[column][below]=random([0,1]);
          nextCells[right][below]=random([0,1]);
        }
          if(neighbours>4){
          nextCells[column][row] = currentCells[column][row];
          nextCells[left][above]=0;
          nextCells[column][above]=0;
          nextCells[right][above]=0;
          nextCells[left][row]=0;
          nextCells[right][row]=0;
          nextCells[left][below]=0;
          nextCells[column][below]=0;
          nextCells[right][below]=0;
        }
      }



      // if (neighbours < 2 && currentCells[column][row]!='p' || neighbours > 3 && currentCells[column][row]!='p') {
      //     nextCells[column][row] = 0;
      //     // 3. Toute les cellules ayant 3 voisins vivent
      //   } else if (neighbours === 3 && currentCells[column][row]!='p') {
      //       nextCells[column][row] = 1;
      //   // 4. Les cellules ayant deux à trois voisins vivant seront inchangés pour la prochaine génération
      // } else nextCells[column][row] = currentCells[column][row];
    }
}

  // Change le tableau avec les nouvelles valeurs pour la prochaine génération
  // On stock l'ancien tableau dans la variable temporaire temp
  let temp = currentCells;
  // On écrase les valeurs du tableau actuelle par celle du prochain tableau   
  currentCells = nextCells;
  // Et on stock les valeurs de l'ancien tableau dans nextCells pour éviter de recréer de nouveau tableau à chaque fois et pour repartir sur la meme base propre
  nextCells = temp;
}

function draw() {
  // Permet de générer les prochains tableau en fonction de condition prédéfini dans la fonction. Sans generate la grille n'évolue pas comme un automate cellulaire, elle reste fixe.
  generate();
  background(255);

  // On récupère la valeur de chaque case du tableau a double entrée, on la stock dans la variable cell et en fonction de sa valeur on créer un rectangle ayant la taille de cellule définis au début, et ayant pour position x et y la colonne * la taille et la ligne * la taille de cellule
  for (let column = 0; column < columnCount; column++) {
    for (let row = 0; row < rowCount; row++) {
      let cell = currentCells[column][row];
      // Ce calcul permet de remplir de noir ou de blanc le rectangle en fonction de la valeur de la case dans le tableau 
      // version 1 ----------------------------
      // fill((1 - cell) * 255);
      // noStroke();
      // randBorderRad=random(0,50);
      // rect(column * cellSize, row * cellSize, cellSize, cellSize,randBorderRad);
      // version 2 ----------------------------
      // blanc si mort
      if(cell===0){
        noStroke();
        fill("white");
        rect(column * cellSize, row * cellSize, cellSize, cellSize);
      }else 
        // bleu si vivant
        if(cell===1){
        noStroke();
        randCellSize=random(3, cellSize);
        // randBorderRad=random(0,randCellSize/2);
        if(randCellSize<=4){
          randBorderRad=5;
          fill(44,131,207);
        }else if(randCellSize<=7){
          randBorderRad=3;
          fill(119,177,228);
        } else if(randCellSize===8){
          fill(178,210,239);
          randBorderRad=2;
        }else{
          fill(219,233,246);
          randBorderRad=1;
        }
        let x = column * cellSize + (cellSize - randCellSize)/2;
        let y = row * cellSize + (cellSize - randCellSize)/2;
        rect(x, y, randCellSize, randCellSize, randBorderRad);
        // rect(column * cellSize, row * cellSize, randCellSize, randCellSize,randBorderRad);
      }
      // blanc bordure noir si autre
      else if(cell==='p'){
        fill(4,67,122);
        noStroke();
        rect(column * cellSize, row * cellSize, cellSize, cellSize);
      }else{
        fill(196,219,239)
        noStroke();
        rect(column * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }
}