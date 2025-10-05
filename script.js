        // Theme Toggle
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('i');
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Check for saved theme preference
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        
        // Mobile Navigation
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking on a link
        // document.querySelectorAll('.nav-link').forEach(link => {
        //     link.addEventListener('click', () => {
        //         navMenu.classList.remove('active');
        //         hamburger.innerHTML = '<i class="fas fa-bars'></i>';
        //     });
        // });
        
        // Carousel Functionality
        const carouselItems = document.querySelectorAll('.carousel-item');
        const carouselDots = document.querySelectorAll('.carousel-dot');
        const prevButton = document.querySelector('.carousel-arrow.prev');
        const nextButton = document.querySelector('.carousel-arrow.next');
        let currentIndex = 0;
        let autoSlideInterval;
        
        function showSlide(index, direction = 1) {
            // Hide all slides
            carouselItems.forEach(item => {
                item.classList.remove('active', 'prev');
                item.style.transform = `translateX(${direction * 100}%)`;
            });
            carouselDots.forEach(dot => dot.classList.remove('active'));
            
            // Show the selected slide
            carouselItems[index].classList.add('active');
            carouselItems[index].style.transform = 'translateX(0)';
            
            // If moving backward, set the previous state for animation
            if (direction === -1) {
                const prevIndex = (index + 1) % carouselItems.length;
                carouselItems[prevIndex].classList.add('prev');
            }
            
            carouselDots[index].classList.add('active');
            currentIndex = index;
        }
        
        function nextSlide() {
            const nextIndex = (currentIndex + 1) % carouselItems.length;
            showSlide(nextIndex, 1);
        }
        
        function prevSlide() {
            const prevIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
            showSlide(prevIndex, -1);
        }
        
        // Add click events to arrows
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);
        
        // Add click events to dots
        carouselDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const direction = index > currentIndex ? 1 : -1;
                showSlide(index, direction);
            });
        });
        
        // Auto-advance carousel
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }
        
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }
        
        // Pause auto slide when interacting with carousel
        const carousel = document.querySelector('.carousel');
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
        
        // Start auto slide
        startAutoSlide();
        
        // Back to top button
        const backToTopButton = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 90,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Preload images for better performance
        function preloadImages() {
            const imageUrls = [
                'https://images.unsplash.com/photo-1593810450969-fa8c2b20090d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                'https://images.unsplash.com/photo-1572883454114-5d4a4cfc2d47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                'https://images.unsplash.com/photo-1460661412647-620cd3eb9dcd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                'https://images.unsplash.com/photo-1623341215095-6a4b0c5aaa25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                'https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
            ];
            
            imageUrls.forEach(url => {
                const img = new Image();
                img.src = url;
            });
        }
        
        // Preload images when page loads
        window.addEventListener('load', preloadImages);
