const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = 20;

let snake = [
    { x: 10, y: 10 }
];
let food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
};
let dx = 0;
let dy = 0;
let score = 0;
let gameRunning = false;
const startButton = document.getElementById('startButton');
const gameOver = document.getElementById('gameOver');
const scoreText = document.getElementById('scoreText');

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -1;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -1;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 1;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 1;
    }
}

function drawGame() {
    if (!gameRunning) return;
    
    clearCanvas();
    moveSnake();
    checkCollision();
    drawSnake();
    drawFood();
    setTimeout(drawGame, 100);
}

function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        generateFood();
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        resetGame();
        return;
    }
    
    if (checkSelfCollision()) {
        resetGame();
        return;
    }
}

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function generateFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
}

function resetGame() {
    if (gameRunning && (
        snake[0].x < 0 || snake[0].x >= tileCount || 
        snake[0].y < 0 || snake[0].y >= tileCount ||
        checkSelfCollision()
    )) {
        gameRunning = false;
        scoreText.textContent = `得分：${score}`;
        gameOver.style.display = 'block';
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
    }
    
    snake = [{ x: 10, y: 10 }];
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    dx = 0;
    dy = 0;
}

function checkSelfCollision() {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

startButton.addEventListener('click', function() {
    document.getElementById('startScreen').style.display = 'none';
    gameRunning = true;
    gameOver.style.display = 'none';
    score = 0;
    snake = [{ x: 10, y: 10 }];
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    dx = 1;
    dy = 0;
    clearCanvas();
    drawGame();
});

restartButton.addEventListener('click', function() {
    document.getElementById('startScreen').style.display = 'none';
    gameRunning = true;
    gameOver.style.display = 'none';
    score = 0;
    snake = [{ x: 10, y: 10 }];
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    dx = 0;
    dy = 0;
    clearCanvas();
    drawGame();
}); 