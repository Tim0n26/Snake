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

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        const cell = snake[i];
        ctx.fillStyle = i === 0 ? '#0f0' : '#fff';
        ctx.fillRect(cell.x * boxSize, cell.y * boxSize, boxSize, boxSize);

        ctx.strokeStyle = '#000';
        ctx.strokeRect(cell.x * boxSize, cell.y * boxSize, boxSize, boxSize);
    }

    ctx.fillStyle = '#f00';
    ctx.fillRect(apple.x * boxSize, apple.y * boxSize, boxSize, boxSize);
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

let intervalId = setInterval(() => {
    move();
    draw();
}, 100);

document.addEventListener('keydown', changeDirection);