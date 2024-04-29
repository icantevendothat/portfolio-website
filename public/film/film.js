const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const images = [];
const sectionImages = [
    'images/slowsports.png',
    'images/lecons.png',
    'images/gritos.png',
    'images/woking.png',
    'images/bathtime.png',
    'images/eser.png',
    'images/larry.png',
    'images/salon.png',
    'images/other.png'
];

const artworkTitles = [
    "Slowsports, 2023",
    "Leçons, 2022",
    "Gritos, 2022",
    "Woking, 2022",
    "The Bathtime Sessions, 2022",
    "ESER, 2021",
    "Scary Larry, 2021",
    "The Salon, 2019",
    "Other"
];

const artworkDescriptions = [
    "NYU Thesis Film for Advanced Experimental, Shot on 16mm in 2023. Coming in 2024.",
    "NYU Intermediate Experimental. Filmed in Paris, France. Summer 2022.",
    "Archival film shot on MiniDV. Audioreactive abstractions created in MaxMSP. 2022.",
    "Minidoc about focus and multitasking. Created for NYU Sight and Sound 2022",
    "Ongoing video series featuring independent artists in NYC and their bathrooms. Created in collaboration with Andrea Cacho.",
    "Minifeature on Puerto Rican graffiti writer 'eser'. 2021.",
    "Motion exercise featuring Larry Gu. 2021.",
    "Multi-episodic documentary exploring the genetrification of Washington DC and it's affect on Black hair culture. Created for the Smithsonian Hirshhorn, 2019.",
    "Other Works"
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

    let sectionHeight = canvas.height / 9;
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
    ctx.font = '14px Times';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(description, x, y);
}

function draw(mouseX, mouseY) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let sectionHeight = canvas.height / 9;
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
    let sectionHeight = canvas.height / 9;
    descriptionContainer.textContent = artworkDescriptions[sectionIndex];
}

canvas.addEventListener('click', function(event) {
    let sectionHeight = canvas.height / 9;
    switch (sectionIndex) {
        case 0:
            window.location.href = 'comingsoon.html'; //slowsports
            break;
        case 1:
            window.location.href = 'https://youtu.be/ZMbzYOq9LtM'; //lecons 
            break;
        case 2:
            window.location.href = 'https://youtu.be/U2rUisajSQA'; //gritos 
            break;
        case 3:
            window.location.href = 'https://youtu.be/TmSeW9Sx_vc'; //woking
            break;
        case 4:
            window.location.href = 'https://www.youtube.com/@thebathtimesessions1998'; //bathtime 
            break;
        case 5:
            window.location.href = 'https://vimeo.com/714795624'; //eser
            break;
        case 6:
            window.location.href = 'https://vimeo.com/714792551'; //scary larry
            break;
        case 7:
            window.location.href = 'https://youtu.be/xE4rFLZCWV4'; //salon
            break;
        case 8:
            window.location.href = 'public/comingsoon.html'; //other 
            break;
        default:
            break;
    }
});


