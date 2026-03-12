// Matrix Digital Rain
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]';
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00FF41';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
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

// Skill bars animation on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.progress').forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => { bar.style.width = width; }, 100);
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('#skills').forEach(section => observer.observe(section));
