class Rocket {
  constructor(lifespan, dna) {
    this.position = createVector(width/2, height-100);
    this.acceleration = createVector();
    this.velocity = createVector();
    this.angle = 0;
    this.count = 0;
    this.exploded = false;
    this.lost = false;
    this.flightTime = 0;

    if(dna){
      this.dna = dna;
    }else{
      this.dna = new DNA(lifespan);
    }
  }

  run() {
    this.update();
    this.show();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  calcFitness(target) {
    let d = dist(this.position.x, this.position.y, target.x, target.y);
    this.fitness = map(d, 0, 1000, 10000, 0);
    if(this.exploded){
      this.fitness *= 100 / this.flightTime*1000;
    }
    if(this.lost){
      this.fitness /= 100;
    }
  }

  // Method to update position
  update() {
    let d = dist(this.position.x, this.position.y, target.x, target.y);
    if(d < 25){
      this.exploded = true;
    }

    if(this.position.x > width || this.position.x < 0 || this.position.y > height){
      this.lost = true;
    }

    if(this.position.x > obstacle.x - 200 && this.position.x < obstacle.x + 200 && this.position.y > obstacle.y - 5 && this.position.y < obstacle.y + 5){
      this.lost = true;
    }

    if(!this.exploded && !this.lost){
      this.applyForce(this.dna.genes[this.count]);
      this.velocity.add(this.acceleration);
      if(this.velocity.mag() < .5){
        this.lost = true;
      }
      this.position.add(this.velocity);
      this.angle = this.velocity.heading();
      this.acceleration.mult(0);
      this.flightTime++;
    }
    this.count++;
  }

  // Method to display
  show() {
    push();
    noStroke();
    translate(this.position.x, this.position.y);
    if(this.exploded){
      fill(255,0,0,150);
      ellipse(0, 0, 40, 40);
    }else if(this.lost){
      fill(255,0,0,150);
      ellipse(0, 0, 40, 40);
    }else{
      rotate(this.angle); // heading() gives the angle of the vector 

      fill(255,0,0)
      ellipse(10, 0, 20, 5);
      let color1 = color(255, 165, 0, 150); // Orange color with alpha 150
      fill(color1);
      ellipse(-10, 0, 30, 5); // Position relative to rocket body (0, 0)
    
      // Second ellipse (middle flame)
      let color2 = color(255, 215, 0, 100); // Gold color with alpha 100
      fill(color2);
      ellipse(-10, 0, 25, 5); // Position relative to rocket body (0, 0)
    
      // Third ellipse (top flame)
      let color3 = color(255, 255, 0, 50); // Yellow color with alpha 50
      fill(color3);
      ellipse(-6, 0, 20, 5); // Position relative to rocket body (0, 0)
      fill(255,255,255);
      rectMode(CENTER);
      rect(0, 0, 25, 5);


    }
    pop();
  }
}