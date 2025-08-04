// Mobile menu toggle
document.getElementById('mobile-menu-btn').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Animated counters
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.id === 'revenue-counter' ? 'M+' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.id === 'revenue-counter' ? 'M+' : '+');
        }
    }, 16);
}

// Start counters when page loads
window.addEventListener('load', function() {
    animateCounter(document.getElementById('revenue-counter'), 50);
    animateCounter(document.getElementById('clients-counter'), 500);
});

// Assessment functionality
document.getElementById('assessment-btn').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('#assessment input[type="checkbox"]:checked');
    const results = document.getElementById('assessment-results');
    const resultsContent = document.getElementById('results-content');
    
    if (checkboxes.length > 0) {
        let content = '<p class="mb-4">Based on your selections, here are your priority areas:</p><ul class="space-y-2">';
        checkboxes.forEach(checkbox => {
            const label = checkbox.parentElement.querySelector('.font-semibold').textContent;
            content += `<li class="flex items-center"><svg class="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>${label}</li>`;
        });
        content += '</ul><p class="mt-4 text-blue-800 font-semibold">Ready to solve these challenges? Book your free strategy session below!</p>';
        resultsContent.innerHTML = content;
        results.classList.remove('hidden');
        results.scrollIntoView({ behavior: 'smooth' });
    } else {
        alert('Please select at least one challenge to get your personalized results.');
    }
});

// Accordion functionality
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('.accordion-icon');
        
        // Close all other accordions
        document.querySelectorAll('.accordion-content').forEach(otherContent => {
            if (otherContent !== content) {
                otherContent.classList.add('hidden');
                otherContent.previousElementSibling.querySelector('.accordion-icon').style.transform = 'rotate(0deg)';
            }
        });
        
        // Toggle current accordion
        content.classList.toggle('hidden');
        icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
    });
});

// Service tabs functionality
document.querySelectorAll('.service-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const targetTab = this.dataset.tab;
        
        // Update tab styles
        document.querySelectorAll('.service-tab').forEach(t => {
            t.classList.remove('active', 'bg-primary', 'text-white');
            t.classList.add('bg-white', 'text-text-primary', 'border', 'border-gray-200');
        });
        this.classList.add('active', 'bg-primary', 'text-white');
        this.classList.remove('bg-white', 'text-text-primary', 'border', 'border-gray-200');
        
        // Show target content
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.add('hidden');
            pane.classList.remove('active');
        });
        document.getElementById(targetTab + '-content').classList.remove('hidden');
        document.getElementById(targetTab + '-content').classList.add('active');
        
        // Animate progress bars
        setTimeout(() => {
            document.querySelectorAll('.progress-bar').forEach(bar => {
                const width = bar.dataset.width;
                bar.style.width = width;
            });
        }, 100);
    });
});

// Initialize progress bars for first tab
setTimeout(() => {
    document.querySelectorAll('#seo-content .progress-bar').forEach(bar => {
        const width = bar.dataset.width;
        bar.style.width = width;
    });
}, 500);

// Case study carousel
let currentSlide = 0;
const totalSlides = 2;
const carouselTrack = document.getElementById('carousel-track');
const indicators = document.querySelectorAll('.carousel-indicator');

function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('bg-primary', index === currentSlide);
        indicator.classList.toggle('bg-gray-300', index !== currentSlide);
    });
}

document.getElementById('next-btn').addEventListener('click', function() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
});

document.getElementById('prev-btn').addEventListener('click', function() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function() {
        currentSlide = index;
        updateCarousel();
    });
});

// FAQ functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('.faq-icon');
        
        // Close all other FAQs
        document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
            if (otherAnswer !== answer) {
                otherAnswer.classList.add('hidden');
                otherAnswer.previousElementSibling.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
            }
        });
        
        // Toggle current FAQ
        answer.classList.toggle('hidden');
        icon.style.transform = answer.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
    });
});

// FAQ search functionality
document.getElementById('faq-search').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question span').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// Sessions remaining counter
let sessionsRemaining = 3;
const sessionsCounter = document.getElementById('sessions-remaining');

// Simulate sessions being booked
setInterval(() => {
    if (Math.random() < 0.1 && sessionsRemaining > 0) { // 10% chance every interval
        sessionsRemaining--;
        sessionsCounter.textContent = sessionsRemaining;
        if (sessionsRemaining === 0) {
            sessionsCounter.parentElement.innerHTML = '<div class="text-2xl font-bold text-red-300">FULLY BOOKED</div><div class="text-orange-100">Join Waitlist</div>';
        }
    }
}, 30000); // Check every 30 seconds

// Sticky CTA functionality
let lastScrollTop = 0;
const stickyCTA = document.getElementById('sticky-cta');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = (scrollTop / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    if (scrollPercent > 50 && scrollTop > lastScrollTop) {
        // Scrolling down and past 50%
        stickyCTA.style.transform = 'translateY(0)';
    } else if (scrollTop < lastScrollTop) {
        // Scrolling up
        stickyCTA.style.transform = 'translateY(100%)';
    }
    
    lastScrollTop = scrollTop;
});

// Form submission
document.getElementById('lead-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you! We\'ll contact you within 24 hours to schedule your free strategy session.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Smooth scrolling for anchor links
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

// Auto-advance carousel
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}, 10000); // Change slide every 10 seconds