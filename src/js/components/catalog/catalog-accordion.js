document.addEventListener('DOMContentLoaded', function() {
    const categoryToggles = document.querySelectorAll('.catalog__category__toggle');
    
    categoryToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const category = this.closest('.catalog__category');
            const subcategories = category.querySelector('.catalog__subcategories');
            
            if (subcategories) {
                const isActive = subcategories.classList.contains('active');
                
                if (isActive) {
                    subcategories.classList.remove('active');
                    this.classList.remove('active');
                } else {
                    subcategories.classList.add('active');
                    this.classList.add('active');
                }
            }
        });
    });
});
