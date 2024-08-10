let swarm;
let target;
let obstacle;
let lifespan = 200;
let generation;

function setup() {
  createCanvas(1920, 1080);
  swarm = new Swarm(lifespan);
  target = createVector(width / 2, 100);
  obstacle = createVector(width / 2, height/2);
  lifeP = createP();
  fitness = createP();
  testForce = createP();
  generation = 0;
  angleMode(RADIANS);
}

function draw() {
  background(0);
  ellipse(target.x, target.y, 50, 50);
  rectMode(CENTER);
  rect(obstacle.x, obstacle.y, 400, 10);

  swarm.update(target,obstacle);
  if (swarm.count > lifespan) {
    swarm.selection();
  }
  lifeP.html("Generation: " + swarm.count);
  fitness.html("Fitness: " + swarm.maxfit);

  let startX = width / 2;
  let startY = height / 2;

  // Calculate the end point of the line based on its length and angle
  let lineLength = 100;
  let angle =  random(-3*PI/4, -PI/4); // Angle in radians (45 degrees)
  let endX = startX + cos(angle) * lineLength;
  let endY = startY + sin(angle) * lineLength;

  // Draw the line
  stroke(255);
  line(startX, startY, endX, endY);
  let newForce = p5.Vector.fromAngle(angle);
  console.log(newForce);
  testForce.html("Force: " + newForce);

  if (mouseIsPressed === true) {
    frameRate(10);
  } else {
    frameRate(60);
  }

}
