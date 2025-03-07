/**
 * Form Theming Script
 * Applies the current theme colors to all form elements (selects, inputs, textareas)
 * For AutoElite website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initial application of custom theming to form elements
    applyFormTheming();
    
    // Watch for theme changes and update form elements accordingly
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class' && 
                (mutation.target.classList.contains('light-theme') || 
                 mutation.target.classList.contains('dark-theme'))) {
                applyFormTheming();
            }
        });
    });
    
    // Start observing the body for class changes (theme switching)
    observer.observe(document.body, { attributes: true });
    
    // Function to apply theme-specific styling to all form elements
    function applyFormTheming() {
        const isDarkTheme = document.body.classList.contains('dark-theme');
        
        // Theme variables
        const bgColor = isDarkTheme ? 
            getComputedStyle(document.body).getPropertyValue('--bg-secondary') : 
            getComputedStyle(document.body).getPropertyValue('--bg-primary');
        
        const textColor = getComputedStyle(document.body).getPropertyValue('--text-primary');
        const borderColor = getComputedStyle(document.body).getPropertyValue('--border-color');
        const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary-color');
        
        // Apply to all select elements
        const selectElements = document.querySelectorAll('select');
        selectElements.forEach(select => {
            applyThemeToElement(select, bgColor, textColor, borderColor, primaryColor);
        });
        
        // Apply to all input elements (text, email, number, etc.)
        const inputElements = document.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], input[type="tel"], input[type="password"], input[type="search"], input[type="url"], input[type="date"]');
        inputElements.forEach(input => {
            applyThemeToElement(input, bgColor, textColor, borderColor, primaryColor);
        });
        
        // Apply to all textarea elements
        const textareaElements = document.querySelectorAll('textarea');
        textareaElements.forEach(textarea => {
            applyThemeToElement(textarea, bgColor, textColor, borderColor, primaryColor);
        });
    }
    
    // Helper function to apply theme colors to an element
    function applyThemeToElement(element, bgColor, textColor, borderColor, primaryColor) {
        element.style.backgroundColor = bgColor;
        element.style.color = textColor;
        element.style.borderColor = borderColor;
        
        // For focus event
        element.addEventListener('focus', function() {
            this.style.borderColor = primaryColor;
            this.style.boxShadow = '0 0 0 3px rgba(53, 99, 233, 0.2)';
        });
        
        element.addEventListener('blur', function() {
            this.style.borderColor = borderColor;
            this.style.boxShadow = 'none';
        });
        
        // For hover event
        element.addEventListener('mouseenter', function() {
            if (document.activeElement !== this) { // Only if not focused
                this.style.borderColor = primaryColor;
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (document.activeElement !== this) { // Only if not focused
                this.style.borderColor = borderColor;
            }
        });
    }
});
