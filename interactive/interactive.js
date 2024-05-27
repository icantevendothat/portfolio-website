const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const images = [];
const sectionImages = [
    'images/inmate.png',
    'images/lou.png',
    'images/ineinander.png',
    'images/blackhair.png',
    'images/negative.png',
    'images/ispy.png',
    'images/tugofwar.png',
    'images/Screen Shot 2024-04-25 at 6.07.23 PM.png',
    'images/IMG_5747 3.JPG'
];

const artworkTitles = [
    "Inmate Star Chart",
    "LOU",
    "Ineinander",
    "Black Hair",
    "Negative Box",
    "ai-Spy",
    "Tug of War",
    "Skimmer",
    "Terminal Pursuit"
];

const artworkDescriptions = [
    "Interactive webpage concerning mass incarceration in the United States through the lens of New York City.",
    "Interactive installation created in MaxMSP. Portrait of Cuban graffiti writer 'LOU'. An invitation to listen.",
    "Public art installation/performace. An exploration of permeability and one another.",
    "Public art installation. 6 Sculptures and an audio-guided walking tour of New York City.",
    "A music box using color-light sensors. Turns film negatives into music.",
    "Multi-player web app using ML5. Play i-Spy against a computer, or cheat!",
    "Multi-player online web app. Play tug of war against another user in real time.",
    "Headpiece for performance that allows performer to manipulate vocals in real time. Arduino.",
    "Interactive installation about data privacy and the OMNY system in New York City"
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
    ctx.font = '14px Arial';
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
    let sectionHeight = canvas.height / 9;
    descriptionContainer.textContent = artworkDescriptions[sectionIndex];
}

canvas.addEventListener('click', function(event) {
    let sectionHeight = canvas.height / 9;
    switch (sectionIndex) {
        case 0:
            window.location.href = 'https://icantevendothat.github.io/Inmate-Star-Chart/proj-1/index.html'; //inmate
            break;
        case 1:
            window.location.href = 'https://youtu.be/uK3027C9XuQ'; //lou
            break;
        case 2:
            window.location.href = 'ineinander.html'; //ineinander 
            break;
        case 3:
            window.location.href = 'blackhair.html'; //my long black hair
            break;
        case 4:
            window.location.href = 'negativebox.html'; //negative box
            break;
        case 5:
            window.location.href = 'https://destiny-repeated-titanoceratops.glitch.me/'; //i-spy
            break;
        case 6:
            window.location.href = 'https://sour-extreme-note.glitch.me/'; //tug of war
            break;
        case 7:
            window.location.href = 'headpiece.html'; //mouse wedding 
            break;
        case 8:
            window.location.href = 'terminal.html'; //other 
            break;
        default:
            break;
    }
});


