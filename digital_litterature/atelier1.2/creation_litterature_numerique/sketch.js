// Taille de chaque cellule/rectangle du tableau
let cellSize = 8;
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
let wordLetters=0;
let startCol=0;

function setup() {
  // Influe sur le rythme de l'évolution de la cellule automate
  frameRate(39);
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
  for (let column = 0; column < columnCount; column++) {
    tab_with_letter[column] = [];
  }
  randomizeBoard();
}

function keyPressed(){
  if(key ===' '){
    start=!start;
  }
}

function draw() {
  let wordIndex=0;
  // Pause ou Play
  if(!start){
    return;
  }
  // Background
  background(0);

  // nettoyage et initialisation du tableau de lettre
  for(let row=0;row<rowCount;row++){
    for(let column = 0;column<columnCount;column++){
      tab_with_letter[column][row]='0';
    }
  }
  
  for (let row = 0; row < rowCount; row++) {
    for (let column = 0; column < columnCount; column++) {
      let cell = currentCells[column][row];
      if(cell===1&& wordIndex < number_of_word){
        if(number_of_word===5){
          // Pour que chaque lettre soit séparé du mot.
          wordLetters = short_sentence_tab[wordIndex].split('');
        }else{
          wordLetters = long_sentence_tab[wordIndex].split('');
        }

        startCol = column; // colonne où se trouve le 1

        for (let l = 0; l < wordLetters.length; l++) {
          // On remplace par les lettres de chaque mot là ou on a des 1 
          tab_with_letter[startCol+l][row]=wordLetters[l];
        }
        wordIndex++;
      }
    }
  }
  for (let row = 0; row < rowCount; row++) {
    for (let column = 0; column < columnCount; column++) {
      let case_value = tab_with_letter[column][row];
      textAlign(CENTER, CENTER);
      // Si la valeur dans le tableau n'est pas le caractere 0 alors affiche la lettre de couleur verte
      if(case_value==='0'){
        fill("green");
        text(alphabet[floor(random(26))],column * cellSize + cellSize/2, row * cellSize + cellSize/2);
        // Si la valeur dans le tableay est le caratere 0 alors compte le nombre de 0, si 5 prend "short_sentence_tab" sinon prend "long_sentence_tab"
      }else{
        textStyle(BOLD)
        fill("white");
        text(case_value,column * cellSize + cellSize/2, row * cellSize + cellSize/2);
        textStyle(NORMAL);
      }
    }
  }
}

let premier = ['Salut','Bonjour','Salutation','Hey','Yo','Eh'];
let deuxieme = ['patron', 'Alina', 'papi', 'tonton','Patrick','Raphael','Agathe','Julien','Marine'];
let adjectifs = ['mochement','magnifiquement','vraiment','salement','honnetement'];
let noms = ['petit(e)','chauve','magnifique','crazy','intelligente','glacant(e)'];

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
  // choisir si phrase longue ou courte
  let long_or_short=random([0,1]);
  if(long_or_short===0){
    number_of_word=5;
  }else if(long_or_short===1){
    number_of_word=6;
  }
  // le nombre de 1 place
  let onesPlaced = 0;
  while (onesPlaced < number_of_word) {
    let col = floor(random(15,columnCount-15));
    let row = floor(random(15,rowCount-15));
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

