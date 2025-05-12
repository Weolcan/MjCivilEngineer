// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Navigation
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
        });
    }

    // Close mobile menu when link is clicked
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Portfolio filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active button
            filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
            btn.classList.add('active');

            // Filter projects
            const filterValue = btn.dataset.filter;
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.dataset.category.includes(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Project Modal
    const portfolioLinks = document.querySelectorAll('.expand-link');
    const modal = document.querySelector('.project-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (portfolioLinks.length > 0 && modal) {
        portfolioLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const portfolioItem = link.closest('.portfolio-item');
                
                // Get project info
                const projectTitle = portfolioItem.querySelector('h3').textContent;
                const projectCategory = portfolioItem.querySelector('span').textContent;
                const projectBg = portfolioItem.querySelector('.project-thumbnail').className;
                
                // Set modal content (in a real project, you'd get more details from a data source)
                modal.querySelector('.project-title').textContent = projectTitle;
                modal.querySelector('.project-category').textContent = projectCategory;
                
                // Set project gallery items (placeholder)
                const galleryItems = modal.querySelectorAll('.gallery-item');
                galleryItems.forEach((item, index) => {
                    item.style.backgroundImage = portfolioItem.querySelector('.project-thumbnail').style.backgroundImage;
                });
                
                // Show modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Close on click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-level');
    const skillsSection = document.querySelector('#tools');
    
    if (skillBars.length > 0 && skillsSection) {
        let animated = false;
        
        window.addEventListener('scroll', () => {
            if (!animated && isInViewport(skillsSection)) {
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
                animated = true;
            }
        });
    }

    // Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // In a real project, you'd handle form submission to backend here
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Helper function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
});
