import { update as updateSnake, draw as drawSnake, SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
    if(gameOver) {
        if(confirm('You lost. Press ok to restart.')){
            window.location = '/'
        }
        return
    }

    window.requestAnimationFrame(main)
    const secondsPassed = (currentTime - lastRenderTime) / 1000
    if(secondsPassed < 1 / SPEED) return;
   
    lastRenderTime = currentTime;

    update();
    draw();
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    checkFailure()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkFailure(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}