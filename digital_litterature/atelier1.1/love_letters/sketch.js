function setup() {
  createCanvas(800, 500);
  background(0);
  // Parametrage affichage du texte
  textSize(16);
  fill(255);
  frameRate(0.2); // 0.2 frames par seconde = une lettre toutes les 5 secondes
}

function draw() {
  background(0); // efface l’écran avant chaque lettre
  let txt = letter();
  // textAlign(CENTER, CENTER);

  text(txt,20, height/3, 700, 400); // 700 px largeur pour retour à la ligne automatique
}

let first = ['Darling', 'Dear', 'Honey', 'Jewel'];
let second = ['duck', 'love', 'moppet', 'sweetheart'];
let adjectives = [
    'adorable',
    'affectionate',
    'amorous',
    'anxious',
    'ardent',
    'avid',
    'breathless',
    'burning',
    'covetous',
    'craving',
    'curious',
    'darling',
    'dear',
    'devoted',
    'eager',
    'erotic',
    'fervent',
    'fond',
    'impatient',
    'keen',
    'little',
    'loveable',
    'lovesick',
    'loving',
    'passionate',
    'precious',
    'sweet',
    'sympathetic',
    'tender',
    'unsatisfied',
    'wistful',
];

let nouns = [
    'adoration',
    'affection',
    'ambition',
    'appetite',
    'ardour',
    'charm',
    'desire',
    'devotion',
    'eagerness',
    'enchantment',
    'enthusiasm',
    'fancy',
    'fellow feeling',
    'fervour',
    'fondness',
    'heart',
    'hunger',
    'infatuation',
    'liking',
    'longing',
    'love',
    'lust',
    'passion',
    'rapture',
    'sympathy',
    'tenderness',
    'thirst',
    'wish',
    'yearning',
];

let adverbs = [
    'affectionately',
    'anxiously',
    'ardently',
    'avidly',
    'beautifully',
    'breathlessly',
    'burningly',
    'covetously',
    'curiously',
    'devotedly',
    'eagerly',
    'fervently',
    'fondly',
    'impatiently',
    'keenly',
    'lovingly',
    'passionately',
    'seductively',
    'tenderly',
    'winningly',
    'wistfully',
];

let verbs = [
    'adores',
    'attracts',
    'cares for',
    'cherishes',
    'clings to',
    'desires',
    'holds dear',
    'hopes for',
    'hungers for',
    'is wedded to',
    'likes',
    'longs for',
    'loves',
    'lusts after',
    'pants for',
    'pines for',
    'prizes',
    'sighs for',
    'tempts',
    'thirsts for',
    'treasures',
    'wants',
    'wishes',
    'woos',
    'yearns for',
];

function maybe(words){
    if (random([false, true])){
        return ' ' + random(words);
    }
    return '';
  }

function longer(){
  return (
    ' My'
    + maybe(adjectives)
    + ' '
    + random(nouns)
    + maybe(adverbs)
    + ' '
    + random(verbs)
    + ' your'
    + maybe(adjectives)
    + ' '
    + random(nouns)
    + '.'
  );
}


function  shorter(){
  return ' ' + random(adjectives) + ' ' + random(nouns) + '.';
}


function body(){
  let text = '';
  let you_are = false;
  for (let i =0;i<=5;i++){
    let type = random(['longer', 'shorter']);
    if (type === 'longer'){
        text = text + longer();
        you_are = false;
    }else if(you_are){
      text = text.slice(0,-1) + ': my' + shorter();
      you_are = false;
    }else{
      text = text + ' You are my' + shorter();
      you_are = true;
    }
  }
  return text;
}

function letter() {
  let txt = random(first) + ' ' + random(second) + '\n' + body() + '\n' + 'Yours ' + random(adverbs) + '\n' + 'M.U.C.';
  return txt;
}
