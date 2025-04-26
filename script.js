// Portfolio JavaScript - Enhanced Interactivity and Animations

// DOM Elements
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navbarLinks = document.querySelectorAll('.navbar ul li a');
const contactForm = document.getElementById('contactForm');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const themeToggleBtn = document.getElementById('theme-toggle');

// Create starry background effect
function generateStars() {
  const starryBackground = document.getElementById('starry-background');
  const numberOfStars = 200;
  
  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 2 + 1;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const animationDelay = Math.random() * 5;
    
    star.classList.add('star');
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${left}%`;
    star.style.top = `${top}%`;
    star.style.animationDelay = `${animationDelay}s`;
    
    starryBackground.appendChild(star);
  }
}

// Navbar scroll effect and scroll-to-top button visibility
function handleScroll() {
  // Navbar effects
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10, 10, 20, 0.95)';
    navbar.style.padding = '0.7rem 0';
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
  } else {
    navbar.style.background = 'rgba(10, 10, 20, 0.8)';
    navbar.style.padding = '1rem 0';
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }
  
  // Scroll-to-top button visibility
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
}

// Mobile menu toggle
function toggleMobileMenu() {
  const navbarUl = document.querySelector('.navbar ul');
  navbarUl.classList.toggle('active');
  navbarUl.classList.toggle('mobile-menu');
}

// Smooth scrolling for navigation links
function smoothScroll(e) {
  e.preventDefault();
  
  // Close mobile menu if open
  document.querySelector('.navbar ul').classList.remove('active', 'mobile-menu');
  
  const targetId = this.getAttribute('href');
  const targetElement = document.querySelector(targetId);
  
  window.scrollTo({
    top: targetElement.offsetTop - 70,
    behavior: 'smooth'
  });
}

// Handle contact form submission
function handleFormSubmit(e) {
  e.preventDefault();
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  
  if (nameInput.value && emailInput.value && messageInput.value) {
    // In a real implementation, you would send the form data to a server
    // For now, we'll just show a success message
    alert('Thanks for your message! I\'ll get back to you soon.');
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
  }
}

// Scroll animation for sections
function animateSections() {
  const sections = document.querySelectorAll('section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => {
    section.classList.remove('fade-in');
    observer.observe(section);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Generate starry background
  generateStars();
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
  
  // Add mobile menu toggle
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  
  // Add smooth scrolling to navigation links
  navbarLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
  });
  
  // Add contact form submission handler
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
  
  // Add scroll-to-top button functionality
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Add theme toggle functionality
  if (themeToggleBtn) {
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
    }
    
    themeToggleBtn.addEventListener('click', () => {
      // Toggle theme class on body
      document.body.classList.toggle('light-theme');
      
      // Save preference to localStorage
      const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
      localStorage.setItem('theme', currentTheme);
    });
  }
  
  // Initialize scroll animations
  animateSections();
  
  // Add type-writing effect to hero title
  const heroTitle = document.querySelector('.hero-content h1');
  if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        heroTitle.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }
    
    setTimeout(typeWriter, 500);
  }
});

// Project filter functionality (if needed in the future)
function filterProjects(category) {
  const projects = document.querySelectorAll('.project');
  
  projects.forEach(project => {
    if (category === 'all' || project.classList.contains(category)) {
      project.style.display = 'flex';
    } else {
      project.style.display = 'none';
    }
  });
}

// Update active navigation link based on scroll position
window.addEventListener('scroll', function() {
  const scrollPosition = window.scrollY;
  
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      document.querySelectorAll('.navbar ul li a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});