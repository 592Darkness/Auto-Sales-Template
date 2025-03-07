/**
 * Enhanced Theme Switcher
 * Toggles between light and dark themes, saves preference to localStorage,
 * and respects system preferences
 */

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply saved theme, system preference, or default to light
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    } else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
    }
    
    // Theme toggle button functionality
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            if (body.classList.contains('light-theme')) {
                // Switch to dark theme
                body.classList.remove('light-theme');
                body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                // Switch to light theme
                body.classList.remove('dark-theme');
                body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Only apply if user hasn't set a preference
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                // System switched to dark mode
                body.classList.remove('light-theme');
                body.classList.add('dark-theme');
            } else {
                // System switched to light mode
                body.classList.remove('dark-theme');
                body.classList.add('light-theme');
            }
        }
    });
});
