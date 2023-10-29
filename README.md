# Final Project 1 | webGame

Status: In progress<br>
Expired Date: November 4, 2023

### Konsep Dasar

1. Terdapat seekor ular.
2. Terdapat umpan.
3. Terdapat makanan/umpan spesial.
4. Terdapat umpan bom.

---

### Aturan Main

1. Tekan tombol "Open Game" untuk membuka halaman game.
2. Buat nama pengguna Anda dan pilih tingkat kesulitan permainan lalu tekan tombol "Start Game" untuk memulai permainan.
3. Kendalikan ular dengan menggunakan tombol keyboard (panah atas, bawah, kiri atau kanan).
4. Dapatkan skor dan perpanjang tubuh ular dengan memakan umpan.
5. Pantau perolehan skor Anda dan highscore saat permainan berlangsung.
6. Setelah mencapai "game over," pemain dapat memeriksa leaderboard 5 top players berdasarkan skor dan tingkat kesulitan permainan.

### Item dalam game

| Nama Item | Objektif | Kemunculan | Batas Waktu Kemunculan |
| --- | --- | --- | --- |
| Apel | +1 point, +1 block | Memakan item ini akan memunculkan item baru | Tanpa batasan |
| Pizza | +5 point, +5 block | Secara random, berkisar 10 - 15 detik sekali  | 5 Detik |
| Bom | Penyebab kekalahan | Secara random, berkisar 20 - 25 detik sekali  | 8 Detik |

### Fitur dalam game

1. Pause: menjeda permainan
2. Play: memulai kembali permainan
3. Home: mengembalikan ke tampilan utama permainan
4. Return/Replay: mengulang kembali permainan
5. Sound Effect: mengaktifkan dan menonaktifkan efek permainan
6. Music: mengaktifkan dan menonaktifkan musik permainan
7. Data player yang terdiri dari username, level dan score akan tersimpan di local data.

---

*Level dalam Game*

- Easy
- Medium
- Hard

*Penyebab Kekalahan*

- Memakan bom
- Menabrak tembok
- menabrak tubuh ular


---

### Main Logic

1. start game (buat grid, snake dan makanan muncul secara random, mulai gameloop)
2. game loop (movesnake (berdasar input user), deteksi collision (dinding atau snake itu sendiri), deteksi makanan (+1 poin, spawn makanan lain), mati (kena bom atau collision))

### Mockup

[https://www.figma.com/file/EXTcqQtgjSY39albApITBR/Snake?type=design&node-id=0-1&mode=design&t=UolmHaPlUNHAdbHg-0](https://www.figma.com/file/EXTcqQtgjSY39albApITBR/Snake?type=design&node-id=0-1&mode=design&t=UolmHaPlUNHAdbHg-0)
