
function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (var j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for(let i = -1; i < 2; i++) {
    for(let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

let grid;
let w = 10;
let cols, rows;

function setup() {
  createCanvas(400, 400);
  cols = width / w;
  rows = height / w;
  grid = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }
  grid[20][2] = 1;
}

function mouseDragged() {
  let i = floor(mouseX / w);
  let j = floor(mouseY / w);

  let matrix = 3;
  let extent = floor(matrix / 2);
  for(let x = i - extent; x < i + extent; x++) {
    for(let y = j - extent; y < j + extent; y++) {
      if(random(1) < .7){
        if(x >= 0 && x < cols && y >= 0 && y < rows) {
          grid[x][y] = 1;
        }
      }
    }
  }
}

function mousePressed() {
  let i = floor(mouseX / w);
  let j = floor(mouseY / w);

  let matrix = 3;
  let extent = floor(matrix / 2);
  for(let x = i - extent; x < i + extent; x++) {
    for(let y = j - extent; y < j + extent; y++) {
      if(random(1) < .7){
        if(x >= 0 && x < cols && y >= 0 && y < rows) {
          grid[x][y] = 1;
        }
      }
    }
  }
}

function draw() {
  background(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      stroke(0)
      fill(grid[i][j] * 255);
      let x = i * w;
      let y = j * w;
      square(x, y, w);
    }
  }

  let nextGrid = make2DArray(cols, rows);
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      let state = grid[i][j];

      if (state == 1) {
        let below = grid[i][j + 1];
        let belowA, belowB;
        if(i - 1 >= 0 && i  <= cols){
          belowA = grid[i - 1][j + 1];
        }
        if(i + 1 >= 0 && i + 1 <= cols - 1 ){
          belowB = grid[i + 1][j + 1];
        }

        if(below === 0 ) {
          nextGrid[i][j + 1] = 1;
        }else if(belowA === 0) {
          nextGrid[i - 1][j + 1] = 1;
        }else if(belowB === 0) {
          nextGrid[i + 1][j + 1] = 1;
        }else{
          nextGrid[i][j] = 1;
        }
      }
    }
  }
  grid = nextGrid;
}
