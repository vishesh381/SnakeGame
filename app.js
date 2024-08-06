// script.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20;  // Size of each grid box
let snake = [{ x: 9 * box, y: 10 * box }];  // Initial snake position
let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };  // Initial food position
let d = '';  // Direction of snake movement
let score = 0;  // Player's score
let gameInterval;  // Interval for game loop

// Initialize the game
function init() {
    snake = [{ x: 9 * box, y: 10 * box }];
    food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
    d = '';
    score = 0;
    clearInterval(gameInterval);  // Clear any existing interval
    gameInterval = setInterval(draw, 100);  // Set up the game loop
}

// Handle direction changes
function direction(event) {
    if (event.keyCode === 37 && d !== 'RIGHT') d = 'LEFT';
    if (event.keyCode === 38 && d !== 'DOWN') d = 'UP';
    if (event.keyCode === 39 && d !== 'LEFT') d = 'RIGHT';
    if (event.keyCode === 40 && d !== 'UP') d = 'DOWN';
}

// Main game drawing function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas

    // Draw the snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'white';  // Head of the snake is green
        ctx.fillRect(snake[i].x, snake[i].y, box, box);  // Draw each segment of the snake
    }

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Get the current position of the snake's head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Update the position based on the direction
    if (d === 'LEFT') snakeX -= box;
    if (d === 'UP') snakeY -= box;
    if (d === 'RIGHT') snakeX += box;
    if (d === 'DOWN') snakeY += box;

    // Check if the snake has eaten the food
    if (snakeX === food.x && snakeY === food.y) {
        score++;  // Increase the score
        food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };  // Place new food
    } else {
        snake.pop();  // Remove the last segment of the snake
    }

    // Create a new head for the snake
    const newHead = { x: snakeX, y: snakeY };

    // Check for collision with walls or itself
    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(gameInterval);  // Stop the game
        alert('Game Over! Your score: ' + score);  // Display game over message
        return;
    }

    // Add the new head to the snake
    snake.unshift(newHead);
    
    // Draw the score
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

// Check for collision with the snake itself
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) return true;
    }
    return false;
}

// Event listener for key presses
document.addEventListener('keydown', direction);

// Event listener for the restart button
document.getElementById('restartButton').addEventListener('click', init);

// Initialize the game on page load
init();
