function generateHue(time) {
    return (time / 50) % 360;
}

function updateBackground() {
    const hue = generateHue(Date.now());
    document.body.style.backgroundColor = `hsl(${hue}, 50%, 15%)`;
    requestAnimationFrame(updateBackground);
}

const NANCY_BIRTHDAY = {
    year: 2006,  // Nancy's birth year
    month: new Date().getMonth(),
    day: new Date().getDate()
};

function calculateAge() {
    const today = new Date();
    const birthDate = new Date(NANCY_BIRTHDAY.year, NANCY_BIRTHDAY.month, NANCY_BIRTHDAY.day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function isBirthday() {
    const today = new Date();
    return today.getMonth() === NANCY_BIRTHDAY.month && 
           today.getDate() === NANCY_BIRTHDAY.day;
}

function updateBirthdayMessage() {
    const birthdayText = document.querySelector('.birthday-text');
    const wishes = document.querySelector('.wishes');
    const age = calculateAge();
    
    if (isBirthday()) {
        birthdayText.textContent = `Happy ${age}th Birthday Nancy!`;
        wishes.innerHTML = `
            <p>Wishing you a day filled with joy and laughter!</p>
            <p>May all your dreams come true.</p>
            <p>🎉 Have a wonderful year ahead! 🎈</p>
        `;
    } else {
        birthdayText.textContent = `Nancy's ${age}th Birthday in Memory`;
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
    const date = document.getElementById('date');
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
    date.textContent = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
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

function initAnimations() {
    const elements = document.querySelectorAll('.birthday-text, .wishes p, #clock, #date, .star');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 15 + 10; // Medium size
        this.speed = Math.random() * 0.5 + 0.2; // Much slower speed
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
        
        // Add glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        
        // Draw star with gradient
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        gradient.addColorStop(0, '#FFFFFF');
        gradient.addColorStop(1, this.color);
        ctx.fillStyle = gradient;
        
        // Draw star shape
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
        ctx.fill();
        ctx.restore();
    }
}

class Love {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 20 + 15;
        this.speed = Math.random() * 0.4 + 0.1; // Much slower speed
        this.wobble = Math.random() * Math.PI * 2;
        this.emoji = ['❤️', '💖', '💝', '💕', '💗', '🎈', '🎈', '🎉', '🎊'][Math.floor(Math.random() * 9)];
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    draw() {
        ctx.save();
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.font = `${this.size}px Arial`;
        ctx.fillText(this.emoji, this.x, this.y);
        ctx.restore();
    }
}

// Increase number of falling elements
const loveEmojis = Array(25).fill(null).map(() => new Love());

class BurstParticle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 2;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 6 - 3;
        this.color = color;
        this.alpha = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.02;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class InteractiveBalloon {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -50;
        this.size = Math.random() * 60 + 50; // Increased size
        this.speed = Math.random() * 0.3 + 0.1; // Slower fall
        this.emoji = ['🎈', '🎈', '🎈', '🎊', '🎉'][Math.floor(Math.random() * 5)];
        this.bursting = false;
        this.particles = [];
        this.colors = ['#FF0000', '#FF69B4', '#FFB6C1', '#FF1493', '#FFA500']; // Brighter colors
        this.wobble = 0;
    }

    burst() {
        this.bursting = true;
        for (let i = 0; i < 20; i++) {
            this.particles.push(new BurstParticle(
                this.x, 
                this.y, 
                this.colors[Math.floor(Math.random() * this.colors.length)]
            ));
        }
    }

    update() {
        if (!this.bursting) {
            this.y += this.speed;
            this.wobble += 0.02;
            this.x += Math.sin(this.wobble) * 0.5; // Add gentle wobble
            if (this.y > canvas.height + 50) {
                this.reset();
            }
        } else {
            this.particles.forEach((p, i) => {
                p.update();
                if (p.alpha <= 0) {
                    this.particles.splice(i, 1);
                }
            });
            if (this.particles.length === 0) {
                this.reset();
            }
        }
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -50;
        this.bursting = false;
        this.particles = [];
    }

    draw() {
        if (!this.bursting) {
            ctx.save();
            ctx.font = `${this.size}px Arial`;
            ctx.textAlign = 'center';
            ctx.shadowColor = 'rgba(255,255,255,0.5)';
            ctx.shadowBlur = 15;
            ctx.fillText(this.emoji, this.x, this.y);
            ctx.restore();
        }
        this.particles.forEach(p => p.draw());
    }
}

// Create more balloons
const interactiveBalloons = Array(15).fill(null).map(() => new InteractiveBalloon());

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    interactiveBalloons.forEach(balloon => {
        if (!balloon.bursting) {
            const dx = balloon.x - x;
            const dy = balloon.y - y;
            if (Math.sqrt(dx * dx + dy * dy) < balloon.size) {
                balloon.burst();
            }
        }
    });
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    loveEmojis.forEach(love => {
        love.update();
        love.draw();
    });
    interactiveBalloons.forEach(balloon => {
        balloon.update();
        balloon.draw();
    });
    requestAnimationFrame(animate);
}

// Initialize animations on page load
window.addEventListener('load', () => {
    initAnimations();
    animate();
    updateBackground();
    setInterval(updateClock, 1000);
});
