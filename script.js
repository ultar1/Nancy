function generateHue(time) {
    return (time / 50) % 360;
}

function updateBackground() {
    const hue = generateHue(Date.now());
    document.body.style.backgroundColor = `hsl(${hue}, 50%, 15%)`;
    requestAnimationFrame(updateBackground);
}

const NANCY_BIRTHDAY = {
    month: new Date().getMonth(), // Set the correct month (0-11)
    day: new Date().getDate()     // Set the correct day (1-31)
};

function isBirthday() {
    const today = new Date();
    return today.getMonth() === NANCY_BIRTHDAY.month && 
           today.getDate() === NANCY_BIRTHDAY.day;
}

function updateBirthdayMessage() {
    const birthdayText = document.querySelector('.birthday-text');
    const wishes = document.querySelector('.wishes');
    
    if (isBirthday()) {
        birthdayText.textContent = "Happy Birthday Nancy!";
        wishes.innerHTML = `
            <p>Wishing you a day filled with joy and laughter!</p>
            <p>May all your dreams come true.</p>
            <p>🎉 Have a wonderful year ahead! 🎈</p>
        `;
    } else {
        birthdayText.textContent = "Nancy's Birthday in Memory";
        wishes.innerHTML = `
            <p>Hope your birthday was amazing!</p>
            <p>Looking forward to celebrating again next year!</p>
            <p>🎉 Keep shining bright! 🌟</p>
        `;
    }
}

const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Update clock
function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
}

// Add this line before the animation starts
updateBirthdayMessage();
updateBackground();

// Start animations
updateBackground();
setInterval(updateClock, 1000);

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const colors = [
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
    '#FFFF00'  // Yellow
];

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 15 + 10; // Medium size
        this.speed = Math.random() * 2 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 2 - 1;
    }

    update() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;
        if (this.y > canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            ctx.lineTo(
                Math.cos((18 + i * 72) * Math.PI / 180) * this.size,
                Math.sin((18 + i * 72) * Math.PI / 180) * this.size
            );
            ctx.lineTo(
                Math.cos((54 + i * 72) * Math.PI / 180) * (this.size/2),
                Math.sin((54 + i * 72) * Math.PI / 180) * (this.size/2)
            );
        }
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}

const stars = Array(30).fill(null).map(() => new Star());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}

animate();
