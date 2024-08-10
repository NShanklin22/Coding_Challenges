class Swarm {
    constructor(lifespan) {
        this.rockets = [];
        this.matingpool = [];
        this.lifespan = lifespan;
        this.popsize = 100;
        this.count = 0;
        this.strikes = 0;
        this.maxfit = 0;
        for (let i = 0; i < this.popsize; i++) {
            this.rockets[i] = new Rocket(this.lifespan);
        }
    }

    selection () {
        let newRockets = [];
        for (let i = 0; i < this.rockets.length; i++) {
            let parentA = random(this.matingpool).dna;
            let parentB = random(this.matingpool).dna;
            let child = parentA.crossover(parentB);
            child.mutation();
            newRockets[i] = new Rocket(this.lifespan, child);
        }
        this.rockets = newRockets;
        this.count = 0;
    }

    update(target, obstacle) {
        this.maxfit = 0;
        for (let i = 0; i < this.popsize; i++) {
            this.rockets[i].update();
            this.rockets[i].show();
            this.rockets[i].calcFitness(target, obstacle);
            if (this.rockets[i].fitness > this.maxfit) {
                this.maxfit = this.rockets[i].fitness;
            }
        }
        for (let i = 0; i < this.popsize; i++) {
            this.rockets[i].fitness /= this.maxfit;
        }

        this.matingpool = [];
        for (let i = 0; i < this.popsize; i++) {
            let n = this.rockets[i].fitness * 100;
            for (let j = 0; j < n; j++) {
                this.matingpool.push(this.rockets[i]);
            }
        }

        this.count++;
    }
}