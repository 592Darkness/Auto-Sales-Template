/**
 * Load and display cart items from localStorage
 */
document.addEventListener('DOMContentLoaded', function() {
    // Load cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    
    // If cart is empty, show message
    if (cartItems.length === 0 && cartItemsContainer) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty. <a href="parts.html">Continue shopping</a></p>';
        
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = '0';
        }
        
        // Clear summary totals
        updateCartTotals();
        return;
    }
    
    // Display cart items if container exists
    if (cartItemsContainer) {
        // Clear existing items
        cartItemsContainer.innerHTML = '';
        
        // Add each item from localStorage
        cartItems.forEach((item, index) => {
            const cartItemHTML = `
                <div class="cart-item" data-index="${index}">
                    <div class="item-image">
                        <img src="/api/placeholder/100/100" alt="${item.name}">
                    </div>
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p class="item-compatibility">${item.compatibility || 'Standard compatibility'}</p>
                        <div class="item-quantity">
                            <button class="qty-btn minus"><i class="fas fa-minus"></i></button>
                            <input type="number" value="${item.quantity}" min="1" max="10">
                            <button class="qty-btn plus"><i class="fas fa-plus"></i></button>
                        </div>
                    </div>
                    <div class="item-price">
                        <p>${item.price}</p>
                        <button class="remove-item"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
            
            cartItemsContainer.innerHTML += cartItemHTML;
        });
        
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = cartItems.length.toString();
        }
        
        // Reattach event listeners for quantity buttons and remove buttons
        attachCartEventListeners();
        
        // Update totals
        updateCartTotals();
    }
});

// Attach event listeners to cart elements
function attachCartEventListeners() {
    // Quantity minus buttons
    const minusButtons = document.querySelectorAll('.qty-btn.minus');
    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            let value = parseInt(input.value);
            
            if (value > 1) {
                input.value = value - 1;
                updateCartItemQuantity(this.closest('.cart-item'), value - 1);
                updateCartTotals();
            }
        });
    });
    
    // Quantity plus buttons
    const plusButtons = document.querySelectorAll('.qty-btn.plus');
    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            let value = parseInt(input.value);
            
            if (value < parseInt(input.max || '10')) {
                input.value = value + 1;
                updateCartItemQuantity(this.closest('.cart-item'), value + 1);
                updateCartTotals();
            }
        });
    });
    
    // Remove buttons
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const itemIndex = cartItem.dataset.index;
            
            // Confirm removal
            if (confirm('Are you sure you want to remove this item from your cart?')) {
                // Remove from localStorage
                const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                cartItems.splice(itemIndex, 1);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                
                // Animate removal from DOM
                cartItem.style.opacity = '0';
                setTimeout(() => {
                    cartItem.remove();
                    
                    // Update cart count
                    const cartCount = document.querySelector('.cart-count');
                    if (cartCount) {
                        cartCount.textContent = cartItems.length.toString();
                    }
                    
                    // Check if cart is now empty
                    if (cartItems.length === 0) {
                        const cartItemsContainer = document.querySelector('.cart-items');
                        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty. <a href="parts.html">Continue shopping</a></p>';
                    }
                    
                    // Update totals
                    updateCartTotals();
                }, 300);
            }
        });
    });
    
    // Direct quantity input changes
    const quantityInputs = document.querySelectorAll('.item-quantity input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            let value = parseInt(this.value);
            
            // Ensure minimum quantity of 1
            if (value < 1) {
                this.value = 1;
                value = 1;
            }
            
            // Ensure maximum quantity
            const max = parseInt(this.max || '10');
            if (value > max) {
                this.value = max;
                value = max;
            }
            
            // Update in localStorage
            updateCartItemQuantity(this.closest('.cart-item'), value);
            
            // Update totals
            updateCartTotals();
        });
    });
}

// Update cart item quantity in localStorage
function updateCartItemQuantity(cartItemElement, newQuantity) {
    const itemIndex = cartItemElement.dataset.index;
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    if (cartItems[itemIndex]) {
        cartItems[itemIndex].quantity = newQuantity;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
}
