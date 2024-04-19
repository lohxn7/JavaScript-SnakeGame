document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 5, y: 5 };
    let direction = 'right';

    function draw() {
        gameBoard.innerHTML = '';

        snake.forEach(segment => {
            const snakeElement = document.createElement('div');
            snakeElement.classList.add('snake');
            snakeElement.style.gridRowStart = segment.y;
            snakeElement.style.gridColumnStart = segment.x;
            gameBoard.appendChild(snakeElement);
        });

        const foodElement = document.createElement('div');
        foodElement.classList.add('food');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        gameBoard.appendChild(foodElement);
    }
    function move() {
        switch (direction) {
            case 'up':
                snake.unshift({ x: snake[0].x, y: snake[0].y - 1 });
                break;
            case 'down':
                snake.unshift({ x: snake[0].x, y: snake[0].y + 1 });
                break;
            case 'left':
                snake.unshift({ x: snake[0].x - 1, y: snake[0].y });
                break;
            case 'right':
                snake.unshift({ x: snake[0].x + 1, y: snake[0].y });
                break;
        }
        if (snake[0].x === food.x && snake[0].y === food.y) {
            food.x = Math.floor(Math.random() * 20) + 1;
            food.y = Math.floor(Math.random() * 20) + 1;
        } else {
            snake.pop();
        }
        if (
            snake[0].x < 1 ||
            snake[0].x > 20 ||
            snake[0].y < 1 ||
            snake[0].y > 20 ||
            checkCollision()
        ) {
            alert('Game Over!');
            snake = [{ x: 10, y: 10 }];
            direction = 'right';
        }
        draw();
    }
    function checkCollision() {
        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                return true;
            }
        }
        return false;
    }
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    });
    setInterval(move, 200);
    draw();
});
