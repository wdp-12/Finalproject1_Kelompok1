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

function fadeIn(audioElement, duration) {
    audioElement.volume = 0;
    audioElement.play();
    let fadeInInterval = 10;
    let targetVolume = 0.9;

    let volumeStep = 1 / (duration / fadeInInterval);

    const fadeInterval = setInterval(() => {
        if (audioElement.volume < targetVolume) {
            audioElement.volume += volumeStep;
        } else {
            clearInterval(fadeInterval);
        }
    }, fadeInInterval);
}

function playBackgroundSound() {
    var bgAudio = document.getElementById('bgAudio');
    fadeIn(bgAudio, 2000)
}

function playEatSound() {
    var eatAudio = document.getElementById('eatAudio');
    eatAudio.play();
}

function playBombSound() {
    var bombAudio = document.getElementById('bombAudio');
    bombAudio.play();
}

function playCDSound() {
    var CDAudio = document.getElementById('CDAudio');
    CDAudio.play();
    CDAudio.volume = 0.6
}

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
        playBombSound();
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
            playBombSound();
            gameOver();
            return;
        }

        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
            score++;
            scoreText.textContent = 'Score: ' + score;
            playEatSound(); // Mainkan suara saat memakan apel
        }

        if (cell.x === pizza.x && cell.y === pizza.y) {
            snake.maxCells += 5;
            pizza.x = getRandomInt(0, 25) * grid;
            pizza.y = getRandomInt(0, 25) * grid;
            score += 5;
            scoreText.textContent = 'Score: ' + score;
            pizzaCount = 0;
            playEatSound(); // Mainkan suara saat memakan pizza
        }

        if (cell.x === bomb.x && cell.y === bomb.y) {
            playBombSound(); // Mainkan suara saat memakan bom
            gameOver();
            return;
        }
    });

    var appleImage = new Image();
    appleImage.src = 'assets/item/apple.svg';
    context.drawImage(appleImage, apple.x, apple.y, grid - 1, grid - 1);

    var pizzaImage = new Image();
    pizzaImage.src = 'assets/pizza.svg';
    context.drawImage(pizzaImage, pizza.x, pizza.y, grid - 1, grid - 1);

    var bombImage = new Image();
    bombImage.src = 'assets/item/bomb.svg';
    context.drawImage(bombImage, bomb.x, bomb.y, grid - 1, grid - 1);

    // Trace game loop speed
    const deltaTime = Math.ceil(timestamp - lastTime);
    lastTime = timestamp;
    console.log(`Kecepatan loop game ${deltaTime}ms`);
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
    // Mulai putar suara latar belakang saat permainan dimulai
    playBackgroundSound();
    setInterval(updatePizza, 5000); // 5 detik
    setInterval(updateBomb, 8000); // 8 detik
    loop();
}

function gameOver() {
    isPlaying = false;
    // Menghentikan suara latar belakang
    document.getElementById("bgAudio").pause();
    if (score > highscore) {
        highscore = score; // Perbarui high score jika skor saat ini lebih tinggi
        highscoreText.textContent = 'Highscore: ' + highscore; // Perbarui teks high score di layar

        // Simpan high score ke local storage
        localStorage.setItem('highscore', highscore);
    }
    startButton.style.display = 'block';
    gameOverModal.style.display = 'block';
}

function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    const startButton = document.getElementById('startButton');
    countdownElement.style.display = 'flex'
    gameOverModal.style.display = 'none'


    let countdown = 3;
    let countdownInterval;
    playCDSound()

    countdownElement.style.fontSize = '17vh'
    countdownElement.style.color = 'white'
    countdownElement.textContent = countdown;

    function updateCountdown() {
        countdown--;
        countdownElement.textContent = countdown;
        if (countdown <= 0) {
            countdownElement.textContent = 'Mulai!';
            countdownElement.style.fontSize = '10vh'
            countdownElement.style.color = '#ff3300'
            if (countdown < 0) {
                clearInterval(countdownInterval);
                startButton.disabled = false
                startGame();
                countdownElement.style.display = 'none'
            }
        }
    }
    countdownElement.style.fontSize = '23vh'

    countdownInterval = setInterval(updateCountdown, 1000)
    startButton.disabled = true
    isPlaying = true
}

startButton.addEventListener('click', startCountdown);

document.addEventListener('keydown', function (e) {
    if (e.which === 32) {
        e.preventDefault()
        if (!isPlaying) {
            startCountdown();
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

function updateHighscore() {
    if (localStorage.getItem('highscore') !== null) {
        highscore = parseInt(localStorage.getItem('highscore'));
    } else {
        highscore = 0;
    }
    highscoreText.textContent = 'Highscore: ' + highscore;
}

window.onload = function () {
    updateHighscore();
};

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
