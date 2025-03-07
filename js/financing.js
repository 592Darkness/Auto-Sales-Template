/**
 * Financing Scripts
 * Handles loan calculator, financing application, and FAQ interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const calculateBtn = document.getElementById('calculate-btn');
    const applyNowBtn = document.getElementById('apply-now-btn');
    const printResultsBtn = document.getElementById('print-results-btn');
    const financingForm = document.getElementById('financing-form');
    const faqItems = document.querySelectorAll('.faq-item');
    const optionApplyBtns = document.querySelectorAll('.option-apply-btn');
    const applicationModal = document.getElementById('application-success-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Handle tab switching
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get tab ID
                const tabId = this.getAttribute('data-tab');
                
                // Hide all tab contents
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Remove active class from all buttons
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Show selected tab content
                document.getElementById(tabId).classList.add('active');
                
                // Add active class to clicked button
                this.classList.add('active');
            });
        });
    }
    
    // Handle calculator functionality
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            calculateLoanPayment();
        });
    }
    
    // Calculate monthly payment and update results
    function calculateLoanPayment() {
        // Get input values
        const vehiclePrice = parseFloat(document.getElementById('vehicle-price').value) || 0;
        const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;
        const tradeIn = parseFloat(document.getElementById('trade-in').value) || 0;
        const interestRate = parseFloat(document.getElementById('interest-rate').value) || 0;
        const loanTerm = parseInt(document.getElementById('loan-term').value) || 60;
        
        // Calculate loan amount
        const loanAmount = vehiclePrice - downPayment - tradeIn;
        
        // Convert annual interest rate to monthly and decimal
        const monthlyInterestRate = interestRate / 100 / 12;
        
        // Calculate monthly payment using the formula:
        // P = L[i(1+i)^n]/[(1+i)^n-1]
        // P = Monthly Payment, L = Loan Amount, i = Monthly Interest Rate, n = Number of Payments
        let monthlyPayment = 0;
        
        if (interestRate === 0) {
            // Simple division for 0% interest
            monthlyPayment = loanAmount / loanTerm;
        } else {
            // Standard formula for interest-bearing loans
            monthlyPayment = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTerm)) / (Math.pow(1 + monthlyInterestRate, loanTerm) - 1);
        }
        
        // Calculate total interest
        const totalInterest = (monthlyPayment * loanTerm) - loanAmount;
        
        // Calculate total cost
        const totalCost = loanAmount + totalInterest;
        
        // Format number with commas for thousands
        function formatNumber(num) {
            return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
        // Update results in the UI
        document.getElementById('monthly-payment').textContent = 'G$' + formatNumber(monthlyPayment);
        document.getElementById('loan-amount').textContent = 'G$' + formatNumber(loanAmount);
        document.getElementById('total-interest').textContent = 'G$' + formatNumber(totalInterest);
        document.getElementById('total-cost').textContent = 'G$' + formatNumber(totalCost);
        
        // Animate the results display
        animateResults();
    }
    
    // Animate the results when they're updated
    function animateResults() {
        const resultsCard = document.querySelector('.results-card');
        
        // Add animation class
        resultsCard.classList.add('results-updated');
        
        // Remove class after animation completes
        setTimeout(() => {
            resultsCard.classList.remove('results-updated');
        }, 1000);
    }
    
    // Handle "Apply for This Rate" button
    if (applyNowBtn) {
        applyNowBtn.addEventListener('click', function() {
            // Get the calculated values
            const loanAmount = document.getElementById('loan-amount').textContent;
            const interestRate = document.getElementById('interest-rate').value;
            const loanTerm = document.getElementById('loan-term').value;
            
            // Switch to application tab
            const applicationTabBtn = document.querySelector('[data-tab="application"]');
            if (applicationTabBtn) {
                applicationTabBtn.click();
                
                // Scroll to application form
                const applicationForm = document.getElementById('application');
                if (applicationForm) {
                    applicationForm.scrollIntoView({ behavior: 'smooth' });
                
                    // Add a nice highlight effect to the form
                    const financingForm = document.getElementById('financing-form');
                    if (financingForm) {
                        financingForm.classList.add('highlight-form');
                        
                        setTimeout(() => {
                            financingForm.classList.remove('highlight-form');
                        }, 1500);
                    }
                }
            }
        });
    }
    
    // Handle "Print Results" button
    if (printResultsBtn) {
        printResultsBtn.addEventListener('click', function() {
            // In a real implementation, this would use the browser's print functionality
            // or generate a PDF report. For this demo, we'll just show an alert.
            alert('In a real implementation, this would print or generate a PDF of your loan calculation results.');
        });
    }
    
    // Handle financing form submission
    if (financingForm) {
        financingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form (simplified for demo)
            if (validateFinancingForm()) {
                // Show loading state
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Submitting...';
                submitButton.disabled = true;
                
                // Simulate application processing
                setTimeout(() => {
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // Show success modal or alert
                    if (applicationModal) {
                        applicationModal.style.display = 'block';
                    } else {
                        alert('Your financing application has been submitted successfully! We will contact you within 24-48 hours.');
                    }
                    
                    // Reset form
                    financingForm.reset();
                }, 2000);
            }
        });
    }
    
    // Validate financing application form
    function validateFinancingForm() {
        // In a real implementation, this would perform comprehensive validation
        // For this demo, we'll just do a simple check for required fields
        
        let isValid = true;
        const requiredInputs = financingForm.querySelectorAll('[required]');
        
        // Reset previous errors
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => el.remove());
        
        // Check each required field
        requiredInputs.forEach(input => {
            // Reset styles
            input.style.borderColor = '';
            
            // Check if empty
            if (!input.value.trim()) {
                showError(input, 'This field is required');
                isValid = false;
            } 
            // Special validation for specific fields
            else if (input.id === 'email' && !isValidEmail(input.value)) {
                showError(input, 'Please enter a valid email address');
                isValid = false;
            } 
            else if (input.id === 'phone' && !isValidPhone(input.value)) {
                showError(input, 'Please enter a valid phone number');
                isValid = false;
            }
            else if (input.id === 'ssn' && !isValidID(input.value)) {
                showError(input, 'Please enter a valid ID number');
                isValid = false;
            }
        });
        
        // Check if terms checkbox is checked
        const termsCheckbox = document.getElementById('agree-terms');
        if (termsCheckbox && !termsCheckbox.checked) {
            showError(termsCheckbox, 'You must agree to the terms and conditions');
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
    
    // ID validation helper (replaced SSN validation with generic ID validation)
    function isValidID(id) {
        // Simple check that ID field is not empty and has reasonable length
        return id.trim().length >= 5 && id.trim().length <= 20;
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
    
    // Handle FAQ accordion functionality
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                // Toggle active class on clicked item
                item.classList.toggle('active');
            });
        });
    }
    
    // Handle "Apply Now" buttons in financing options
    if (optionApplyBtns.length > 0) {
        optionApplyBtns.forEach(button => {
            button.addEventListener('click', function() {
                // Switch to application tab
                const applicationTabBtn = document.querySelector('[data-tab="application"]');
                if (applicationTabBtn) {
                    applicationTabBtn.click();
                    
                    // Scroll to application form
                    const applicationForm = document.getElementById('application');
                    if (applicationForm) {
                        applicationForm.scrollIntoView({ behavior: 'smooth' });
                        
                        // Add a nice highlight effect to the form
                        const financingForm = document.getElementById('financing-form');
                        if (financingForm) {
                            financingForm.classList.add('highlight-form');
                            
                            setTimeout(() => {
                                financingForm.classList.remove('highlight-form');
                            }, 1500);
                        }
                    }
                }
            });
        });
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
    
    // Initialize the calculator with default values on page load
    if (calculateBtn) {
        calculateLoanPayment();
    }
    
    // Add highlight effect for financing form
    if (financingForm) {
        financingForm.style.transition = 'box-shadow 0.5s ease, transform 0.5s ease';
    }
});

// Add custom styles for result animation and form highlighting
document.head.insertAdjacentHTML('beforeend', `
<style>
.results-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.results-updated {
    transform: scale(1.05);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}
.highlight-form {
    box-shadow: 0 0 20px rgba(53, 99, 233, 0.5);
    transform: scale(1.02);
}
</style>
`);
