/**
 * Filter functionality for cars and auto parts pages
 * Handles dynamic model population based on make selection
 * and filter form submission
 */

document.addEventListener('DOMContentLoaded', function() {
    // Model data based on make selection
    const modelsByMake = {
        toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', 'Tundra'],
        honda: ['Accord', 'Civic', 'CR-V', 'Pilot', 'Odyssey', 'Ridgeline'],
        ford: ['F-150', 'Mustang', 'Explorer', 'Escape', 'Bronco', 'Edge'],
        bmw: ['3 Series', '5 Series', 'X3', 'X5', '7 Series', 'M3'],
        mercedes: ['C-Class', 'E-Class', 'S-Class', 'GLE', 'GLC', 'A-Class'],
        audi: ['A4', 'A6', 'Q5', 'Q7', 'e-tron', 'A3'],
        lexus: ['RX', 'ES', 'NX', 'IS', 'GX', 'LS']
    };

    // Get form elements
    const makeSelect = document.getElementById('make');
    const modelSelect = document.getElementById('model');
    const filterForm = document.querySelector('.filter-form');
    
    // Update models dropdown based on make selection
    if (makeSelect && modelSelect) {
        makeSelect.addEventListener('change', function() {
            const selectedMake = this.value;
            
            // Clear existing options
            modelSelect.innerHTML = '<option value="">All Models</option>';
            
            // If a make is selected, populate models
            if (selectedMake && modelsByMake[selectedMake]) {
                modelsByMake[selectedMake].forEach(model => {
                    const option = document.createElement('option');
                    option.value = model.toLowerCase().replace(' ', '-');
                    option.textContent = model;
                    modelSelect.appendChild(option);
                });
            }
        });
    }
    
    // Handle filter form submission
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get all filter values
            const make = makeSelect ? makeSelect.value : '';
            const model = modelSelect ? modelSelect.value : '';
            const year = document.getElementById('year') ? document.getElementById('year').value : '';
            const bodyType = document.getElementById('body-type') ? document.getElementById('body-type').value : '';
            const category = document.getElementById('category') ? document.getElementById('category').value : '';
            const minPrice = document.getElementById('min-price') ? document.getElementById('min-price').value : '';
            const maxPrice = document.getElementById('max-price') ? document.getElementById('max-price').value : '';
            
            // Construct filter object for logging/debugging
            const filters = {
                make,
                model,
                year,
                bodyType,
                category,
                minPrice,
                maxPrice
            };
            
            console.log('Applied filters:', filters);
            
            // In a real application, this would send an AJAX request
            // or update the URL parameters to filter results
            
            // For demo purposes, we'll just show an alert
            alert('Filter applied! In a real application, this would filter the results based on your criteria.');
            
            // You could also implement client-side filtering here
            // by hiding/showing elements based on criteria
        });
        
        // Handle form reset
        filterForm.addEventListener('reset', function() {
            // Clear model dropdown
            if (modelSelect) {
                modelSelect.innerHTML = '<option value="">All Models</option>';
            }
            
            // In a real application, this would reset the filtered results
            setTimeout(() => {
                alert('Filters cleared! In a real application, this would reset to show all results.');
            }, 100);
        });
    }
    
    // Handle sort selection
    const sortSelect = document.getElementById('sort-by');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            
            // In a real application, this would re-sort the results
            console.log(`Sorting by: ${sortValue}`);
            
            // For demo purposes, we'll just show an alert
            alert(`Results sorted by: ${sortValue}! In a real application, this would reorder the results.`);
        });
    }
    
    // Handle save/favorite buttons
    const saveButtons = document.querySelectorAll('.btn-save');
    if (saveButtons.length > 0) {
        saveButtons.forEach(button => {
            button.addEventListener('click', function() {
                const icon = this.querySelector('i');
                
                // Toggle between filled and outlined heart
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    alert('Vehicle saved to favorites!');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    alert('Vehicle removed from favorites!');
                }
            });
        });
    }
    
    // Handle compare buttons
    const compareButtons = document.querySelectorAll('.btn-compare');
    if (compareButtons.length > 0) {
        compareButtons.forEach(button => {
            button.addEventListener('click', function() {
                alert('Vehicle added to comparison list!');
            });
        });
    }
});
