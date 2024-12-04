const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

// Resize canvas to full window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = 'rgba(128, 128, 128, 0.5)'; // Soft gray with transparency
    }

    update(mouseX, mouseY) {
        // Mouse interaction
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            this.x -= dx * 0.03;
            this.y -= dy * 0.03;
        }

        // Movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges with some randomness
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Particle system
let particles = [];
const particleCount = 75;

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(
            Math.random() * canvas.width, 
            Math.random() * canvas.height
        ));
    }
}

// Mouse tracking
let mouseX = 0, mouseY = 0;
window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update(mouseX, mouseY);
        particle.draw();
    });

    requestAnimationFrame(animate);
}

// Initialize and start
initParticles();
animate();