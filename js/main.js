/**
 * Main JavaScript for AutoElite website
 * Handles navigation, mobile menu, cart functionality, and other functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('open');
            
            // Change hamburger to X when open
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mainNav && mainNav.classList.contains('active')) {
            const isClickInside = mainNav.contains(event.target) || 
                                 mobileMenuBtn.contains(event.target);
            
            if (!isClickInside) {
                mainNav.classList.remove('active');
                mobileMenuBtn.classList.remove('open');
                
                // Reset hamburger icon
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking a link
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuBtn.classList.remove('open');
                    
                    // Reset hamburger icon
                    const spans = mobileMenuBtn.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    });
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    
    document.querySelectorAll('.main-nav a').forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Cart functionality
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'checkout.html';
        });
    }

    // Update cart count on page load
    updateCartCount();
});

// Function to update cart count in the header
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartCount.textContent = cartItems.length.toString();
    }
}

// Global cart functionality
function addToCart(button) {
    // Get product information
    const card = button.closest('.part-card') || button.closest('.card');
    const productName = card.querySelector('h3').textContent;
    const productPrice = card.querySelector('.price').textContent;
    
    // Get compatibility info if available
    let compatibility = '';
    const compatibilityElement = card.querySelector('.compatibility');
    if (compatibilityElement) {
        compatibility = compatibilityElement.textContent;
    }
    
    // Create item object
    const cartItem = {
        name: productName,
        price: productPrice,
        quantity: 1,
        compatibility: compatibility
    };
    
    // Get existing cart or initialize empty array
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(item => item.name === productName);
    
    if (existingItemIndex >= 0) {
        // Increment quantity if item already exists
        cartItems[existingItemIndex].quantity += 1;
    } else {
        // Add new item to cart
        cartItems.push(cartItem);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Update cart count in the header
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cartItems.length.toString();
    }
    
    // Show confirmation message
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Added';
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.backgroundColor = '';
        button.style.color = '';
    }, 1500);
    
    // Alert user (in a real implementation, this would be a nicer notification)
    setTimeout(() => {
        alert(`${productName} has been added to your cart!`);
    }, 500);
}
