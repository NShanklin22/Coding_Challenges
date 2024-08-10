class DNA {
    constructor(lifespan, genes){
        if(genes){
            this.genes = genes;
        }else{
            this.genes = [];
            this.lifespan = lifespan;
            for(let i = 0; i < this.lifespan; i++){
                let forceAngle = 0;
                if(i == 0){
                    forceAngle = random(PI, 2*PI)
                    this.genes[i] = p5.Vector.fromAngle(forceAngle);
                    this.genes[i].setMag(3);
                }else{
                    forceAngle = random(this.genes[i-1].heading()/2,this.genes[i-1].heading()*2);
                    this.genes[i] = p5.Vector.fromAngle(forceAngle);
                    this.genes[i].setMag(0.5);
                }
            }
        }
    }

    crossover(partner){
        let newgenes = [];
        let mid = floor(random(this.genes.length));
        for(let i = 0; i < this.genes.length; i++){
            if(i > mid){
                newgenes[i] = this.genes[i];
            } else {
                newgenes[i] = partner.genes[i];
            }
        }
        return new DNA(this.lifespan, newgenes);
    }

    mutation(){
        let forceAngle;
        for(let i = 0; i < this.genes.length; i++){
            if(random(1) < 0.02){
                if(i == 0){
                    forceAngle = random(PI, 2*PI)
                    this.genes[i] = p5.Vector.fromAngle(forceAngle);
                    this.genes[i].setMag(1);
                }else{
                    forceAngle = random(this.genes[i-1].heading()/2,this.genes[i-1].heading()*2);
                    this.genes[i] = p5.Vector.fromAngle(forceAngle);
                    this.genes[i].setMag(.5);
                }
            }
        }
    }
}