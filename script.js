let blockSize = 25;
let rows = 20;
let columns = 20;
let table;
let context;

//snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

//moves count
let movementX = 0;
let movementY = 0;

let snake = [];

//food for snake
let foodX;
let foodY;

let score = 0;

let gameOver = false;

window.onload = function () {
    table = document.getElementById("table");
    table.height = rows * blockSize;
    table.width = columns * blockSize;
    context = table.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(displayTable, 1000 / 10);
}

function restartGame() {
    window.location.reload();
}

function displayTable() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "lime";
    context.fillRect(0, 0, table.width, table.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    eatFood();

    context.fillStyle = "darkblue";
    snakeX += movementX * blockSize;
    snakeY += movementY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let s = 0; s < snake.length; ++s) {
        context.fillRect(snake[s][0], snake[s][1], blockSize, blockSize);
    }
    checkBuffer();
}

function eatFood() {
    if (snakeX == foodX && snakeY == foodY) {
        snake.push([foodX, foodY]);
        ++score;
        document.getElementById('score-count').innerText = score;
        placeFood();
    }

    for (let s = snake.length - 1; s > 0; --s) {
        snake[s] = snake[s - 1];
    }
    if (snake.length) {
        snake[0] = [snakeX, snakeY];
    }
}

function checkBuffer() {
    if (snakeX < 0 || snakeX > columns * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true;
        document.getElementById('score-count').innerText = "Game Over";
    }
    for (let s = 0; s < snake.length; ++s) {
        if (snakeX == snake[s][0] && snakeY == snake[s][1]) {
            gameOver = true;
            document.getElementById('score-count').innerText = "Game Over";
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && movementY != 1) {
        movementX = 0;
        movementY = -1;
    } else if (e.code == "ArrowDown" && movementY != -1) {
        movementX = 0;
        movementY = 1;
    }
    else if (e.code == "ArrowLeft" && movementX != 1) {
        movementX = -1;
        movementY = 0;
    }
    else if (e.code == "ArrowRight" && movementX != -1) {
        movementX = 1;
        movementY = 0;
    }
}
//set apple random in the table
function placeFood() {
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
