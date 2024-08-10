function Particle(x,y, r){
    this.body = Bodies.circle(x, y, 10);
    this.r = r
    World.add(world, this.body);
}

Particle.prototype.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    fill(255);
    stroke(255);
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    ellipse(0, 0, 20, 20);
    pop();
}