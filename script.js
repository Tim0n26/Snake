const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const boxSize = 20;
const canvasSize = 20;
const direction = { x: 1, y: 0 };
const snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
];
let apple = { x: 5, y: 5 };
let maxScore = 0;
let gameStarted = false;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgb(245, 245, 220)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        const cell = snake[i];
        ctx.fillStyle = '#000';
        ctx.fillRect(cell.x * boxSize, cell.y * boxSize, boxSize, boxSize);

        ctx.strokeStyle = '#000';
        ctx.strokeRect(cell.x * boxSize, cell.y * boxSize, boxSize, boxSize);
    }

    ctx.fillStyle = '#000';
    ctx.fillRect(apple.x * boxSize, apple.y * boxSize, boxSize, boxSize);

    ctx.font = '16px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Score: ${maxScore}`, 10, 30);
}

function move() {
    const head = { ...snake[0] };
    head.x += direction.x;
    head.y += direction.y;

    if (head.x < 0 || head.y < 0 || head.x >= canvasSize || head.y >= canvasSize) {
        return gameOver();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return gameOver();
        }
    }

    snake.unshift(head);

    if (head.x === apple.x && head.y === apple.y) {
        apple = {
            x: Math.floor(Math.random() * canvasSize),
            y: Math.floor(Math.random() * canvasSize)
        };
        score++;
        if (score > maxScore) {
            maxScore = score;
        }
    } else {
        snake.pop();
    }
}

function gameOver() {
    clearInterval(intervalId);
    alert('Game Over!');
    location.reload();
}

function changeDirection(event) {
    const key = event.keyCode;

    if (key === 65 && direction.x !== 1) {
        direction.x = -1;
        direction.y = 0;
    } else if (key === 87 && direction.y !== 1) {
        direction.x = 0;
        direction.y = -1;
    } else if (key === 68 && direction.x !== -1) {
        direction.x = 1;
        direction.y = 0;
    } else if (key === 83 && direction.y !== -1) {
        direction.x = 0;
        direction.y = 1;
    }
}

let intervalId;

document.getElementById('startButton').addEventListener('click', () => {
    if (!gameStarted) {
        gameStarted = true;
        intervalId = setInterval(() => {
            move();
            draw();
        }, 100);
    }
});

document.addEventListener('keydown', changeDirection);
