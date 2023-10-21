var canvas = document.getElementById('game-canvas');
var context = canvas.getContext('2d');
var startButton = document.getElementById('startButton');
var gameOverModal = document.getElementById('gameOverModal');
var scoreText = document.getElementById('score');
var highscoreText = document.getElementById('highscore');
var pauseIcon = document.getElementById("pauseIcon");
var playIcon = document.getElementById("playIcon");
var pauseKey = document.getElementById("pause-key"); // on mobile
var playKey = document.getElementById("play-key"); // on mobile
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
        isPlaying = true
        isPaused = true
        pauseIcon.style.display = 'none';
        playIcon.style.display = 'block';
        pauseKey.style.display = 'none'; // on mobile
        playKey.style.display = 'block'; // on mobile
    }
    if (pause === false) {
        isPlaying = true
        isPaused = false;
        pauseIcon.style.display = 'block';
        playIcon.style.display = 'none';
        pauseKey.style.display = 'block'; // on mobile
        playKey.style.display = 'none'; // on mobile
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

let lastTime = 0; // Time var comparer

function loop(timestamp) {
    if (!isPlaying) {
        // requestAnimationFrame(loop);
        return;
    }

    requestAnimationFrame(loop);

    if (++count < 10) {
        return;
    }

    if (isPaused) {
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
            snake.maxCells += 5;
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

    // Trace game loop speed
    const deltaTime = Math.ceil(timestamp - lastTime);
    lastTime = timestamp;
    console.log(`Kecepatan loop game ${deltaTime}ms`);
}

function updatePizza() {
    pizzaCount++;
    if (pizzaCount >= 10) {
        pizza.x = getRandomInt(0, 25) * grid;
        pizza.y = getRandomInt(0, 25) * grid;
        pizzaCount = 0;
    }
}

function updateBomb() {
    bombCount++;
    if (bombCount >= 15) {
        bomb.x = getRandomInt(0, 25) * grid;
        bomb.y = getRandomInt(0, 25) * grid;
        bombCount = 0;
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
    if (e.which === 32) {
        if (!isPlaying) {
            startGame();
        } else if (!isPaused) {
            pauseOrPlay(true)
        } else {
            pauseOrPlay(false)
        }
    }
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



// ARROW KEYS ON MOBILE
var keyUp = document.getElementById('key-up');
var keyDown = document.getElementById('key-down');
var keyLeft = document.getElementById('key-left');
var keyRight = document.getElementById('key-right');


// Efek klik keyUp
keyUp.addEventListener("touchstart", function () {
    keyUp.style.opacity = "0.5"
});
keyUp.addEventListener("touchend", function () {
    keyUp.style.opacity = "1"
});
// Turn up
keyUp.addEventListener("click", function () {
    if (snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
});


// Efek klik keyDown
keyDown.addEventListener("touchstart", function () {
    keyDown.style.opacity = "0.5"
});
keyDown.addEventListener("touchend", function () {
    keyDown.style.opacity = "1"
});
// Turn down
keyDown.addEventListener("click", function () {
    if (snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});


// Efek klik keyLeft
keyLeft.addEventListener("touchstart", function () {
    keyLeft.style.opacity = "0.5"
});
keyLeft.addEventListener("touchend", function () {
    keyLeft.style.opacity = "1"
});
// Turn left
keyLeft.addEventListener("click", function () {
    if (snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
});


// Efek klik keyRight
keyRight.addEventListener("touchstart", function () {
    keyRight.style.opacity = "0.5"
});
keyRight.addEventListener("touchend", function () {
    keyRight.style.opacity = "1"
});
// Turn right
keyRight.addEventListener("click", function () {
    if (snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
});
