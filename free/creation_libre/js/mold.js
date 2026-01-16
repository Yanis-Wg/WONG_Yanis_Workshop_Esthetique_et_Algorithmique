class Mold{
    constructor(){
        // Position du mold
        this.x = random(width);
        this.y = random(height);
        // Radius et Taille du point
        this.r = 0.5;
        // L'angle ou mold se déplacera
        // Coordonnées polaire
        this.heading = random(360);
        // Conversion en coordonnées cartésiennes
        this.vx = cos(this.heading);
        this.vy = sin(this.heading);

        this.rotAngle = 25;
        // Sensor
        this.rSensorPos = createVector(0,0);
        this.lSensorPos = createVector(0,0);
        this.fSensorPos = createVector(0,0);
        this.sensorAngle = 45;
        // gere comment et combien de cercle apparaitront
        this.sensorDist = 15 ;
    }
    // Fonction qui permet de convertir de coordonnées polaires à cartésiennes
    update(){
        this.vx=cos(this.heading);
        this.vy=sin(this.heading);

        this.x=(this.x+this.vx+width)%width;
        this.y=(this.y+this.vy+height)%height;
         
        // left sensor
        this.getSensorPos(this.rSensorPos,this.heading+this.sensorAngle);
        // right sensor
        this.getSensorPos(this.lSensorPos,this.heading-this.sensorAngle);
        // front sensor
        this.getSensorPos(this.fSensorPos,this.heading);

        let index,l,r,f;
        
        // équation permettant de calculer la position de l'index d'un élement choisis
        index=4*(d*floor(this.rSensorPos.y))*(d*width)+4*(d*floor(this.rSensorPos.x));
        r=pixels[index];

        index=4*(d*floor(this.lSensorPos.y))*(d*width)+4*(d*floor(this.lSensorPos.x));
        l=pixels[index];  

        index=4*(d*floor(this.fSensorPos.y))*(d*width)+4*(d*floor(this.fSensorPos.x));
        f=pixels[index];

        // Quel direction prendre en fonction des sensor
        // Si on détecte un pixel plus loin du front que la gauche et droite alors on incrémente pas 
        if(f>l && f>r){
            this.heading+=0;
            // Par contre, si le pixel est plus proche du front que de la droite et de la gauche alors on a une chance sur deux d'incrémente par l'angle de rotation
        }else if(f<l&&f<r){
            if(random(1)<0.5){
                this.heading+=this.rotAngle;
            }
            // Et s'il est plus loin à gauche qu'a droite alors on tourne en sens inverse
        }else if(l>r){
            this.heading+= -this.rotAngle;
            // Et s'il est plus loin à droite alors on incrémente
        }else if(r>l){
            this.heading += this.rotAngle;
        }
    }
    display(){
        noStroke();
        let r = random([0,255]);
        let v = random([0,255]);
        let b = random([0,255]);
        fill(255,5,255);
        // ellipse(x,y,width,height)
        ellipse(this.x, this.y,  this.r*2, this.r*2);
        // Permet de visualiser vers ou est orienté le mold
        // line(this.x,this.y, this.x + this.r*3*this.vx, this.y + this.r*3*this.vy);
        // fill(255,0,0);
        // ellipse(this.rSensorPos.x,this.rSensorPos.y, this.r*2,this.r*2);
        // ellipse(this.lSensorPos.x,this.lSensorPos.y, this.r*2,this.r*2);
        // ellipse(this.fSensorPos.x,this.fSensorPos.y, this.r*2,this.r*2);    
    }
    getSensorPos(sensor,angle){
        // Les modules permettent d'éviter de sortir du canva
        // right sensor
        sensor.x=(this.x+this.sensorDist*cos(angle)+width)%width;
        sensor.y=(this.y+this.sensorDist*sin(angle)+height)%height;
    }
}

