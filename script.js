const image = document.getElementById("cover");
const title = document.getElementById("music-title");
const artist = document.getElementById("music-artist");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const playerProgress = document.getElementById("player-progress");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const playBtn = document.getElementById("play");
const background = document.getElementById("bg-img");

// yeni bir audio nesnesi oluştur
const music = new Audio();

// müzik listesi
const songs = [
    {
        path: "assets/1.mp3",
        displayName: "Hint Kumaşı",
        cover: "assets/1.jpg",
        artist: "Manga",
    },
    {
        path: "assets/2.mp3",
        displayName: "Bu Böyle (Saygı1)",
        cover: "assets/2.jpg",
        artist: "TNK",
    },
    {
        path: "assets/3.mp3",
        displayName: "Cambaz",
        cover: "assets/3.jpg",
        artist: "Mor ve Ötesi",
    },
];

let musicIndex = 0; // çalınan müziği takip etmek için indis
let isPlaying = false; // müzik çalıyor mu kontrolü

// oynat veya duraklat fonksiyonu
function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

// müziği başlat
function playMusic() {
    isPlaying = true;
    //oynatma butonunun simgesini değiştir
    playBtn.classList.replace("fa-play", "fa-pause");
    // oynatma butonu üzerine gelindiğinde görünen metin
    playBtn.setAttribute("title", "Duraklat");
    music.play();
}

// müziği duraklat
function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Oynat")
    music.pause();
}

// müziği yükle
function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

// müziği değiştir (önceki/sonraki)
function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

// ilerleme çubuğu güncelle
function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
    durationEl.textContent = `${formatTime(duration / 60)}: ${formatTime(
        duration % 60
    )}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(
        currentTime % 60
    )}`;
}

// ilerleme çubuğu tıklanılan yere ayarla
function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", togglePlay);

prevBtn.addEventListener("click", () => changeMusic(-1));

nextBtn.addEventListener("click", () => changeMusic(1));

music.addEventListener("ended", () => changeMusic(1));

music.addEventListener("timeupdate", updateProgressBar);

playerProgress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);

