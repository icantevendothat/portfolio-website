document.addEventListener("DOMContentLoaded", function () {
    var style = document.createElement('style');
    var fontFaceRule = "@font-face { " +
        "font-family: 'Water Resistant Regular'; " +
        "src: url('fonts/WaterResistant.ttf') format('truetype'); " +
        "}";
    style.appendChild(document.createTextNode(fontFaceRule));
    document.head.appendChild(style);

    const canvas = document.getElementById('mymainCanvas');
    const ctx = canvas.getContext('2d');
    const videos = [];
    const loadingOverlay = document.getElementById('loadingOverlay');
    const enterButton = document.getElementById('enterButton');
    let enteredSection = -1;
    let mouseX = 0;
    
    const videoSources = [
        'videos/gritoswebclip.mp4',
        'videos/tszrnew.mp4',
        'videos/handradr.mp4',
        'videos/IMG_3101.mp4',
        'videos/2023-11-14 16-32-39.mp4',
        'videos/6fb5817c100c4397a38c936e6430cf50.mp4'
    ];

    enterButton.addEventListener('click', function () {
        loadingOverlay.style.display = 'none';
        canvas.style.display = 'block';
        resizeCanvas();
        sessionStorage.setItem('visitedHomepage', 'true');
    });

    if (sessionStorage.getItem('visitedHomepage') === 'true') {
        loadingOverlay.style.display = 'none';
        canvas.style.display = 'block';
    }

    for (let i = 0; i < videoSources.length; i++) {
        let video = document.createElement('video');
        video.src = videoSources[i];
        video.loop = true;
        video.muted = false;
        videos.push(video);
        document.body.appendChild(video);
    }

    function playVideoInSection(event) {
        const sectionIndex = getSectionIndex(event.clientX);
        if (sectionIndex !== -1 && sectionIndex !== enteredSection) {
            if (enteredSection !== -1) {
                videos[enteredSection].pause();
            }
            videos[sectionIndex].play();
            enteredSection = sectionIndex;
        }
    }

    function pauseVideoInSection(event) {
        const sectionIndex = getSectionIndex(event.clientX);
        if (sectionIndex !== enteredSection) {
            videos[enteredSection].pause();
            enteredSection = -1;
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 2); 
        ctx.lineTo(canvas.width, 2);
        ctx.stroke();
        
        const videoWidth = canvas.width / 2.5;
        const videoHeight = canvas.height / 2.5;
        const x = (canvas.width - videoWidth) / 2;
        const y = (canvas.height - videoHeight) / 2.5;

        const sectionIndex = getSectionIndex(mouseX);

        if (sectionIndex !== -1) {
            ctx.drawImage(videos[sectionIndex], x, y, videoWidth, videoHeight);
            
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            const sectionX = (canvas.width / videos.length) * sectionIndex;
            const sectionWidth = canvas.width / videos.length;
            const topY = 0;
            const bottomY = canvas.height;
            const leftX = sectionX;
            const rightX = sectionX + sectionWidth;
            
            ctx.beginPath();
            ctx.moveTo(leftX, topY);
            ctx.lineTo(leftX, bottomY);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(rightX, topY);
            ctx.lineTo(rightX, bottomY);
            ctx.stroke();
            
            const sectionNames = ['FILM', 'PHOTO', 'GRAPHIC', 'SOUND', 'INTERACTIVE', 'ABOUT'];
            ctx.fillStyle = "white";
            ctx.font = "30px Water Resistant Regular";
            ctx.textAlign = "center";
            ctx.fillText(sectionNames[sectionIndex], sectionX + (canvas.width / (videos.length * 2)), canvas.height - 350);
        }

        requestAnimationFrame(draw);
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        draw();
    }

    window.addEventListener('load', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);

    canvas.addEventListener('mousemove', function (event) {
        mouseX = event.clientX; 
        playVideoInSection(event);
    });
    canvas.addEventListener('mouseleave', function (event) {
        mouseX = event.clientX; 
        pauseVideoInSection(event);
    });

    function getSectionIndex(mouseX) {
        const col = Math.floor(mouseX / (canvas.width / videos.length));
        return col;
    }

    canvas.addEventListener('click', function (event) {
        let sectionWidth = canvas.width / 6;
        let sectionIndex = Math.floor(event.clientX / sectionWidth);

        switch (sectionIndex) {
            case 0:
                window.location.href = 'film/film.html';
                break;
            case 1:
                window.location.href = 'photo/photo.html';
                break;
            case 2:
                window.location.href = 'graphic/graphic.html';
                break;
            case 3:
                window.location.href = 'sound/sound.html';
                break;
            case 4:
                window.location.href = 'interactive/interactive.html';
                break;
            case 5:
                window.location.href = 'about/about.html';
                break;
            default:
                break;
        }
    });
});

