/**
 * Payment Processing Scripts
 * Handles payment form validation, cart updates, and checkout process
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const paymentForm = document.getElementById('payment-form');
    const paymentOptions = document.querySelectorAll('.payment-option');
    const cardNumberInput = document.getElementById('card-number');
    const expiryDateInput = document.getElementById('expiry-date');
    const cvvInput = document.getElementById('cvv');
    const quantityInputs = document.querySelectorAll('.item-quantity input');
    const minusButtons = document.querySelectorAll('.qty-btn.minus');
    const plusButtons = document.querySelectorAll('.qty-btn.plus');
    const removeButtons = document.querySelectorAll('.remove-item');
    const paymentSuccessModal = document.getElementById('payment-success-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Handle payment method selection
    if (paymentOptions.length > 0) {
        paymentOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                paymentOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Get payment method
                const paymentMethod = this.querySelector('input').id;
                
                // Show/hide appropriate form based on payment method
                if (paymentMethod === 'credit-card') {
                    document.getElementById('payment-form').style.display = 'block';
                } else if (paymentMethod === 'paypal') {
                    document.getElementById('payment-form').style.display = 'none';
                    alert('You would be redirected to PayPal in a real implementation.');
                }
            });
        });
    }
    
    // Format card number with spaces (e.g., 1234 5678 9012 3456)
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            // Remove non-digit characters
            let value = this.value.replace(/\D/g, '');
            
            // Add space after every 4 digits
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            
            // Update input value
            this.value = value;
        });
    }
    
    // Format expiry date (e.g., MM/YY)
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function(e) {
            // Remove non-digit characters
            let value = this.value.replace(/\D/g, '');
            
            // Add slash after first 2 digits
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            
            // Update input value
            this.value = value;
        });
    }
    
    // Only allow digits in CVV
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            // Remove non-digit characters
            this.value = this.value.replace(/\D/g, '');
        });
    }
    
    // Handle quantity changes
    if (minusButtons.length > 0 && plusButtons.length > 0 && quantityInputs.length > 0) {
        // Decrease quantity
        minusButtons.forEach(button => {
            button.addEventListener('click', function() {
                const input = this.parentElement.querySelector('input');
                let value = parseInt(input.value);
                
                if (value > 1) {
                    input.value = value - 1;
                    updateCartTotals();
                }
            });
        });
        
        // Increase quantity
        plusButtons.forEach(button => {
            button.addEventListener('click', function() {
                const input = this.parentElement.querySelector('input');
                let value = parseInt(input.value);
                
                if (value < parseInt(input.max)) {
                    input.value = value + 1;
                    updateCartTotals();
                }
            });
        });
        
        // Directly change quantity
        quantityInputs.forEach(input => {
            input.addEventListener('change', function() {
                let value = parseInt(this.value);
                
                // Ensure minimum quantity of 1
                if (value < 1) {
                    this.value = 1;
                }
                
                // Ensure maximum quantity
                if (value > parseInt(this.max)) {
                    this.value = this.max;
                }
                
                updateCartTotals();
            });
        });
    }
    
    // Remove items from cart
    if (removeButtons.length > 0) {
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                
                // Confirm removal
                if (confirm('Are you sure you want to remove this item from your cart?')) {
                    cartItem.style.opacity = '0';
                    setTimeout(() => {
                        cartItem.remove();
                        updateCartTotals();
                        
                        // Check if cart is empty
                        const remainingItems = document.querySelectorAll('.cart-item');
                        if (remainingItems.length === 0) {
                            const cartItems = document.querySelector('.cart-items');
                            cartItems.innerHTML = '<p class="empty-cart-message">Your cart is empty. <a href="parts.html">Continue shopping</a></p>';
                        }
                    }, 300);
                }
            });
        });
    }
    
    // Update cart totals when quantities change
    function updateCartTotals() {
        // In a real implementation, this would calculate actual totals from the cart items
        // For this demo, we'll just use placeholder values and simulate changes
        
        // Get all quantity inputs and their values
        const quantities = Array.from(document.querySelectorAll('.item-quantity input')).map(input => parseInt(input.value));
        
        // Get all price elements (grab text content and convert to number)
        const prices = Array.from(document.querySelectorAll('.item-price p')).map(p => {
            return parseFloat(p.textContent.replace('$', '').replace(',', ''));
        });
        
        // Calculate subtotal
        let subtotal = 0;
        for (let i = 0; i < quantities.length; i++) {
            subtotal += prices[i] * quantities[i];
        }
        
        // Calculate shipping (fixed for demo)
        const shipping = 12.50;
        
        // Calculate tax (for demo: 8.25% of subtotal)
        const tax = subtotal * 0.0825;
        
        // Calculate total
        const total = subtotal + shipping + tax;
        
        // Update summary elements
        const summaryRows = document.querySelectorAll('.summary-row');
        if (summaryRows.length >= 4) {
            // Subtotal
            summaryRows[0].querySelector('span:last-child').textContent = 'G
        }
    }
    
    // Handle payment form submission
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validatePaymentForm()) {
                // Show loading state
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Processing...';
                submitButton.disabled = true;
                
                // Simulate payment processing
                setTimeout(() => {
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                // Show success modal
                    if (paymentSuccessModal) {
                        // Update payment amount in success message
                        const paymentAmount = document.querySelector('#payment-success-modal .modal-body p strong');
                        if (paymentAmount) {
                            const totalAmount = document.querySelector('.summary-row.total span:last-child').textContent;
                            paymentAmount.textContent = totalAmount;
                        }
                        
                        paymentSuccessModal.style.display = 'block';
                    } else {
                        alert('Payment successful! Your order has been placed.');
                        window.location.href = 'index.html';
                    }
                }, 2000);
            }
        });
    }
    
    // Validate payment form
    function validatePaymentForm() {
        let isValid = true;
        
        // Get form fields
        const cardHolder = document.getElementById('card-holder');
        const cardNumber = document.getElementById('card-number');
        const expiryDate = document.getElementById('expiry-date');
        const cvv = document.getElementById('cvv');
        const billingAddress = document.getElementById('billing-address');
        const billingCity = document.getElementById('billing-city');
        const billingState = document.getElementById('billing-state');
        const billingZip = document.getElementById('billing-zip');
        
        // Reset previous errors
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => el.remove());
        
        // Validate card holder name
        if (!cardHolder.value.trim()) {
            showError(cardHolder, 'Cardholder name is required');
            isValid = false;
        }
        
        // Validate card number (simple validation for demo)
        const cardNumberValue = cardNumber.value.replace(/\s/g, '');
        if (!cardNumberValue || cardNumberValue.length < 13 || cardNumberValue.length > 19) {
            showError(cardNumber, 'Please enter a valid card number');
            isValid = false;
        }
        
        // Validate expiry date
        const expiryPattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!expiryPattern.test(expiryDate.value)) {
            showError(expiryDate, 'Please enter a valid expiry date (MM/YY)');
            isValid = false;
        } else {
            // Check if card is expired
            const parts = expiryDate.value.split('/');
            const expiryMonth = parseInt(parts[0]);
            const expiryYear = parseInt('20' + parts[1]);
            
            const now = new Date();
            const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
            const currentYear = now.getFullYear();
            
            if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
                showError(expiryDate, 'Your card has expired');
                isValid = false;
            }
        }
        
        // Validate CVV
        if (!cvv.value || cvv.value.length < 3 || cvv.value.length > 4) {
            showError(cvv, 'Please enter a valid CVV');
            isValid = false;
        }
        
        // Validate billing address
        if (!billingAddress.value.trim()) {
            showError(billingAddress, 'Billing address is required');
            isValid = false;
        }
        
        // Validate city
        if (!billingCity.value.trim()) {
            showError(billingCity, 'City is required');
            isValid = false;
        }
        
        // Validate state
        if (!billingState.value.trim()) {
            showError(billingState, 'State is required');
            isValid = false;
        }
        
        // Validate ZIP
        const zipPattern = /^\d{5}(-\d{4})?$/;
        if (!zipPattern.test(billingZip.value)) {
            showError(billingZip, 'Please enter a valid ZIP code');
            isValid = false;
        }
        
        return isValid;
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
                modal.style.display = 'none';
            });
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
});
 + subtotal.toFixed(2);
            
            // Shipping
            summaryRows[1].querySelector('span:last-child').textContent = 'G
        }
    }
    
    // Handle payment form submission
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validatePaymentForm()) {
                // Show loading state
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Processing...';
                submitButton.disabled = true;
                
                // Simulate payment processing
                setTimeout(() => {
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // Show success modal
                    if (paymentSuccessModal) {
                        paymentSuccessModal.style.display = 'block';
                    } else {
                        alert('Payment successful! Your order has been placed.');
                        window.location.href = 'index.html';
                    }
                }, 2000);
            }
        });
    }
    
    // Validate payment form
    function validatePaymentForm() {
        let isValid = true;
        
        // Get form fields
        const cardHolder = document.getElementById('card-holder');
        const cardNumber = document.getElementById('card-number');
        const expiryDate = document.getElementById('expiry-date');
        const cvv = document.getElementById('cvv');
        const billingAddress = document.getElementById('billing-address');
        const billingCity = document.getElementById('billing-city');
        const billingState = document.getElementById('billing-state');
        const billingZip = document.getElementById('billing-zip');
        
        // Reset previous errors
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => el.remove());
        
        // Validate card holder name
        if (!cardHolder.value.trim()) {
            showError(cardHolder, 'Cardholder name is required');
            isValid = false;
        }
        
        // Validate card number (simple validation for demo)
        const cardNumberValue = cardNumber.value.replace(/\s/g, '');
        if (!cardNumberValue || cardNumberValue.length < 13 || cardNumberValue.length > 19) {
            showError(cardNumber, 'Please enter a valid card number');
            isValid = false;
        }
        
        // Validate expiry date
        const expiryPattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!expiryPattern.test(expiryDate.value)) {
            showError(expiryDate, 'Please enter a valid expiry date (MM/YY)');
            isValid = false;
        } else {
            // Check if card is expired
            const parts = expiryDate.value.split('/');
            const expiryMonth = parseInt(parts[0]);
            const expiryYear = parseInt('20' + parts[1]);
            
            const now = new Date();
            const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
            const currentYear = now.getFullYear();
            
            if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
                showError(expiryDate, 'Your card has expired');
                isValid = false;
            }
        }
        
        // Validate CVV
        if (!cvv.value || cvv.value.length < 3 || cvv.value.length > 4) {
            showError(cvv, 'Please enter a valid CVV');
            isValid = false;
        }
        
        // Validate billing address
        if (!billingAddress.value.trim()) {
            showError(billingAddress, 'Billing address is required');
            isValid = false;
        }
        
        // Validate city
        if (!billingCity.value.trim()) {
            showError(billingCity, 'City is required');
            isValid = false;
        }
        
        // Validate state
        if (!billingState.value.trim()) {
            showError(billingState, 'State is required');
            isValid = false;
        }
        
        // Validate ZIP
        const zipPattern = /^\d{5}(-\d{4})?$/;
        if (!zipPattern.test(billingZip.value)) {
            showError(billingZip, 'Please enter a valid ZIP code');
            isValid = false;
        }
        
        return isValid;
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
                modal.style.display = 'none';
            });
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
});
 + shipping.toFixed(2);
            
            // Tax
            summaryRows[2].querySelector('span:last-child').textContent = 'G
        }
    }
    
    // Handle payment form submission
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validatePaymentForm()) {
                // Show loading state
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Processing...';
                submitButton.disabled = true;
                
                // Simulate payment processing
                setTimeout(() => {
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // Show success modal
                    if (paymentSuccessModal) {
                        paymentSuccessModal.style.display = 'block';
                    } else {
                        alert('Payment successful! Your order has been placed.');
                        window.location.href = 'index.html';
                    }
                }, 2000);
            }
        });
    }
    
    // Validate payment form
    function validatePaymentForm() {
        let isValid = true;
        
        // Get form fields
        const cardHolder = document.getElementById('card-holder');
        const cardNumber = document.getElementById('card-number');
        const expiryDate = document.getElementById('expiry-date');
        const cvv = document.getElementById('cvv');
        const billingAddress = document.getElementById('billing-address');
        const billingCity = document.getElementById('billing-city');
        const billingState = document.getElementById('billing-state');
        const billingZip = document.getElementById('billing-zip');
        
        // Reset previous errors
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => el.remove());
        
        // Validate card holder name
        if (!cardHolder.value.trim()) {
            showError(cardHolder, 'Cardholder name is required');
            isValid = false;
        }
        
        // Validate card number (simple validation for demo)
        const cardNumberValue = cardNumber.value.replace(/\s/g, '');
        if (!cardNumberValue || cardNumberValue.length < 13 || cardNumberValue.length > 19) {
            showError(cardNumber, 'Please enter a valid card number');
            isValid = false;
        }
        
        // Validate expiry date
        const expiryPattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!expiryPattern.test(expiryDate.value)) {
            showError(expiryDate, 'Please enter a valid expiry date (MM/YY)');
            isValid = false;
        } else {
            // Check if card is expired
            const parts = expiryDate.value.split('/');
            const expiryMonth = parseInt(parts[0]);
            const expiryYear = parseInt('20' + parts[1]);
            
            const now = new Date();
            const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
            const currentYear = now.getFullYear();
            
            if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
                showError(expiryDate, 'Your card has expired');
                isValid = false;
            }
        }
        
        // Validate CVV
        if (!cvv.value || cvv.value.length < 3 || cvv.value.length > 4) {
            showError(cvv, 'Please enter a valid CVV');
            isValid = false;
        }
        
        // Validate billing address
        if (!billingAddress.value.trim()) {
            showError(billingAddress, 'Billing address is required');
            isValid = false;
        }
        
        // Validate city
        if (!billingCity.value.trim()) {
            showError(billingCity, 'City is required');
            isValid = false;
        }
        
        // Validate state
        if (!billingState.value.trim()) {
            showError(billingState, 'State is required');
            isValid = false;
        }
        
        // Validate ZIP
        const zipPattern = /^\d{5}(-\d{4})?$/;
        if (!zipPattern.test(billingZip.value)) {
            showError(billingZip, 'Please enter a valid ZIP code');
            isValid = false;
        }
        
        return isValid;
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
                modal.style.display = 'none';
            });
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
});
 + tax.toFixed(2);
            
            // Total
            summaryRows[3].querySelector('span:last-child').textContent = 'G
        }
    }
    
    // Handle payment form submission
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validatePaymentForm()) {
                // Show loading state
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Processing...';
                submitButton.disabled = true;
                
                // Simulate payment processing
                setTimeout(() => {
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // Show success modal
                    if (paymentSuccessModal) {
                        paymentSuccessModal.style.display = 'block';
                    } else {
                        alert('Payment successful! Your order has been placed.');
                        window.location.href = 'index.html';
                    }
                }, 2000);
            }
        });
    }
    
    // Validate payment form
    function validatePaymentForm() {
        let isValid = true;
        
        // Get form fields
        const cardHolder = document.getElementById('card-holder');
        const cardNumber = document.getElementById('card-number');
        const expiryDate = document.getElementById('expiry-date');
        const cvv = document.getElementById('cvv');
        const billingAddress = document.getElementById('billing-address');
        const billingCity = document.getElementById('billing-city');
        const billingState = document.getElementById('billing-state');
        const billingZip = document.getElementById('billing-zip');
        
        // Reset previous errors
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => el.remove());
        
        // Validate card holder name
        if (!cardHolder.value.trim()) {
            showError(cardHolder, 'Cardholder name is required');
            isValid = false;
        }
        
        // Validate card number (simple validation for demo)
        const cardNumberValue = cardNumber.value.replace(/\s/g, '');
        if (!cardNumberValue || cardNumberValue.length < 13 || cardNumberValue.length > 19) {
            showError(cardNumber, 'Please enter a valid card number');
            isValid = false;
        }
        
        // Validate expiry date
        const expiryPattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!expiryPattern.test(expiryDate.value)) {
            showError(expiryDate, 'Please enter a valid expiry date (MM/YY)');
            isValid = false;
        } else {
            // Check if card is expired
            const parts = expiryDate.value.split('/');
            const expiryMonth = parseInt(parts[0]);
            const expiryYear = parseInt('20' + parts[1]);
            
            const now = new Date();
            const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
            const currentYear = now.getFullYear();
            
            if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
                showError(expiryDate, 'Your card has expired');
                isValid = false;
            }
        }
        
        // Validate CVV
        if (!cvv.value || cvv.value.length < 3 || cvv.value.length > 4) {
            showError(cvv, 'Please enter a valid CVV');
            isValid = false;
        }
        
        // Validate billing address
        if (!billingAddress.value.trim()) {
            showError(billingAddress, 'Billing address is required');
            isValid = false;
        }
        
        // Validate city
        if (!billingCity.value.trim()) {
            showError(billingCity, 'City is required');
            isValid = false;
        }
        
        // Validate state
        if (!billingState.value.trim()) {
            showError(billingState, 'State is required');
            isValid = false;
        }
        
        // Validate ZIP
        const zipPattern = /^\d{5}(-\d{4})?$/;
        if (!zipPattern.test(billingZip.value)) {
            showError(billingZip, 'Please enter a valid ZIP code');
            isValid = false;
        }
        
        return isValid;
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
                modal.style.display = 'none';
            });
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
});
 + total.toFixed(2);
            
            // Update pay now button text
            const payButton = document.querySelector('#payment-form button[type="submit"]');
            if (payButton) {
                payButton.textContent = 'Pay Now G
        }
    }
    
    // Handle payment form submission
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validatePaymentForm()) {
                // Show loading state
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Processing...';
                submitButton.disabled = true;
                
                // Simulate payment processing
                setTimeout(() => {
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // Show success modal
                    if (paymentSuccessModal) {
                        paymentSuccessModal.style.display = 'block';
                    } else {
                        alert('Payment successful! Your order has been placed.');
                        window.location.href = 'index.html';
                    }
                }, 2000);
            }
        });
    }
    
    // Validate payment form
    function validatePaymentForm() {
        let isValid = true;
        
        // Get form fields
        const cardHolder = document.getElementById('card-holder');
        const cardNumber = document.getElementById('card-number');
        const expiryDate = document.getElementById('expiry-date');
        const cvv = document.getElementById('cvv');
        const billingAddress = document.getElementById('billing-address');
        const billingCity = document.getElementById('billing-city');
        const billingState = document.getElementById('billing-state');
        const billingZip = document.getElementById('billing-zip');
        
        // Reset previous errors
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => el.remove());
        
        // Validate card holder name
        if (!cardHolder.value.trim()) {
            showError(cardHolder, 'Cardholder name is required');
            isValid = false;
        }
        
        // Validate card number (simple validation for demo)
        const cardNumberValue = cardNumber.value.replace(/\s/g, '');
        if (!cardNumberValue || cardNumberValue.length < 13 || cardNumberValue.length > 19) {
            showError(cardNumber, 'Please enter a valid card number');
            isValid = false;
        }
        
        // Validate expiry date
        const expiryPattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!expiryPattern.test(expiryDate.value)) {
            showError(expiryDate, 'Please enter a valid expiry date (MM/YY)');
            isValid = false;
        } else {
            // Check if card is expired
            const parts = expiryDate.value.split('/');
            const expiryMonth = parseInt(parts[0]);
            const expiryYear = parseInt('20' + parts[1]);
            
            const now = new Date();
            const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
            const currentYear = now.getFullYear();
            
            if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
                showError(expiryDate, 'Your card has expired');
                isValid = false;
            }
        }
        
        // Validate CVV
        if (!cvv.value || cvv.value.length < 3 || cvv.value.length > 4) {
            showError(cvv, 'Please enter a valid CVV');
            isValid = false;
        }
        
        // Validate billing address
        if (!billingAddress.value.trim()) {
            showError(billingAddress, 'Billing address is required');
            isValid = false;
        }
        
        // Validate city
        if (!billingCity.value.trim()) {
            showError(billingCity, 'City is required');
            isValid = false;
        }
        
        // Validate state
        if (!billingState.value.trim()) {
            showError(billingState, 'State is required');
            isValid = false;
        }
        
        // Validate ZIP
        const zipPattern = /^\d{5}(-\d{4})?$/;
        if (!zipPattern.test(billingZip.value)) {
            showError(billingZip, 'Please enter a valid ZIP code');
            isValid = false;
        }
        
        return isValid;
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
                modal.style.display = 'none';
            });
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
});
 + total.toFixed(2);
            }
        }
    }
    
    // Handle payment form submission
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validatePaymentForm()) {
                // Show loading state
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Processing...';
                submitButton.disabled = true;
                
                // Simulate payment processing
                setTimeout(() => {
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // Show success modal
                    if (paymentSuccessModal) {
                        paymentSuccessModal.style.display = 'block';
                    } else {
                        alert('Payment successful! Your order has been placed.');
                        window.location.href = 'index.html';
                    }
                }, 2000);
            }
        });
    }
    
    // Validate payment form
    function validatePaymentForm() {
        let isValid = true;
        
        // Get form fields
        const cardHolder = document.getElementById('card-holder');
        const cardNumber = document.getElementById('card-number');
        const expiryDate = document.getElementById('expiry-date');
        const cvv = document.getElementById('cvv');
        const billingAddress = document.getElementById('billing-address');
        const billingCity = document.getElementById('billing-city');
        const billingState = document.getElementById('billing-state');
        const billingZip = document.getElementById('billing-zip');
        
        // Reset previous errors
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => el.remove());
        
        // Validate card holder name
        if (!cardHolder.value.trim()) {
            showError(cardHolder, 'Cardholder name is required');
            isValid = false;
        }
        
        // Validate card number (simple validation for demo)
        const cardNumberValue = cardNumber.value.replace(/\s/g, '');
        if (!cardNumberValue || cardNumberValue.length < 13 || cardNumberValue.length > 19) {
            showError(cardNumber, 'Please enter a valid card number');
            isValid = false;
        }
        
        // Validate expiry date
        const expiryPattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!expiryPattern.test(expiryDate.value)) {
            showError(expiryDate, 'Please enter a valid expiry date (MM/YY)');
            isValid = false;
        } else {
            // Check if card is expired
            const parts = expiryDate.value.split('/');
            const expiryMonth = parseInt(parts[0]);
            const expiryYear = parseInt('20' + parts[1]);
            
            const now = new Date();
            const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
            const currentYear = now.getFullYear();
            
            if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
                showError(expiryDate, 'Your card has expired');
                isValid = false;
            }
        }
        
        // Validate CVV
        if (!cvv.value || cvv.value.length < 3 || cvv.value.length > 4) {
            showError(cvv, 'Please enter a valid CVV');
            isValid = false;
        }
        
        // Validate billing address
        if (!billingAddress.value.trim()) {
            showError(billingAddress, 'Billing address is required');
            isValid = false;
        }
        
        // Validate city
        if (!billingCity.value.trim()) {
            showError(billingCity, 'City is required');
            isValid = false;
        }
        
        // Validate state
        if (!billingState.value.trim()) {
            showError(billingState, 'State is required');
            isValid = false;
        }
        
        // Validate ZIP
        const zipPattern = /^\d{5}(-\d{4})?$/;
        if (!zipPattern.test(billingZip.value)) {
            showError(billingZip, 'Please enter a valid ZIP code');
            isValid = false;
        }
        
        return isValid;
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
                modal.style.display = 'none';
            });
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
});