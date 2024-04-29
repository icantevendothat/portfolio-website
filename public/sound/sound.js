const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const images = [];
const sectionImages = [
    'images/saxophone.png',
    'images/limerence.png',
    'images/inthrees.png',
    'images/music.png',
    'images/actinghuman.png',
    'images/mareas.png',
    'images/heavensgatetitle.png',
    'images/lecons.png',
];

const artworkTitles = [
    "Brothers",
    "Limerence",
    "In Threes",
    "Music",
    "Acting Human",
    "Mareas a la Deriva",
    "Heaven's Gate",
    "Personals",
];


const artworkDescriptions = [
    "Sound design for Roy Nathanson's one man play, 'Brothers'. 2023.",
    "Sound design for Irmak Akgur's short film, 'Limerence', 2022.",
    "Sound design and mix for Nico Love's thesis film, 'In Threes', 2023.",
    "Musical releases.",
    "Dialogue editor for 'Acting Human' TV Pilot. 2023.",
    "Sound design and mix for Camila Rodriguez-Lopez's thesis film, 'Mareas a la Deriva. 2024.",
    "Live performance with Jaiden McCrann. Touch designer and Ableton Live, 2024.",
    "Sound design for self-directed projects.",
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

    let sectionHeight = canvas.height / 8;
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

    let sectionHeight = canvas.height / 8;
    let lineWidth = canvas.width * (5/6); 
    let descriptionX = canvas.width * (5/6) + 10; 

    let imageX = (canvas.width - images[sectionIndex].width / 2) / 2;
    let imageY = (canvas.height - images[sectionIndex].height / 1.7) / 2;

    ctx.drawImage(images[sectionIndex], imageX, imageY, images[sectionIndex].width / 2, images[sectionIndex].height / 2);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;

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
    ctx.font = '20px Arial';
    ctx.textAlign = 'left'; 
    ctx.textBaseline = 'middle';
    ctx.fillText(title, x, y);
}

function updateDescription(mouseY) {
    let sectionHeight = canvas.height / 8;
    descriptionContainer.textContent = artworkDescriptions[sectionIndex];
}

canvas.addEventListener('click', function(event) {
    let sectionHeight = canvas.height / 8;
    switch (sectionIndex) {
        case 0:
            window.location.href = 'https://youtu.be/GVqdCWggNa4'; //brothers
            break;
        case 1:
            window.location.href = 'https://www.nobudge.com/most-viewed-2024/videos/limerence'; //limerence
            break;
        case 2:
            window.location.href = 'https://vimeo.com/867368348'; //in threes
            break;
        case 3:
            window.location.href = 'https://soundcloud.com/doliprane1000/my-clock?si=d190347d3c6a4a70bc9d6c4342bdfb7e&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'; //soundcloud
            break;
        case 4:
            window.location.href = 'https://www.youtube.com/watch?v=9rmyxcL0BDM'; //acting human
            break;
        case 5:
            window.location.href = 'https://www.instagram.com/mareasaladeriva/'; //mareas
            break;
        case 6:
            window.location.href = 'heavensgate.html'; //heaven's gate
            break;
        case 7:
            window.location.href = '/public/film/film.html'; //personals
            break;
        // case 8:
        //     window.location.href = 'public/comingsoon.html'; //other 
            // break;
        default:
            break;
    }
});


