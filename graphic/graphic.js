const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const images = [];
const sectionImages = [
    'images/patterns.png',
    'images/clara.png',
    'images/ratp.png',
    'images/posters.png',
    'images/3d.png',
    'images/databending.png',
    'images/wnyu.png',
];

const artworkTitles = [
    "Patterns",
    "Clara y Oscura",
    "RATP Guide",
    "Posters",
    "3D",
    "Databending",
    "WNYU",
];

const artworkDescriptions = [
    "Pattern book. Designs based on microbiology of Indian plants.",
    "Graffiti Zine featuring Cuban graffiti writers TAIKO and LOU.",
    "Transit Zine. Guide to evading the fare successfully on the Paris subway.",
    "Various poster designs for shows and events.",
    "3D Modeling works. Blender.",
    "Experiments in bending data between audio and visual. Audacity effects applied to RAW images.",
    "Design work for WNYU 89.1 FM Radio.",
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

    let sectionHeight = canvas.height / 7;
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

    let sectionHeight = canvas.height / 7;
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
    let sectionHeight = canvas.height / 7;
    descriptionContainer.textContent = artworkDescriptions[sectionIndex];
}

canvas.addEventListener('click', function(event) {
    let sectionHeight = canvas.height / 7;
    switch (sectionIndex) {
        case 0:
            window.location.href = 'patterns.html'; //slowsports
            break;
        case 1:
            window.location.href = 'https://indd.adobe.com/view/74fea5d9-0880-4589-b011-a401a8e9a1eb'; //lecons 
            break;
        case 2:
            window.location.href = 'ratp.html'; //gritos 
            break;
        case 3:
            window.location.href = 'posters.html'; //woking
            break;
        case 4:
            window.location.href = '3d.html'; //bathtime 
            break;
        case 5:
            window.location.href = 'databending.html'; //eser
            break;
        case 6:
            window.location.href = 'wnyu.html'; //scary larry
        //     break;
        // case 7:
        //     window.location.href = 'https://youtu.be/xE4rFLZCWV4'; //salon
        //     break;
        // case 8:
        //     window.location.href = 'public/comingsoon.html'; //other 
        //     break;
        default:
            break;
    }
});


