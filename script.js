// Scroll Progress Indicator
const scrollProgress = document.getElementById('scrollProgress');
const progressFill = document.getElementById('progressFill');

window.addEventListener('scroll', () => {
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY;
    const scrollPercentage = (scrollTop / documentHeight) * 100;

    progressFill.style.width = `${scrollPercentage}%`;
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark-theme');

    // Save theme preference
    const isDark = html.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDark);

    // Update icon
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
});

// Load saved theme preference
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme === 'true') {
        html.classList.add('dark-theme');
        themeIcon.className = 'fas fa-sun';
    }
});

// Interactive Particle Effects
const heroSection = document.querySelector('.hero');

heroSection.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.particle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    particles.forEach((particle, index) => {
        const offsetX = (mouseX - 0.5) * 30;
        const offsetY = (mouseY - 0.5) * 30;
        const delay = index * 0.1;

        particle.style.transform = `translate(${offsetX + delay}px, ${offsetY + delay}px)`;
    });
});

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
    
    lastScroll = currentScroll;
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function activateNavOnScroll() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active-nav');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active-nav');
        }
    });
}

window.addEventListener('scroll', activateNavOnScroll);

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .project-card, .education-item, .experience-item, .cert-item, .achievement-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Dynamic Year in Footer
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer p');
if (footerYear) {
    footerYear.textContent = footerYear.textContent.replace('2025', currentYear);
}

// Typing Effect for Hero Subtitle (Optional Enhancement)
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
    const originalText = subtitle.textContent;
    subtitle.textContent = '|';
    let i = 0;

    function typeWriter() {
        if (i < originalText.length) {
            subtitle.textContent = originalText.slice(0, i + 1) + '|';
            i++;
            setTimeout(typeWriter, 50);
        } else {
            // Remove cursor after completion
            setTimeout(() => {
                subtitle.textContent = originalText;
            }, 1000);
        }
    }

    // Start typing effect when hero animation class is added
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if (document.querySelector('.hero').classList.contains('animate-hero')) {
                    setTimeout(typeWriter, 800);
                    observer.disconnect(); // Stop observing once animation starts
                }
            }
        });
    });

    observer.observe(document.querySelector('.hero'), {
        attributes: true,
        attributeFilter: ['class']
    });

    // Fallback timeout in case animation class is already added
    setTimeout(() => {
        if (!subtitle.textContent.includes(originalText)) {
            typeWriter();
        }
    }, 2000);
}

// Add hover effect to skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Project cards tilt effect on mouse move
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Smooth reveal for section titles
const sectionTitles = document.querySelectorAll('.section-title');
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.5 });

sectionTitles.forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)';
    title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    titleObserver.observe(title);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

/* Animate Progress Bars on Scroll */
const progressBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate linear progress bars
            const progressFills = entry.target.querySelectorAll('.progress-fill');
            progressFills.forEach(fill => {
                const skillText = fill.parentElement.previousElementSibling;
                const proficiencyElement = skillText.querySelector('.proficiency');

                if (proficiencyElement) {
                    const percentageText = proficiencyElement.textContent.match(/\d+/);
                    if (percentageText) {
                        const percentage = percentageText[0] + '%';
                        fill.style.width = percentage;
                    }
                }
            });
        }
    });
}, { threshold: 0.5 });

// Observe skill clusters for progress bar animation
document.querySelectorAll('.skill-cluster').forEach(cluster => {
    progressBarObserver.observe(cluster);
});

// Observe skill cards for animation (controlling progress bar animation)
const skillProgressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillFills = entry.target.querySelectorAll('.skill-fill');
            skillFills.forEach(fill => {
                const dataWidth = fill.getAttribute('data-width');
                if (dataWidth) {
                    fill.style.width = dataWidth;
                }
            });
        }
    });
}, { threshold: 0.5 });

// Add hover effect to profile navigation
document.querySelector('.nav-profile')?.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
});

document.querySelector('.nav-profile')?.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

// Profile photo upload functionality - nav version only
const navProfileImage = document.querySelector('.nav-profile-image');
const navProfilePic = document.getElementById('nav-profile-pic');

// Profile Modal functionality
const profileModal = document.getElementById('profile-modal');
const modalProfileImage = document.getElementById('modal-profile-image');
const modalClose = document.getElementById('modal-close');

// File input for profile photo upload
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';
fileInput.style.display = 'none';
document.body.appendChild(fileInput);

// Profile photo upload event listener
navProfileImage?.addEventListener('click', () => {
    fileInput.click();
});

// Handle file selection
fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Update profile photo
            if (navProfilePic) navProfilePic.src = e.target.result;
            if (modalProfileImage) modalProfileImage.src = e.target.result;
            // Store in localStorage for persistence
            localStorage.setItem('profilePhoto', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Open modal on profile image click
navProfileImage?.addEventListener('click', function(e) {
    // Prevent triggering file input when clicking to view
    e.stopPropagation();
    openProfileModal();
});

// Function to open profile modal
function openProfileModal() {
    if (profileModal && modalProfileImage && navProfilePic) {
        modalProfileImage.src = navProfilePic.src;
        profileModal.classList.add('active');
    }
}

// Close modal when clicking the close button
modalClose?.addEventListener('click', function() {
    if (profileModal) {
        profileModal.classList.remove('active');
    }
});

// Close modal when clicking outside the image
profileModal?.addEventListener('click', function(e) {
    if (e.target === profileModal) {
        profileModal.classList.remove('active');
    }
});

// Load stored profile photo on page load
window.addEventListener('load', function() {
    const storedPhoto = localStorage.getItem('profilePhoto');
    if (storedPhoto) {
        if (navProfilePic) navProfilePic.src = storedPhoto;
        if (modalProfileImage) modalProfileImage.src = storedPhoto;
    } else {
        // Fallback to default image or show placeholder
        console.log('No stored profile photo found. Using default placeholder.');
    }

    // Add animation-triggering class to hero section after page load
    const hero = document.querySelector('.hero');
    setTimeout(() => {
        if (hero) hero.classList.add('animate-hero');
    }, 500);
});

    // Get In Touch Title Click to Open Profile Modal
    const getInTouchTitle = document.getElementById('getInTouchTitle');

    getInTouchTitle.addEventListener('click', () => {
        openProfileModal();
    });

    // Enhanced Mail Client Function
    function openMailClient() {
        // Try to open default mail client
        const mailto = 'mailto:yaswanthgude565@gmail.com?subject=Get In Touch&body=Hi Yaswanth,%0A%0A[Please write your message here]%0A%0ABest regards,%0A[Your Name]';
        window.location.href = mailto;

        // Show success feedback
        showNotification('Opening your default email client...', 'success');
    }

    // Notification System for Mail Click
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;

        // Add notification styles directly
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '1rem 1.5rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            zIndex: '9999',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            fontSize: '0.9rem',
            fontWeight: '500',
            color: 'var(--text-color)',
            opacity: '0',
            transform: 'translateY(-100%)',
            transition: 'all 0.3s ease'
        });

        // Apply theme-specific colors
        if (document.documentElement.classList.contains('dark-theme')) {
            notification.style.background = 'rgba(30, 41, 59, 0.95)';
            notification.style.border = '1px solid rgba(51, 65, 85, 0.3)';
        }

        // Add to body
        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Console message for developers
    console.log('%c👋 Hello Developer!', 'font-size: 20px; color: #6366f1; font-weight: bold;');
    console.log('%cThis portfolio was built by Gude Yaswanth', 'font-size: 14px; color: #8b5cf6;');
    console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 12px; color: #6b7280;');
