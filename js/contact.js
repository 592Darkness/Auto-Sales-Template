/**
 * Contact Form Script
 * Handles form validation and submission for the contact page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const contactForm = document.getElementById('contact-form');
    const contactSuccessModal = document.getElementById('contact-success-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Handle contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateContactForm()) {
                // Show loading state on button
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // Show success modal or alert
                    if (contactSuccessModal) {
                        contactSuccessModal.style.display = 'block';
                    } else {
                        alert('Thank you for contacting us! We will get back to you shortly.');
                    }
                    
                    // Reset form
                    contactForm.reset();
                }, 1500);
            }
        });
    }
    
    // Validate contact form
    function validateContactForm() {
        let isValid = true;
        
        // Get form fields
        const firstName = document.getElementById('first-name');
        const lastName = document.getElementById('last-name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        // Reset previous errors
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => el.remove());
        
        // Validate first name
        if (!firstName.value.trim()) {
            showError(firstName, 'First name is required');
            isValid = false;
        }
        
        // Validate last name
        if (!lastName.value.trim()) {
            showError(lastName, 'Last name is required');
            isValid = false;
        }
        
        // Validate email
        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone
        if (!phone.value.trim()) {
            showError(phone, 'Phone number is required');
            isValid = false;
        } else if (!isValidPhone(phone.value)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate subject
        if (!subject.value) {
            showError(subject, 'Please select a subject');
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            showError(message, 'Message is required');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'Please enter a message of at least 10 characters');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }
    
    // Phone validation helper
    function isValidPhone(phone) {
        // Accept various formats, but this is simplified
        const pattern = /^[\d\s\-\(\)\.+]+$/;
        return pattern.test(phone) && phone.replace(/\D/g, '').length >= 7;
    }
    
    // Helper function to show error messages
    function showError(element, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '5px';
        
        element.parentNode.appendChild(errorElement);
        element.style.borderColor = '#e74c3c';
    }
    
    // Handle modal close
    if (closeModalButtons.length > 0) {
        closeModalButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Handle map directions button
    const directionsBtn = document.querySelector('.map-overlay .btn');
    if (directionsBtn) {
        directionsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real implementation, this would open Google Maps with directions
            // For demo purposes, just show an alert
            alert('In a real implementation, this would open Google Maps with directions to AutoElite.');
        });
    }
});
