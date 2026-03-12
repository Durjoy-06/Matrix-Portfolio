// Enhanced Matrix Digital Rain
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]';
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
const speeds = [];

for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100; // Randomize start positions
    speeds[i] = Math.random() * 0.5 + 0.5; // Varied falling speeds
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Slightly more trail
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // Depth simulation with opacity and color variation
        const opacity = Math.random();
        ctx.fillStyle = `rgba(0, 255, 65, ${opacity > 0.8 ? 1 : 0.35})`;
        
        // Glowing lead character
        if (Math.random() > 0.95) {
            ctx.fillStyle = '#FFFFFF';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00FF41';
        } else {
            ctx.shadowBlur = 0;
        }

        ctx.font = fontSize + 'px monospace';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i] += speeds[i];
    }
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Typewriter Effect for Hero
const typewriterElement = document.getElementById('typewriter');
const roles = ["Aspiring ML Engineer", "Computer Science Student", "Software Developer", "Problem Solver"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

document_addEventListener('DOMContentLoaded', () => {
    type();
    rapidBoot();
    
    // Initialize Name Scrambler
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const scrambler = new TextScrambler(heroName);
        scrambler.setText(heroName.getAttribute('data-text'));
        
        // Add hover effect
        heroName.addEventListener('mouseenter', () => {
            scrambler.setText(heroName.getAttribute('data-text'));
        });
    }
});

// Text Scrambler Effect
class TextScrambler {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Immersive Boot Logic
const bootLogs = document.getElementById('boot-logs');
const logStatements = [
    "LOADING CORE MODULES...",
    "ACCESS DESPOTIC OVERRIDE...",
    "DECRYPTING IDENTITY_FILE...",
    "BYPASSING SECURITY FIREWALL...",
    "INITIALIZING HUD...",
    "DURJOY_BANIK_OS LOADED",
    "STATUS: ACCESS_GRANTED"
];

async function rapidBoot() {
    const statusBox = document.getElementById('boot-status');
    if (!statusBox) return;
    statusBox.style.display = 'block';
    
    for (let i = 0; i < 50; i++) {
        let p = document.createElement('div');
        p.textContent = `HEX_${Math.random().toString(16).slice(2, 10)} : ${Math.random() > 0.5 ? 'SUCCESS' : 'RUNNING'}`;
        bootLogs.prepend(p);
        await new Promise(r => setTimeout(r, 15));
    }
    
    for (let statement of logStatements) {
        let p = document.createElement('div');
        p.textContent = `> ${statement}`;
        p.style.color = '#00FF41';
        bootLogs.prepend(p);
        await new Promise(r => setTimeout(r, 150));
    }
    
    setTimeout(() => {
        statusBox.style.opacity = '0';
        setTimeout(() => statusBox.style.display = 'none', 1000);
    }, 3000);
}

// Terminal Nav Command Feedback
const activeCommand = document.getElementById('active-command');
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        activeCommand.textContent = link.getAttribute('data-cmd');
    });
    link.addEventListener('mouseleave', () => {
        activeCommand.textContent = 'ACCESS_GRANTED';
    });
});

// Scroll to section helper
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Intersection Observer for Section Headings
const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const heading = entry.target.querySelector('.section-title');
            if (heading && !heading.classList.contains('animated')) {
                heading.classList.add('animated');
                const scrambler = new TextScrambler(heading);
                scrambler.setText(heading.getAttribute('data-text') || heading.innerText);
            }
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.hud-panel').forEach(panel => headingObserver.observe(panel));

// Skill tiles hover sound simulation
document.querySelectorAll('.skill-tile').forEach(tile => {
    tile.addEventListener('mouseenter', () => {
        // Visual feedback for "accessing" data
        activeCommand.textContent = `LOAD_${tile.getAttribute('data-skill').toUpperCase().replace(' ', '_')}`;
    });
    tile.addEventListener('mouseleave', () => {
        activeCommand.textContent = 'ACCESS_GRANTED';
    });
});
