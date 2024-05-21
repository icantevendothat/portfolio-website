const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const images = [];
const sectionImages = [
    'images/analog.png',
    'images/digital.png',
    'images/sittingaround.png',
    'images/spaces.png',
    'images/richmond.png',
    'images/gsd.png',
];

const artworkTitles = [
    "Analog Gallery",
    "Digital Gallery",
    "'Sitting Around', 2021",
    "'Spaces', 2021",
    "'Random House Richmond', 2021",
    "Freedom Plaza, 2021",
];

const artworkDescriptions = [
    "Collection of film photography.",
    "Collection of digital photography.",
    "Cyanotype series of self portraits. Inspired by immobility.",
    "Audiovisual series exploring girlhood and danger.",
    "Series of portraits in Richmond, Virgnina.",
    "Go Skate Day in Washington DC, 2021.",
];

for (let i = 0; i < sectionImages.length; i++) {
    let image = new Image();
    image.src = sectionImages[i];
    images.push(image);
}

const descriptionContainer = document.getElementById('descriptionContainer');
let sectionIndex = 0; 

resizeCanvas();

window.addEventListener('resize', resizeCanvas);

canvas.addEventListener('mousemove', function(event) {
    let rect = canvas.getBoundingClientRect(); 
    let mouseX = event.clientX - rect.left; 
    let mouseY = event.clientY - rect.top; 

    let sectionHeight = canvas.height / 6;
    sectionIndex = Math.floor(mouseY / sectionHeight); 

    draw(mouseX, mouseY);
    updateDescription(mouseY);
    drawDescription(artworkDescriptions[sectionIndex], descriptionX, sectionHeight * sectionIndex + sectionHeight / 2);
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * (2/3); 
    draw();
}

function drawDescription(description, x, y) {
    ctx.fillStyle = 'white'; 
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(description, x, y);
}

function draw(mouseX, mouseY) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let sectionHeight = canvas.height / 6;
    let lineWidth = canvas.width * (5/6);
    let descriptionX = canvas.width * (5/6) + 10; 

    let imageX = (canvas.width - images[sectionIndex].width / 2.3) / 2;
    let imageY = (canvas.height - images[sectionIndex].height / 2.7) / 2;

    ctx.drawImage(images[sectionIndex], imageX, imageY, images[sectionIndex].width / 3, images[sectionIndex].height / 3);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, sectionHeight * sectionIndex);
    ctx.lineTo(lineWidth, sectionHeight * sectionIndex); 
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, sectionHeight * (sectionIndex + 1));
    ctx.lineTo(lineWidth, sectionHeight * (sectionIndex + 1)); 
    ctx.stroke();

    drawTitle(artworkTitles[sectionIndex], canvas.width * (1/8), sectionHeight * sectionIndex + sectionHeight / 2); 
}

function drawTitle(title, x, y) {
    ctx.fillStyle = 'white';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left'; 
    ctx.textBaseline = 'middle';
    ctx.fillText(title, x, y);
}

function updateDescription(mouseY) {
    let sectionHeight = canvas.height / 6;
    descriptionContainer.textContent = artworkDescriptions[sectionIndex];
}

canvas.addEventListener('click', function(event) {
    let sectionHeight = canvas.height / 6;
    switch (sectionIndex) {
        case 0:
            window.location.href = 'analog.html'; //analog gallery
            break;
        case 1:
            window.location.href = 'digital.html'; //digital gallery
            break;
        case 2:
            window.location.href = 'sittingaround.html'; //sitting around 
            break;
        case 3:
            window.location.href = 'https://www.instagram.com/p/CMlKcMFsojV/?img_index=1"'; //spaces 
            break;
        case 4:
            window.location.href = 'richmond.html'; //random house richmond 
            break;
        case 5:
            window.location.href = 'gsd.html'; //washington dc go skate day 
            break;
        // case 6:
        //     window.location.href = 'https://vimeo.com/714792551'; 
        //     break;
        // case 7:
        //     window.location.href = 'https://youtu.be/xE4rFLZCWV4'; 
        //     break;
        // case 8:
        //     window.location.href = 'public/comingsoon.html'; 
        //     break;
        default:
            break;
    }
});


