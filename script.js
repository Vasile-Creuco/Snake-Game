var blockSize = 25;
var rows = 20;
var columns = 20;
var table;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

//moves count
var movementX = 0;
var movementY = 0;

var snake = [];

//food for snake
var foodX;
var foodY;

var score = 0;

var gameOver = false;

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

    context.fillStyle = "darkblue";
    snakeX += movementX * blockSize;
    snakeY += movementY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let s = 0; s < snake.length; ++s) {
        context.fillRect(snake[s][0], snake[s][1], blockSize, blockSize);
    }

    //game over condition
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

function placeFood() {
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}