// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(147, 197, 253, 0.15) 100%)';
        navbar.style.backdropFilter = 'blur(25px)';
        navbar.style.boxShadow = '0 8px 40px rgba(37, 99, 235, 0.3)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(147, 197, 253, 0.1) 100%)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 4px 30px rgba(37, 99, 235, 0.2)';
    }
});

// Skills progress bars animation
const animateSkills = () => {
    const skillsSection = document.querySelector('#skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach((bar, index) => {
                    const width = bar.getAttribute('data-width');
                    // Stagger animation for each skill bar
                    setTimeout(() => {
                        bar.style.width = width;
                        bar.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
                        bar.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });
    
    if (skillsSection) observer.observe(skillsSection);
};

// Initialize skills animation
animateSkills();

// Typing effect for hero section with biotechnology flair
const typeWriter = (element, text, speed = 80) => {
    let i = 0;
    element.innerHTML = '';
    element.style.borderRight = '2px solid #3b82f6';
    element.style.animation = 'blink 1s infinite';
    
    // Add blinking cursor animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { border-color: #3b82f6; }
            51%, 100% { border-color: transparent; }
        }
    `;
    document.head.appendChild(style);
    
    function type() {
        if (i < text.length) {
            const char = text.charAt(i);
            element.innerHTML += char;
            
            // Add slight pause for punctuation (more dramatic effect)
            const delay = char.match(/[.!?]/) ? speed * 3 : speed;
            i++;
            setTimeout(type, delay);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                element.style.borderRight = 'none';
                element.style.animation = 'none';
            }, 2000);
        }
    }
    type();
};

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        // Delay typing effect for better impact
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 60);
        }, 800);
    }
    
    // Also add typing to hero subtitle if exists
    const heroSubtitle = document.querySelector('.hero-content p');
    if (heroSubtitle) {
        const subtitleText = heroSubtitle.innerHTML;
        heroSubtitle.style.opacity = '0';
        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transition = 'opacity 1s ease';
        }, 3000);
    }
});

// Fade in animation on scroll
const observeElements = () => {
    const elements = document.querySelectorAll('.timeline-item, .experience-card, .project-card, .hobby-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Initialize fade in animations
observeElements();

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
        
        // In a real application, you would send this data to a server
        // Example using fetch:
        /*
        fetch('/submit-contact', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert('Message sent successfully!');
            contactForm.reset();
        })
        .catch(error => {
            alert('Error sending message. Please try again.');
        });
        */
    });
}

// Scroll to top functionality
const createScrollTopButton = () => {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #2563eb;
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        font-size: 18px;
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Initialize scroll to top button
createScrollTopButton();

// Preloader
const createPreloader = () => {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.3s ease;
    `;
    
    preloader.innerHTML = `
        <div style="
            width: 50px;
            height: 50px;
            border: 5px solid #e5e7eb;
            border-top: 5px solid #2563eb;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
    `;
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(preloader);
    
    // Hide preloader when page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 300);
        }, 500);
    });
};

// Initialize preloader
createPreloader();

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Counter animation for statistics
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.innerText.replace('+', ''));
                const increment = target / speed;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.innerText = Math.ceil(current) + '+';
                        setTimeout(updateCounter, 1);
                    } else {
                        counter.innerText = target + '+';
                    }
                };
                
                updateCounter();
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
};

// Initialize counter animations
animateCounters();

// Add smooth reveal animations
const revealElements = () => {
    const reveals = document.querySelectorAll('.about-content, .section-header');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    reveals.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
};

// Initialize reveal animations
revealElements();

// ========== MODERN ENHANCEMENTS ==========

// Particle animation for hero section
const createParticles = () => {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    hero.style.position = 'relative';
    hero.appendChild(particlesContainer);
    
    // Create floating particles (DNA-like for biotech theme)
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 3}px;
            height: ${Math.random() * 6 + 3}px;
            background: rgba(59, 130, 246, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: bioFloat ${4 + Math.random() * 6}s infinite ease-in-out;
            animation-delay: ${Math.random() * 4}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bioFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
            25% { transform: translateY(-20px) rotate(90deg); opacity: 0.6; }
            50% { transform: translateY(-10px) rotate(180deg); opacity: 0.8; }
            75% { transform: translateY(-30px) rotate(270deg); opacity: 0.6; }
        }
    `;
    document.head.appendChild(style);
};

// Enhanced project interactions
const enhanceProjects = () => {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach((project, index) => {
        // Add biotechnology icons based on project type
        const biotechIcons = ['🧬', '🔬', '⚗️', '🧪', '🦠', '💊'];
        const icon = biotechIcons[index % biotechIcons.length];
        
        // Add icon to project
        const iconElement = document.createElement('div');
        iconElement.innerHTML = icon;
        iconElement.style.cssText = `
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 24px;
            opacity: 0.7;
            z-index: 2;
        `;
        project.style.position = 'relative';
        project.appendChild(iconElement);
        
        // Enhanced hover effects
        project.addEventListener('mouseenter', () => {
            project.style.transform = 'translateY(-8px) scale(1.02)';
            project.style.boxShadow = '0 25px 50px rgba(59, 130, 246, 0.2)';
            iconElement.style.transform = 'rotate(360deg)';
            iconElement.style.transition = 'transform 0.5s ease';
        });
        
        project.addEventListener('mouseleave', () => {
            project.style.transform = 'translateY(0) scale(1)';
            project.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            iconElement.style.transform = 'rotate(0deg)';
        });
    });
};

// Enhanced form validation with biotech theme
const enhanceContactForm = () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', () => {
            input.style.borderColor = '#3b82f6';
            input.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
            input.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', () => {
            input.style.borderColor = 'rgba(59, 130, 246, 0.3)';
            input.style.boxShadow = 'none';
            input.style.transform = 'scale(1)';
        });
        
        // Real-time validation
        input.addEventListener('input', () => {
            validateField(input);
        });
    });
};

// Real-time field validation
const validateField = (field) => {
    const value = field.value.trim();
    let isValid = true;
    
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    } else if (field.hasAttribute('required')) {
        isValid = value.length > 0;
    }
    
    if (isValid) {
        field.style.borderColor = '#10b981';
        field.style.background = 'rgba(16, 185, 129, 0.1)';
    } else {
        field.style.borderColor = '#ef4444';
        field.style.background = 'rgba(239, 68, 68, 0.1)';
    }
};

// Smooth section transitions
const addSectionTransitions = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        // Add initial state
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Staggered animation
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
};

// Initialize all modern enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for other scripts to load
    setTimeout(() => {
        createParticles();
        enhanceProjects();
        enhanceContactForm();
        addSectionTransitions();
    }, 500);
});

// Add loading performance optimization
const optimizePerformance = () => {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Initialize performance optimizations
optimizePerformance();