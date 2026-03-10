// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards and video cards
document.querySelectorAll('.feature-card, .video-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observe all text elements (headings, paragraphs, list items)
document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, .section-title, .stat-number').forEach((element, index) => {
    if (!element.closest('.hero')) { // Skip hero elements as they already have animations
        element.style.opacity = '0';
        element.style.willChange = 'opacity, transform';
        const animationIndex = index % 3;
        let animation = 'fadeInText';
        if (animationIndex === 1) animation = 'slideInLeft';
        if (animationIndex === 2) animation = 'slideInRight';
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = `${animation} 0.8s ease forwards`;
                    entry.target.style.animationDelay = `${(index % 5) * 0.1}s`;
                    animationObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        animationObserver.observe(element);
    }
});

// Button click handlers
const joinButtons = document.querySelectorAll('.btn-primary, .btn-join');
joinButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('Join button clicked');
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(44, 47, 51, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(44, 47, 51, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
});

// Parallax effect for hero
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
});

// Stats counter animation
const statsSection = document.querySelector('.stats');
let statsAnimated = false;

const animateStats = () => {
    if (statsAnimated) return;
    
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = finalValue / 30;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                stat.textContent = stat.textContent.replace(/\d+/, finalValue);
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(currentValue) + (stat.textContent.includes('+') ? '+' : '');
            }
        }, 50);
    });
    
    statsAnimated = true;
};

const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            animateStats();
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Add scroll-to-top button functionality
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        // You can add a scroll-to-top button here if desired
    }
});

console.log('Discord Community Website loaded successfully!');
