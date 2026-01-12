function setup() {
    // Format de la Toile
    createCanvas(640, 400);
    // changement du taux d'image par seconde de 60 à 1
    frameRate(1);
}

function draw() {
    // déclarations des variables
    let border_size = 10;
    let x_rect = 100;
    let y_rect = 110;
    let width_rect = 300;
    let height_rect = 15;
    // génération aléatoire des couleurs
    let r = random(0, 255);
    let v = random(0, 255);
    let b = random(0, 255);
    // définition de la couleur du background
    background(r,v,b);
    // premier rect noir
    r = random(0, 255);
    v = random(0, 255);
    b = random(0, 255);
    // création des rectangles initiaux (remplis)
    fill(r,v,b);
    noStroke();
    rect(103,104,295,25,8);
    fill(r,v,b);
    noStroke();
    rect(90,97,295,25,8);
    // boucle pour générer les rectangles non remplis avec bordure
    for(i=0;i<16;i++){
        // couleur generer aléatoirement à chaque incrémentation de i
        r = random(0, 255);
        v = random(0, 255);
        b = random(0, 255);
        // décrémentation de la valeur de x et y pour changer les positions à chaque incrémentation
        x_rect-=7;
        y_rect-=10;
        // augmentation de la largeur et de la hauteur de chaque rectangle
        width_rect+=25;
        height_rect+=27;
        // décrémentation de la taille des bordures à partir de i>=2
        if(i>=2){
            border_size-=0.5;
        }
        // bordure & remplissage des rectangles
        noFill();
        stroke(r, v, b);
        // stroke(border_color); - pour reproduire la figure initial
        strokeWeight(border_size);
        rect(x_rect,y_rect,width_rect,height_rect);
    }
}
