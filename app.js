const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  // Sounds
  const sounds = document.querySelectorAll(".sound-picker button");
  // Time Display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll('.time-select button');
  // Get the length of the outline
  const outlineLength = outline.getTotalLength();
  // Duration
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // Select sound
  sounds.forEach(btn => {
    btn.addEventListener('click', function() {
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    })
  })

  // play sound
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  // window.addEventListener('keydown', (e) => {
  //   if (e.code == 'Space') {
  //     checkPlaying(song);
  //   }
  // })

  // Select time
  timeSelect.forEach(btn => {
    btn.addEventListener('click', function() {
      fakeDuration = this.getAttribute('data-time');
      song.currentTime = 0;
    })
  })
  
  function addZerro(num) {
    if (num.toString().length < 2) {
      return `0${num}`
    } else {
      return num
    }
  }

  // Animate the circle
  song.ontimeupdate = () => {

    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = addZerro(Math.floor(elapsed % 60));
    let minutes = addZerro(Math.floor(elapsed / 60));

    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    timeDisplay.innerHTML = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      video.pause();
      play.src = "./svg/play.svg";
    }
  };
};

app();
