var canvas = document.getElementById('game-canvas');
var context = canvas.getContext('2d');
var startButton = document.getElementById('startButton');
var gameOverModal = document.getElementById('gameOverModal');
var scoreText = document.getElementById('score');
var highscoreText = document.getElementById('highscore');
var pauseIcon = document.getElementById("pauseIcon");
var playIcon = document.getElementById("playIcon");
// Get element that closes the GameOverModal
var closeModal = document.getElementsByClassName("close")[0];

// Pause or Play game
function pauseOrPlay() {
    if (isPlaying) {
        pauseIcon.style.display = "none";
        playIcon.style.display = "block";
        // Menghentikan logika game
        clearInterval(gameInterval);
    } else {
        pauseIcon.style.display = "block";
        playIcon.style.display = "none";
        // Memulai kembali logika game
        gameInterval = setInterval(loop, 1000 / 15); // Atur kecepatan loop
    }
    isPlaying = !isPlaying;
}

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function () {
    gameOverModal.style.display = "none";
}

var grid = 16; // Ukuran grid

var snake = { // Objek ular
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};

var count = 0;

var apple = { // Apple
    x: 320,
    y: 320
};

// Set status awal game
var isPlaying = false;
// Variabel untuk jeda
var gameInterval;
// Set score awal
var score = 0;
// Skor tertinggi
var highscore = 0;

// Mendapatkan angka acak antara min dan max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Fungsi perulangan loop dalam game
function loop() {
    // Cek status game
    if (!isPlaying) {
        return;
    }

    requestAnimationFrame(loop);

    // Kecepatan ular
    if (++count < 7) {
        return;
    }

    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    // Cek apakah ular menabrak canvas
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

    // Draw snake
    snake.cells.forEach(function (cell, index) {
        if (index === 0) {
            context.fillStyle = '#E79D56'; // Warna kepala ular
        } else {
            context.fillStyle = '#386858'; // Warna body ular
        }
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        // Kondisi jika ular makan apel
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            // Posisi buah diganti
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
            // Perbarui skor
            score++;
            scoreText.textContent = 'Score: ' + score;


            // Perbarui highscore jika skor baru lebih tinggi
            if (score > highscore) {
                highscore = score;
                highscoreText.textContent = 'Highscore: ' + highscore;
            }
        }
    });



    var appleImage = new Image();
    appleImage.src = 'assets/apple.svg';
    context.drawImage(appleImage, apple.x, apple.y, grid - 1, grid - 1);

    // var pizzaImage = new Image();
    // pizzaImage.src = 'assets/pizza.svg';
    // context.drawImage(pizzaImage, pizza.x, pizza.y, grid - 1, grid - 1);

    // var bombImage = new Image();
    // bombImage.src = 'assets/bomb.svg';
    // context.drawImage(bombImage, bomb.x, bomb.y, grid - 1, grid - 1);
}

// Fungsi untuk memulai permainan
function startGame() {
    isPlaying = true;
    canvas.style.display = 'block';
    startButton.style.display = 'none';
    gameOverModal.style.display = 'none';

    // Reset skor saat memulai permainan baru
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

    loop();
}

// Fungsi untuk mengakhiri permainan
function gameOver() {
    isPlaying = false;
    startButton.style.display = 'block';
    gameOverModal.style.display = 'block';
}

// Start dan memulai permainan
startButton.addEventListener('click', startGame);

// Arrow Keys
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