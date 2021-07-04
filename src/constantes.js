const canvasWidth = 600;
const canvasHeight = 600;
const CANVAS_SIZE = { canvasWidth, canvasHeight }; // TODO: transformar esse array em obj

const SNAKE_START = [
  [8, 7],
  [8, 8]
];

const APPLE_START = [8, 3];
const SCALE = 40;
const SPEED = 800;

const up = [0, -1];
const down = [0, 1];
const left = [-1, 0];
const right = [1, 0];

const DIRECTIONS = {
  38: up,
  40: down, 
  37: left,
  39: right 
};

export {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS
};