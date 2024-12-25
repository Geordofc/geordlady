document.addEventListener('DOMContentLoaded', () => {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playPauseIcon = document.getElementById('play-pause-icon');
    const audioPlayer = document.getElementById('audio-player');

    let isPlaying = false; // Status awal: musik tidak diputar

    // Fungsi untuk toggle play/pause
    function togglePlayPause() {
        if (isPlaying) {
            // Pause audio
            audioPlayer.pause();
            playPauseIcon.src = 'file/play.png';
            playPauseIcon.alt = 'Play';
        } else {
            // Play audio
            audioPlayer.play();
            playPauseIcon.src = 'file/Play2.png';
            playPauseIcon.alt = 'Pause';
        }
        isPlaying = !isPlaying; // Toggle status
    }

    // Event listener untuk tombol play/pause
    playPauseBtn.addEventListener('click', togglePlayPause);

    // Event listener untuk tombol spasi
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            event.preventDefault(); // Mencegah scrolling ketika spasi ditekan
            togglePlayPause();
        }
    });

    // Update ikon saat audio selesai diputar
    audioPlayer.addEventListener('ended', () => {
        isPlaying = false;
        playPauseIcon.src = 'file/play.png';
        playPauseIcon.alt = 'Play';
    });


    function updateProgress() {
        // Update slider value
        progressSlider.value = currentTime;

        // Update current time display
        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime % 60;
        currentTimeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        // Update slider background gradient dynamically
        const percentage = (currentTime / duration) * 100;
        progressSlider.style.background = `linear-gradient(to right, #f3f3f3 ${percentage}%, #f3f3f3 ${percentage}%)`;
    }

    // Update the current time and slider value when the user interacts with the slider
    progressSlider.addEventListener('input', () => {
        currentTime = parseInt(progressSlider.value);
        updateProgress();
    });

    // Sync audio current time with the slider
    audioPlayer.addEventListener('timeupdate', () => {
        currentTime = Math.floor(audioPlayer.currentTime);
        updateProgress();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const progressSlider = document.getElementById('progress-slider');
    const currentTimeDisplay = document.getElementById('current-time');

    // Update slider value and audio current time when the slider is clicked
    progressSlider.addEventListener('input', () => {
        const currentTime = progressSlider.value;
        audioPlayer.currentTime = currentTime;
        updateCurrentTimeDisplay(currentTime);
    });

    // Update the display when audio time updates
    audioPlayer.addEventListener('timeupdate', () => {
        progressSlider.value = audioPlayer.currentTime;
        updateCurrentTimeDisplay(audioPlayer.currentTime);
    });

    function updateCurrentTimeDisplay(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        currentTimeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const progressSlider = document.getElementById('progress-slider');
    const currentTimeDisplay = document.getElementById('current-time');

    // Set max value of slider based on audio duration
    audioPlayer.addEventListener('loadedmetadata', () => {
        progressSlider.max = audioPlayer.duration;
    });

    // Update slider value and audio current time when the slider is clicked
    progressSlider.addEventListener('input', () => {
        const currentTime = progressSlider.value;
        audioPlayer.currentTime = currentTime;
        updateCurrentTimeDisplay(currentTime);
    });

    // Update the slider and current time display as the audio plays
    audioPlayer.addEventListener('timeupdate', () => {
        if (!audioPlayer.paused && !audioPlayer.ended) {
            // Prevent slider from moving past the duration of the audio
            if (audioPlayer.currentTime <= audioPlayer.duration) {
                progressSlider.value = audioPlayer.currentTime;
                updateCurrentTimeDisplay(audioPlayer.currentTime);
            }
        }
    });

    // Stop playback when audio ends and reset slider
    audioPlayer.addEventListener('ended', () => {
        progressSlider.value = progressSlider.max; // Set slider to the end position
        updateCurrentTimeDisplay(audioPlayer.duration); // Update time display to the end
    });

    function updateCurrentTimeDisplay(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        currentTimeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const progressSlider = document.getElementById('progress-slider');
    const currentTimeDisplay = document.getElementById('current-time');

    // Set max value of slider based on audio duration
    audioPlayer.addEventListener('loadedmetadata', () => {
        progressSlider.max = audioPlayer.duration;
    });

    // Update slider value and audio current time when the slider is clicked
    progressSlider.addEventListener('input', () => {
        const currentTime = progressSlider.value;
        audioPlayer.currentTime = currentTime;
        updateCurrentTimeDisplay(currentTime);
    });

    // Update the slider and current time display as the audio plays
    audioPlayer.addEventListener('timeupdate', () => {
        if (!audioPlayer.paused && !audioPlayer.ended) {
            // Prevent slider from moving past the duration of the audio
            if (audioPlayer.currentTime <= audioPlayer.duration) {
                progressSlider.value = audioPlayer.currentTime;
                updateCurrentTimeDisplay(audioPlayer.currentTime);
            }
        }
    });

    // Stop playback when audio ends and reset slider
    audioPlayer.addEventListener('ended', () => {
        progressSlider.value = progressSlider.max; // Set slider to the end position
        updateCurrentTimeDisplay(audioPlayer.duration); // Update time display to the end
    });

    function updateCurrentTimeDisplay(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        currentTimeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
});

const audioPlayer = document.getElementById('audio-player');
const lyricsContainer = document.querySelector('.lyrics-container');
const lyrics = document.querySelector('.lyrics');
const allLyrics = lyrics.querySelectorAll('p');
let isScrollLocked = false; // Mengontrol penguncian scroll otomatis

// Fungsi untuk memperbarui lirik
function updateLyrics() {
    const currentTime = audioPlayer.currentTime;
    let activeLyric = null;

    allLyrics.forEach((lyric, index) => {
        const lyricTime = parseFloat(lyric.getAttribute('data-time'));
        const nextLyricTime =
            index < allLyrics.length - 1
                ? parseFloat(allLyrics[index + 1].getAttribute('data-time'))
                : audioPlayer.duration;

        // Cek jika waktu audio sekarang berada dalam rentang lirik
        if (currentTime >= lyricTime && currentTime < nextLyricTime) {
            lyric.classList.add('active');
            activeLyric = lyric;
        } else {
            lyric.classList.remove('active');
        }
    });

    // Scroll otomatis hanya jika ada pergantian lirik dan scroll tidak terkunci
    if (activeLyric && !isScrollLocked) {
        isScrollLocked = true; // Lock the auto-scroll
        
        const activeOffset = activeLyric.offsetTop;
        
        // Set containerHeight based on screen width
        const containerHeight = window.innerWidth <= 768 ? lyricsContainer.offsetHeight / 8.5 : lyricsContainer.offsetHeight / 3;
    
        // Scroll to the active lyric
        lyricsContainer.scrollTo({
            top: activeOffset - containerHeight,
            behavior: 'smooth', // Smooth scrolling animation
        });
    
        // Unlock scroll after 0.5 seconds
        setTimeout(() => {
            isScrollLocked = false;
        }, 500); // Adjusted to 500ms for a more practical timeout
    }
    
}

// Fungsi untuk berpindah waktu audio saat lirik diklik
function onLyricClick(event) {
    if (event.target.tagName === 'P') {
        const time = parseFloat(event.target.getAttribute('data-time'));
        audioPlayer.currentTime = time; // Ubah waktu audio
        updateLyrics(); // Perbarui tampilan lirik
    }
}

// Event listener untuk memperbarui lirik selama audio diputar
audioPlayer.addEventListener('timeupdate', updateLyrics);

// Event listener untuk mengatur waktu audio ketika lirik diklik
lyrics.addEventListener('click', onLyricClick);

// Inisialisasi awal
updateLyrics();

// Elemen-elemen HTML yang terkait
const progressSlider = document.getElementById('progress-slider');
const currentTimeDisplay = document.getElementById('current-time');
const totalTimeDisplay = document.getElementById('total-time');
const audio = new Audio('file/ladykiller.mp3'); // Ganti dengan path file audio Anda

// Set durasi total audio saat metadata dimuat
audio.addEventListener('loadedmetadata', () => {
    progressSlider.max = audio.duration;
    totalTimeDisplay.textContent = formatTime(audio.duration);
});

// Update progress slider dan tampilan waktu saat audio diputar
audio.addEventListener('timeupdate', () => {
    progressSlider.value = audio.currentTime;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

// Fungsi untuk format waktu dalam format MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
}

// Update audio saat slider diubah oleh pengguna
progressSlider.addEventListener('input', () => {
    audio.currentTime = progressSlider.value;
});

// Memulai pemutaran audio (opsional)
audio.play();


const albumCover = document.querySelector('.album-art img');

// Tambahkan kelas 'playing' saat audio diputar
audioPlayer.addEventListener('play', () => {
    albumCover.classList.add('playing');
});

// Hapus kelas 'playing' saat audio dijeda
audioPlayer.addEventListener('pause', () => {
    albumCover.classList.remove('playing');
});


const closePopup = document.getElementById('close-popup');

// Event untuk menutup popup
closePopup.addEventListener('click', () => {
  window.parent.document.getElementById('popup-container').style.display = 'none';
});


const volumeSlider = document.getElementById('volume-slider');
const volumeLevel = document.getElementById('volume-level');

volumeSlider.addEventListener('input', () => {
    const volume = volumeSlider.value / 100; // Konversi ke nilai antara 0 dan 1
    audioPlayer.volume = volume; // Atur volume audio
    volumeLevel.textContent = `${volumeSlider.value}%`;

    // Perbarui warna background slider
    volumeSlider.style.background = `linear-gradient(to right, #f3f3f3 ${volumeSlider.value}%, #f3f3f3 ${volumeSlider.value}%)`;
});