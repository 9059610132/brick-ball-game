const gameContainer = document.querySelector('.game-container');
const paddle = document.querySelector('.paddle');
const ball = document.querySelector('.ball');
const bricks = [];
let ballX = 50;
let ballY = 50;
let ballSpeedX = 5;
let ballSpeedY = 5;
let paddleX = 50;
let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(event) {
    if (event.key === 'Right' || event.key === 'ArrowRight') {
        rightPressed = true;
    } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.key === 'Right' || event.key === 'ArrowRight') {
        rightPressed = false;
    } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

function draw() {
    // Update paddle position
    if (rightPressed && paddleX < gameContainer.offsetWidth - paddle.offsetWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    // Update ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with walls
    if (ballX + ballSpeedX > gameContainer.offsetWidth - ball.offsetWidth || ballX + ballSpeedX < 0) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY + ballSpeedY < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddle
    if (ballY + ballSpeedY > gameContainer.offsetHeight - ball.offsetHeight) {
        if (ballX > paddleX && ballX < paddleX + paddle.offsetWidth) {
            ballSpeedY = -ballSpeedY;
        }
    }

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    paddle.style.left = paddleX + 'px';

    requestAnimationFrame(draw);
}

draw();
