var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

var foodX;
var foodY;

var gameOver = false;
var score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / 10);
}

function update() {
    if (gameOver) return;

    
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    // --- game over conditions ---
    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        gameOver = true;
        alert("Game Over! Score: " + score);
        return;
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over! Score: " + score);
            return;
        }
    }

    
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++;
        document.querySelector("h1").textContent = "snake game — " + score;
    }

    
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    
    context.fillStyle = "#060f08";
    context.fillRect(0, 0, board.width, board.height);

    
    for (let x = 0; x <= cols; x++) {
        context.strokeStyle = x % 5 === 0 ? "#13391e" : "#0c2414";
        context.lineWidth = x % 5 === 0 ? 0.8 : 0.4;
        context.beginPath();
        context.moveTo(x * blockSize, 0);
        context.lineTo(x * blockSize, board.height);
        context.stroke();
    }
    for (let y = 0; y <= rows; y++) {
        context.strokeStyle = y % 5 === 0 ? "#13391e" : "#0c2414";
        context.lineWidth = y % 5 === 0 ? 0.8 : 0.4;
        context.beginPath();
        context.moveTo(0, y * blockSize);
        context.lineTo(board.width, y * blockSize);
        context.stroke();
    }

    context.shadowColor = "#ff4444";
    context.shadowBlur = 14;
    context.fillStyle = "#ff3a3a";
    context.beginPath();
    context.arc(foodX + blockSize / 2, foodY + blockSize / 2, blockSize / 2 - 2, 0, Math.PI * 2);
    context.fill();
    context.shadowBlur = 0;

    
    context.shadowColor = "#50ff80";
    context.shadowBlur = 10;
    context.fillStyle = "#14dc3c";
    context.beginPath();
    context.roundRect(snakeX + 1, snakeY + 1, blockSize - 2, blockSize - 2, 3);
    context.fill();
    context.shadowBlur = 0;

    
    for (let i = 0; i < snakeBody.length; i++) {
        const alpha = 1 - (i / snakeBody.length) * 0.55;
        context.fillStyle = `rgba(20, 200, 60, ${alpha})`;
        context.beginPath();
        context.roundRect(snakeBody[i][0] + 2, snakeBody[i][1] + 2, blockSize - 4, blockSize - 4, 2);
        context.fill();
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) { velocityX = 0; velocityY = -1; }
    else if (e.code == "ArrowDown" && velocityY != -1) { velocityX = 0; velocityY = 1; }
    else if (e.code == "ArrowLeft" && velocityX != 1) { velocityX = -1; velocityY = 0; }
    else if (e.code == "ArrowRight" && velocityX != -1) { velocityX = 1; velocityY = 0; }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

window.addEventListener("keydown", function(e) {
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.code)) {
        e.preventDefault();
    }
});