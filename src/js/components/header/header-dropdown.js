
document.addEventListener('DOMContentLoaded', () => {
    const catalogBtn = document.querySelector('.header__catalog__btn');
    const catalogDropdown = document.querySelector('.header__catalog__dropdown__content');
    const catalogCategories = document.querySelectorAll('.header__catalog__category');
    const subcategoriesBlocks = document.querySelectorAll('.header__catalog__subcategories');

    if (catalogBtn && catalogDropdown) {
        catalogBtn.addEventListener('click', (e) => {
            e.preventDefault();
            catalogDropdown.classList.toggle('active');
            catalogBtn.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!catalogBtn.contains(e.target) && !catalogDropdown.contains(e.target)) {
                catalogDropdown.classList.remove('active');
                catalogBtn.classList.remove('active');
            }
        });

        catalogCategories.forEach(category => {
            category.addEventListener('mouseenter', () => {
                const categoryType = category.getAttribute('data-category');
                
                catalogCategories.forEach(cat => cat.classList.remove('active'));
                category.classList.add('active');

                subcategoriesBlocks.forEach(block => {
                    block.classList.remove('active');
                });

                const targetSubcategories = document.querySelector(`.header__catalog__subcategories[data-category="${categoryType}"]`);
                if (targetSubcategories) {
                    targetSubcategories.classList.add('active');
                }
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                catalogDropdown.classList.remove('active');
                catalogBtn.classList.remove('active');
            }
        });
    }
});


