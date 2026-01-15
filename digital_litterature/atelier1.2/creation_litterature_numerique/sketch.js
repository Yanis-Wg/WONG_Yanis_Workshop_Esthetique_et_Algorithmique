// Taille de chaque cellule/rectangle du tableau
let cellSize = 20;
// Nombre de colonnes
let columnCount;
// Nombre de lignes
let rowCount;
// Tableau de valeur/rectangle
let currentCells = [];
let nextCells = [];
let tab_with_letter=[];
// Valeur aléatoire pour le border radius et la taille de chaque cellule
let randBorderRad;
let randCellSize;

let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let long_sentence_tab=[];
let short_sentence_tab=[];
let start=true;

function setup() {
  // Influe sur le rythme de l'évolution de la cellule automate
  frameRate(9);
  createCanvas(800, 750);
  background(0);
  // Parametrage affichage du texte
  fill(255);
  textSize(cellSize);
  // nombre de col en fonction de la taille de la cellule
  columnCount = floor(width / cellSize);
  // nombre de ligne en fonction de la taille de la cellule
  rowCount = floor(height / cellSize);
  // Remplissage des colonnes du tableau 1 par des valeurs vides
  for (let column = 0; column < columnCount; column++) {
    currentCells[column] = [];
  }
  // Remplissage des colonnes du tableau 2 par des valeurs vides
  for (let column = 0; column < columnCount; column++) {
    nextCells[column] = [];
  }
  randomizeBoard();
}

function keyPressed(){
  if(key ===' '){
    start=!start;
  }
}

function draw() {
  // Pause ou Play
  if(!start){
    return;
  }
  // Background
  background(0);
  // Affichage du tableau 
  
  let wordIndex=0;
  for (let row = 0; row < rowCount; row++) {
    for (let column = 0; column < columnCount; column++) {
      let cell = currentCells[column][row];
      if(cell===0){
        fill("green");
        textAlign(CENTER, CENTER);
        text(alphabet[floor(random(26))],column * cellSize + cellSize/2, row * cellSize + cellSize/2);
        // Copie des valeurs dans un tableau uniquement remplis de lettre
        tab_with_letter=[column][row]=alphabet[floor(random(26))];
      }else if(cell===1&& wordIndex < number_of_word){
        fill("white");
        textAlign(CENTER, CENTER);
        if(number_of_word===5){
          // Pour que chaque lettre soit séparé du mot.
          let wordLetters = short_sentence_tab[wordIndex].split('');
          let startCol = column; // colonne où se trouve le 1
          
        for (let l = 0; l < wordLetters.length; l++) {
          // On remplace là où on est sensé avoir des 1 par 0
          tab_with_letter=[l][row]=0;
          if (startCol + l < columnCount) { // pour ne pas sortir de la grille
            fill(0, 255, 0); // couleur lettre
            text(wordLetters[l],
                (startCol + l) * cellSize + cellSize/2,
                row * cellSize + cellSize/2);
          }else if(startCol + l >= columnCount){
            startCol=random([0,columnCount-1]);
            l--;
          }
        }
        }else if(number_of_word===6){
          let wordLetters = long_sentence_tab[wordIndex].split('');
          text(long_sentence_tab[wordIndex], column * cellSize + cellSize/2, row * cellSize + cellSize/2);
        }
        wordIndex++;
      }
    }
  }
}

let premier = ['Salut','Bonjour','Salutation','Hey','Yo','Eh'];
let deuxieme = ['patron', 'Alina', 'papi', 'tonton','mademoiselle','Raphael','Agathe','Julien','Marine'];
let adjectifs = ['mochement','magnifikement','vraiment','salement','honnetement'];
let noms = ['petit(e)','chauve','magnifike','crazy','intelligente','glacant(e)'];

function maybe(words){
    if (random([false, true])){
      return ' ' + random(words);
    }
    return '';
  }

function longer(){
  return (
    + random(adjectifs)
    + ' '
    + random(noms)
  );
}

function  shorter(){
  return ' ' + random(noms) + '.';
}

function letter() {
  let txt = random(premier) + ' ' + random(deuxieme) + ' tu es ' + body() + '\n' + 'Yours ' + random(adverbs) + '\n' + 'M.U.C.';
  return txt;
}

// AUTOMATE CELLULAIRE -----------------------------------------------------

// Lorsqu'on appui sur le canva le tableau fait appel à la fonction qui réinitialise de maniere aléatoire les valeurs du tableau entre 0 et 1
function mousePressed() {
    randomizeBoard();
    loop();
}

let number_of_word=0;
// Réinitialise de manière aléatoire les valeurs du tableau entre 0 et 1 
function randomizeBoard() {
  long_sentence_tab=[random(premier),random(deuxieme),'tu','es',random(adjectifs),random(noms)];
  short_sentence_tab=[random(premier),random(deuxieme),'tu','es',random(noms)];
  for (let column = 0; column < columnCount; column++) {
    for (let row = 0; row < rowCount; row++) {
      currentCells[column][row] = 0;
    }
  }
  let long_or_short=random([0,1]);
  if(long_or_short===0){
    number_of_word=5;
  }else if(long_or_short===1){
    number_of_word=6;
  }
  let onesPlaced = 0;
  while (onesPlaced < number_of_word) {
    let col = floor(random(columnCount));
    let row = floor(random(rowCount));
    if (currentCells[col][row] === 0) {
      currentCells[col][row] = 1;
      onesPlaced++;
    }
  }
}



function generate() {
  let next_tab_one_counter=0;
  // Boucle pour parcourir le tableau en ligne et colonne
  for (let column = 0; column < columnCount; column++) {
    for (let row = 0; row < rowCount; row++) {
        if(currentCells[column][row]===0 || currentCells[column][row]===1 && next_tab_one_counter===0){
          nextCells[column][row]=random([0,1])
          if(nextCells[column][row]===1){
            one_counter++;
          }
        }else if(currentCells[column][row]===0 || currentCells[column][row]===1 && next_tab_one_counter>0){
          nextCells[column][row]=0;
      }
    }
    one_counter=0;
  }
  // Change le tableau avec les nouvelles valeurs pour la prochaine génération
  // On stock l'ancien tableau dans la variable temporaire temp
  let temp = currentCells;
  // On écrase les valeurs du tableau actuelle par celle du prochain tableau   
  currentCells = nextCells;
  // Et on stock les valeurs de l'ancien tableau dans nextCells pour éviter de recréer de nouveau tableau à chaque fois et pour repartir sur la meme base propre
  nextCells = temp;
}

