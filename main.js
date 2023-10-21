var canvas = document.getElementById('game-canvas');
var context = canvas.getContext('2d');
var startButton = document.getElementById('startButton');
var gameOverModal = document.getElementById('gameOverModal');
var scoreText = document.getElementById('score');
var highscoreText = document.getElementById('highscore');
var pauseIcon = document.getElementById("pauseIcon");
var playIcon = document.getElementById("playIcon");
var closeModal = document.getElementsByClassName("close")[0];

var grid = 16;

var snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};

var count = 0;

var apple = {
    x: 320,
    y: 320
};

var pizza = {
    x: getRandomInt(0, 25) * grid,
    y: getRandomInt(0, 25) * grid
};

var bomb = {
    x: getRandomInt(0, 25) * grid,
    y: getRandomInt(0, 25) * grid
};

var pizzaCount = 0;
var bombCount = 0;

var isPlaying = false;
var gameInterval;

var score = 0;
var highscore = 0;
var isPaused = false;


function pauseOrPlay(pause) {
    if (pause === true) {
        isPaused = true;
        document.getElementById('pauseIcon').style.display = 'none';
        document.getElementById('playIcon').style.display = 'block';
    } else if (pause === false) {
        isPaused = false;
        document.getElementById('pauseIcon').style.display = 'block';
        document.getElementById('playIcon').style.display = 'none';
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
    if (!isPlaying || isPaused) {
        requestAnimationFrame(loop);
        return;
    }

    requestAnimationFrame(loop);

    if (++count < 7) {
        return;
    }

    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
        gameOver();
        return;
    }

    snake.cells.unshift({
        x: snake.x,
        y: snake.y
    });

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    snake.cells.forEach(function (cell, index) {
        context.fillStyle = (index === 0) ? '#E79D56' : '#386858';
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
    
        if (index !== 0 && cell.x === snake.x && cell.y === snake.y) {
            gameOver();
            return;
        }
    
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
            score++;
            scoreText.textContent = 'Score: ' + score;
        }

        if (cell.x === pizza.x && cell.y === pizza.y) {
            snake.maxCells+=5;
            pizza.x = getRandomInt(0, 25) * grid;
            pizza.y = getRandomInt(0, 25) * grid;
            score += 5;
            scoreText.textContent = 'Score: ' + score;
            pizzaCount = 0;
        }

        if (cell.x === bomb.x && cell.y === bomb.y) {
            gameOver();
            return;
        }
    });

    var appleImage = new Image();
    appleImage.src = 'assets/apple.svg';
    context.drawImage(appleImage, apple.x, apple.y, grid - 1, grid - 1);

    var pizzaImage = new Image();
    pizzaImage.src = 'assets/pizza.svg';
    context.drawImage(pizzaImage, pizza.x, pizza.y, grid - 1, grid - 1);

    var bombImage = new Image();
    bombImage.src = 'assets/bomb.svg';
    context.drawImage(bombImage, bomb.x, bomb.y, grid - 1, grid - 1);
}

function isCollidingWithSnake(x, y) {
    // Cek apakah koordinat (x, y) bertabrakan dengan tubuh ular
    for (let i = 0; i < snake.cells.length; i++) {
        if (snake.cells[i].x === x && snake.cells[i].y === y) {
            return true; // Ada tumpang tindih dengan tubuh ular
        }
    }
    return false; // Tidak ada tumpang tindih dengan tubuh ular
}

function updatePizza() {
    pizzaCount++;

    if (pizzaCount >= 5) {
        var newPizzaX, newPizzaY;

        do {
            newPizzaX = getRandomInt(0, 25) * grid;
            newPizzaY = getRandomInt(0, 25) * grid;
        } while (
            (newPizzaX === apple.x && newPizzaY === apple.y) ||
            (newPizzaX === bomb.x && newPizzaY === bomb.y) ||
            isCollidingWithSnake(newPizzaX, newPizzaY)
        );

        pizza.x = newPizzaX;
        pizza.y = newPizzaY;
        pizzaCount = 0;
        console.log('pizza pindah');
    }
}

function updateBomb() {
    bombCount++;

    if (bombCount >= 8) {
        var newBombX, newBombY;

        do {
            newBombX = getRandomInt(0, 25) * grid;
            newBombY = getRandomInt(0, 25) * grid;
        } while (
            (newBombX === apple.x && newBombY === apple.y) ||
            (newBombX === pizza.x && newBombY === pizza.y) ||
            isCollidingWithSnake(newBombX, newBombY)
        );

        bomb.x = newBombX;
        bomb.y = newBombY;
        bombCount = 0;
        console.log('bom pindah');
    }
}

function startGame() {
    isPlaying = true;
    canvas.style.display = 'block';
    startButton.style.display = 'none';
    gameOverModal.style.display = 'none';
    pizzaCount = 0;
    bombCount = 0;
    score = 0;
    scoreText.textContent = 'Score: 0';
    snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;
    apple.x = getRandomInt(0, 25) * grid;
    apple.y = getRandomInt(0, 25) * grid;
    setInterval(updatePizza, 5000); // 5 detik
    setInterval(updateBomb, 8000); // 8 detik
    loop();
}

function gameOver() {
    isPlaying = false;
    if (score > highscore) {
        highscore = score; // Perbarui highscore jika skor saat ini lebih tinggi
        highscoreText.textContent = 'Highscore: ' + highscore; // Perbarui teks highscore di layar
    }
    startButton.style.display = 'block';
    gameOverModal.style.display = 'block';
}

startButton.addEventListener('click', startGame);

document.addEventListener('keydown', function (e) {
    if (isPlaying) {
        if (e.which === 37 && snake.dx === 0) {
            snake.dx = -grid;
            snake.dy = 0;
        } else if (e.which === 38 && snake.dy === 0) {
            snake.dy = -grid;
            snake.dx = 0;
        } else if (e.which === 39 && snake.dx === 0) {
            snake.dx = grid;
            snake.dy = 0;
        } else if (e.which === 40 && snake.dy === 0) {
            snake.dy = grid;
            snake.dx = 0;
        }
    }
});

document.querySelector(".close").addEventListener("click", function () {
    gameOverModal.style.display = "none";
});