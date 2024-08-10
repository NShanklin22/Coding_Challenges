
function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (var j = 0; j < arr[i].length; j++) {
      if(random(1) < 0.1){
        arr[i][j] = 1;
      }else{
        arr[i][j] = 0;
      }
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

let cells;
let w = 10;
let length;
let cols;

function rules(neightbors, state) {
  if(neightbors < 2 || neightbors > 3){
    return 0;
  }else if(neightbors == 3){
    return 1;
  }else{
    return state;
  }

}

function setup() {
  createCanvas(800, 800);
  cols = 800/w;
  rows = 800/w;
  cells = make2DArray(cols, rows);

}

function draw() {
  background(220);
  frameRate(60);
  console.log("HERE")
  for (let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++){
      let x = i * w;
      let y = j * w;
      fill(255 - 255*cells[i][j])
      square(x, y, w);
    }
  }

  let nextCells = make2DArray(cols, rows);
  let neightbors;
  let state;
  for(let i =1 ; i < cols -1; i++) {
    for (let j = 1; j < rows - 1; j++){
      if(i==0 || j==0 || i == cols-1 || j == rows-1){
        nextCells[i][j] = 0;
        continue;
      }
      state = cells[i][j];
      neightbors = countNeighbors(cells, i, j);
      let newState = rules(neightbors, state);
      nextCells[i][j] = newState;
    }
  }
  cells = nextCells;
}