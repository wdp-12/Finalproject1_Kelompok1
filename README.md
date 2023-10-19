# Final Project 1 | Snake Game

Status: In progress <br>
Expired Date: November 4, 2023

### Konsep Dasar

1. Terdapat seekor ular.
2. Terdapat umpan.
3. Terdapat makanan/umpan spesial.
4. Terdapat umpan bom.

---

### Aturan Main

1. Tombol "start" mengarah ke perintah "start game"
2. Pilih level dan buat username.
3. Kendalikan ular dengan tombol keyboard. (arrow atas, bawah, kiri, kanan)
4. Memakan umpan akan meningkatkan skor dan panjang ular.
5. Terdapat highscore dan skor per putaran.

### Item dalam game

| Nama Item | Objektif | Kemunculan | Batas Waktu Kemunculan |
| --- | --- | --- | --- |
| Apel | +1 point, +1 block | Memakan item ini akan memunculkan item baru | Tanpa batasan |
| Pizza | +5 point, +1 block | Secara random, berkisar 10 - 20 detik sekali  | 5 Detik |
| bom | Penyebab kekalahan | Secara random, berkisar 15 - 25 detik sekali  | 8 Detik |

**Level dalam Game**

- Easy
- Medium
- Hard

**Penyebab Kekalahan**

- Memakan bom
- Menabrak tembok
- menabrak tubuh ular

---

### Main Logic

1. start game (buat grid, snake dan makanan muncul secara random, mulai gameloop)
2. game loop (movesnake (berdasar input user), deteksi collision (dinding atau snake itu sendiri), deteksi makanan (+1 poin, spawn makanan lain), mati (kena bom atau collision))

### Mockup

[https://www.figma.com/file/EXTcqQtgjSY39albApITBR/Snake](https://www.figma.com/file/EXTcqQtgjSY39albApITBR/Snake)

### Contributor

>
> [<img src="https://avatars.githubusercontent.com/u/143673777?v=4" title="shehnazeyma" width="30" style="border-radius: 50%;"/>](https://github.com/shehnazeyma)
> [<img src="https://avatars.githubusercontent.com/u/142389956?v=4" title="Muhammad Hamdan Zulfa" width="30" style="border-radius: 50%;"/>](https://github.com/hamdanzull)
> [<img src="https://avatars.githubusercontent.com/u/89184237?v=4" title="Muhammad Dimas Erlangga" width="30" style="border-radius: 50%;"/>](https://github.com/Berjiwasantuy)
> [<img src="https://avatars.githubusercontent.com/u/122588201?v=4" title="Ari Zidane" width="30" style="border-radius: 50%;"/>](https://github.com/arizdn234)
