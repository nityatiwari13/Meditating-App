const app= () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');
    const sounds = document.querySelectorAll('.sound button');
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time button');
    const l = outline.getTotalLength();
    //console.log(l);
    let fd = 600;
    let ch = 1; // change
    outline.style.strokeDasharray = l;
    outline.style.strokeDashoffset = l;

    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');

            // let ct = song.currentTime(); // cnange 
            // let a = Math.floor(ct % 60);
            // let b = Math.floor(ct / 60);
            // if (a==0 && b==0)
            // ch = 1;
            // else 
            // ch = 0; // change 
            // video.play(); //change                     
            // song.play(); //change
            checkPlaying(song); // original
            //let ct = song.currentTime;
            //let elapsed = fd - currentTime;
            //let seconds = Math.floor(ct % 60);
            //let minutes = Math.floor(ct / 60);
            //timeDisplay.textContent = `${minutes}:${seconds}`;
           // song.currentTime = 0; // change  
            //song.play();
            //video.play();
            
        });
    });

    play.addEventListener('click', () =>{
        checkPlaying(song);
    });

    timeSelect.forEach(option => {
        option.addEventListener("click", function() {
            fd = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fd / 60)}:${Math.floor(fd % 60)}`;
        });
    });

    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        }
        else {
            song.pause();
            video.pause();
            play.src = './svg./play.svg';
        }
    };
    song.ontimeupdate = () => {
        //if (ch == 1) { // change
        let currentTime = song.currentTime;
        let elapsed = fd - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        let progress = l - (currentTime / fd) * l;
        outline.style.strokeDashoffset = progress;
        timeDisplay.textContent = `${minutes}:${seconds}`;
        if(currentTime >= fd) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    //} // change 
    // else { // change 
    //     //let currentTime = song.currentTime;
    //     fd = ct;
    //     let elapsed = fd - ct;
    //     let seconds = Math.floor(elapsed % 60); 
    //     let minutes = Math.floor(elapsed / 60);
    //     let progress = l - (currentTime / fd) * l;
    //     outline.style.strokeDashoffset = progress;
    //     timeDisplay.textContent = `${minutes}:${seconds}`;
    // } // change
    }
};

app();


