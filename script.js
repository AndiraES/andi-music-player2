let progress = document.getElementById("progress");
let song = document.getElementById("song-music");
let ctrlIcon = document.getElementById("ctrlIcon");

// song.onloadedmetadata = function () {
//     progress.max = song.duration; 
//     progress.value = song.currentTime; 
// }

// function playPause () {
//     if (ctrlIcon.classList.contains("fa-pause")) {
//         song.pause();
//         ctrlIcon.classList.remove("fa-pause");
//         ctrlIcon.classList.add("fa-play");
//     }
//     else {
//         song.play();
//         ctrlIcon.classList.add("fa-pause");
//         ctrlIcon.classList.remove("fa-play");
//     }
// }

// if (song.play()) {
//     setInterval(()=>{
//         progress.value = song.currentTime;
//     }, 700);
// }

// progress.onchange = function () {
//     song.play();
//     song.currentTime = progress.value;
//     ctrlIcon.classList.add("fa-pause");
//     ctrlIcon.classList.remove("fa-play");
// }


let songs = [
    {
        name: "How You Like That",
        path: "Music/BLACKPINK - 'How You Like That' M_V.mp3",
        artist: "Blackpink",
        cover: "img/Blackpink how you like that.jpg"
    },
    {
        name: "JENNIE You & Me",
        path: "Music/JENNIE - You & Me.mp3",
        artist: "Jennie",
        cover: "img/Jennie You & Me.jpg"
    },
    {
        name: "People",
        path: "Music/Libianca - People.mp3",
        artist: "Libianca",
        cover: "img/Libianca People.jpg"
    },
    {
        name: "Greedy",
        path: "Music/Tate McRae - greedy.mp3",
        artist: "Tate McRae",
        cover: "img/Tate Mcrae Greedy.jpg"
    },
    {
        name: "Die For You Remix ",
        path: "Music/The Weeknd, Ariana Grande - Die For You Remix .mp3",
        artist: "The Weeknd, Ariana Grande",
        cover: "img/die-for-you.webp"
    },
];

let currentMusic = 0;

const music = document.querySelector("#song-music");
const seekBar = document.querySelector("#progress");
const songName = document.querySelector(".music-title");
const artistName = document.querySelector(".artist-name");
const round = document.querySelector(".round");
const currentTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".song-duration");
const playBtn =document.querySelector(".play");
const forwardBtn = document.querySelector(".right");
const backwardBtn = document.querySelector(".left");


playBtn.addEventListener("click", () => {
    if (ctrlIcon.className.includes("fa-play")) {
        music.play();
    } else {
        music.pause();
    }
    ctrlIcon.classList.toggle("fa-play");
    ctrlIcon.classList.toggle("fa-pause");
})


// setup music

const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    round.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = "00:00";
    // seekBar.max = music.duration;
    // console.log(music.duration);
    setTimeout (() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 600);
}

setMusic(0);


// formatting time in minutes and seconds format

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min} : ${sec} `;
}

// seek bar value running

setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if (Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
        forwardBtn.click();
    }
}, 600)

seekBar.addEventListener("change", () => {
    music.currentTime = seekBar.value;
})


const playMusic = () => {
    music.play();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
}


// forward and backward function

forwardBtn.addEventListener("click", () => {
    if (currentMusic >= songs.length - 1) {
        currentMusic = 0;
    } else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click();
})

backwardBtn.addEventListener("click", () => {
    if (currentMusic <= 0) {
        currentMusic = songs.length - 1;
    } else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
})
