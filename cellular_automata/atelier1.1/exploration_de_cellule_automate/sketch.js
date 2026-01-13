// Taille de chaque cellule/rectangle du tableau
let cellSize = 10;
// Nombre de colonnes
let columnCount;
// Nombre de lignes
let rowCount;
// Tableau de valeur/rectangle
let currentCells = [];
let nextCells = [];

function setup() {
  // Influe sur le rythme de l'évolution de la cellule automate
  frameRate(10);
  createCanvas(720, 400);

  // Calcul le nombre colonnes et de lignes du canva en fonction de la taille de cellule choisis.
  // Calcul la hauteur et la largeur du canva en taille de cellule
  // floor permet d'arrondir la valeur
  columnCount = floor(width / cellSize);
  rowCount = floor(height / cellSize);

  // Ce premier remplissage vide permet d'afficher un tableau noir avant d'initialiser le tableau avec le clique de manière aléatoire
  // Remplissage des colonnes du tableau 1 par des valeurs vides
  for (let column = 0; column < columnCount; column++) {
    currentCells[column] = [];
  }

  // Remplissage des colonnes du tableau 2 par des valeurs vides
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
      currentCells[column][row] = random([0, 1]);
    }
  }
}

function generate() {
  // Boucle pour parcourir le tableau en ligne et colonne
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
      if (neighbours < 2 || neighbours > 3) {
          nextCells[column][row] = 0;
          // 3. Toute les cellules ayant 3 voisins vivent
        } else if (neighbours === 3) {
            nextCells[column][row] = 1;
        // 4. Les cellules ayant deux à trois voisins vivant seront inchangés pour la prochaine génération
      } else nextCells[column][row] = currentCells[column][row];
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
  // On récupère la valeur de chaque case du tableau a double entrée, on la stock dans la variable cell et en fonction de sa valeur on créer un rectangle ayant la taille de cellule définis au début, et ayant pour position x et y la colonne * la taille et la ligne * la taille de cellule
  for (let column = 0; column < columnCount; column++) {
    for (let row = 0; row < rowCount; row++) {
      let cell = currentCells[column][row];
      // Ce calcul permet de remplir de noir ou de blanc le rectangle en fonction de la valeur de la case dans le tableau 
      fill((1 - cell) * 255);
      stroke(0);
      rect(column * cellSize, row * cellSize, cellSize, cellSize);
    }
  }
}