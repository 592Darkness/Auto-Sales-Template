/**
 * Dropdown Theme Script
 * Applies the current theme colors to select dropdowns
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initial application of custom dropdown styling
    applyDropdownTheming();
    
    // Watch for theme changes and update dropdowns accordingly
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class' && 
                (mutation.target.classList.contains('light-theme') || 
                 mutation.target.classList.contains('dark-theme'))) {
                applyDropdownTheming();
            }
        });
    });
    
    // Start observing the body for class changes (theme switching)
    observer.observe(document.body, { attributes: true });
    
    // Function to apply theme-specific styling to all dropdowns
    function applyDropdownTheming() {
        const isDarkTheme = document.body.classList.contains('dark-theme');
        const selectElements = document.querySelectorAll('select');
        
        selectElements.forEach(select => {
            // Apply theme-specific styles
            if (isDarkTheme) {
                select.style.backgroundColor = getComputedStyle(document.body).getPropertyValue('--bg-secondary');
                select.style.color = getComputedStyle(document.body).getPropertyValue('--text-primary');
                select.style.borderColor = getComputedStyle(document.body).getPropertyValue('--border-color');
            } else {
                select.style.backgroundColor = getComputedStyle(document.body).getPropertyValue('--bg-primary');
                select.style.color = getComputedStyle(document.body).getPropertyValue('--text-primary');
                select.style.borderColor = getComputedStyle(document.body).getPropertyValue('--border-color');
            }
        });
    }
});
