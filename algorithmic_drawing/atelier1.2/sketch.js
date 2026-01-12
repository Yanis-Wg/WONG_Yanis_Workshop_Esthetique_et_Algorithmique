// Déclaration de variable

// Variable Bezier
let x1; let y1;
let x2; let y2;
let x3; let y3;
let x4; let y4;
let offset=0;

//Variable Point 
let initial_x_position=[]; let initial_y_position=[];
let x_incrementation=[]; let y_incrementation=[];
let point_number=1000;

// Variable compteur
let click_counter=0;

// Set up
function setup() {
    // Taille de la toile
    createCanvas(1250, 750);
    background("white");

    // Initialisation du tableau contenant les valeurs x et y des points
    for(let i=0;i<point_number;i++){
        initial_x_position[i] = random(0, width);
        initial_y_position[i] = random(0, height);
        // Initialisation de la vitesse de chaque point dans un tableau
        x_incrementation[i]=random(-5,5);
        y_incrementation[i]=random(-5,5);
    }
}

function draw() {
    // Définition des paramètres du Bézier
    x1 = noise(offset+22)*width;
    y1 = noise(offset+5)*width;
    x2 = noise(offset+958)*width;
    y2 = noise(offset+154)*height;
    x3 = noise(offset+2)*height;
    y3 = noise(offset+7)*height;
    x4 = noise(offset+333)*height;
    y4 = noise(offset+180)*height;
    offset +=0.01;
    noFill();
    strokeWeight(0.1);
    // Tracé du Bézier
    bezier(x1, y1, x2, y2, x3, y3,x4,y4);
    // Largeur de la bordure du point
    strokeWeight(0.37);
    // Création et positionnement des points à des endroits aléatoires de la Toile
    for(let i=0;i<point_number;i++){
        initial_x_position[i]+=x_incrementation[i];
        initial_y_position[i]+=y_incrementation[i];
        // Si le point dépasse la largeur ou la hauteur de la Toile, repositionnement à un endroit aléatoire sur la toile
        if(initial_x_position[i]>width){
            initial_x_position[i]-=random(1,-1)*width;
        }
        if(initial_y_position[i]>height){
            initial_y_position[i]-=random(1,-1)*height;
        }
        point(initial_x_position[i],initial_y_position[i]);
    }
    // Intéraction au clique, Dark Mode puis Light Mode entre chaque clique
    if(mouseIsPressed){
        if(click_counter%2==0)
        {
            background("black");
            stroke("white");
            // Repositionne les points
            for(let i=0;i<point_number;i++){
                initial_x_position[i]+=x_incrementation[i];
                initial_y_position[i]+=y_incrementation[i];
                if(initial_x_position[i]>width){
                    initial_x_position[i]-=random(1,-1)*width;
                }
                if(initial_y_position[i]>height){
                    initial_y_position[i]-=random(1,-1)*height;
                }
                point(initial_x_position[i],initial_y_position[i]);
            }
        }
        if(click_counter%2!=0)
        {
            background("white");
            stroke("black");
            // Repositionne les points
            for(let i=0;i<point_number;i++){
                initial_x_position[i]+=x_incrementation[i];
                initial_y_position[i]+=y_incrementation[i];
                if(initial_x_position[i]>width){
                    initial_x_position[i]-=random(1,-1)*width;
                }
                if(initial_y_position[i]>height){
                    initial_y_position[i]-=random(1,-1)*height;
                }
                point(initial_x_position[i],initial_y_position[i]);
            }
        }
        click_counter++;
    }
}
