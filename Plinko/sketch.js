var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var x;
var y;

function setup() {
  createCanvas(1920, 1080);
  background(220);
  engine = Engine.create();
  world = engine.world; 
  x = width/2;
  y = 100;

  var p = new Particle(x,y,10);
  particles.push(p);
}

function draw(){
  if(frameCount % 60 == 0){
    var p = new Particle(x,y,10);
    particles.push(p);
  }
  background(55);
  Engine.update(engine);
  for(var i = particles.length -1; i > 0; i--){
    particles[i].show();
  }
}