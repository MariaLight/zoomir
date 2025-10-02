document.addEventListener('DOMContentLoaded', () => {
    const mobileSearchBtn = document.querySelector('.mobile-search-btn');
    const mobileSearch = document.getElementById('mobile-search');
    const mobileSearchInput = mobileSearch?.querySelector('.header__searchform__input');
    const mobileSearchClose = mobileSearch?.querySelector('.mobile-search__close');
    const body = document.body;

    if (mobileSearchBtn && mobileSearch && mobileSearchInput && mobileSearchClose) {
        
        mobileSearchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            mobileSearch.classList.add('active');
            body.style.overflow = 'hidden';
            
            setTimeout(() => {
                mobileSearchInput.focus();
            }, 100);
        });

        mobileSearchClose.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileSearch();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileSearch.classList.contains('active')) {
                closeMobileSearch();
            }
        });

        mobileSearch.addEventListener('click', (e) => {
            if (e.target === mobileSearch) {
                closeMobileSearch();
            }
        });

        mobileSearchInput.addEventListener('blur', () => {
            setTimeout(() => {
                if (mobileSearch.classList.contains('active') && 
                    !mobileSearch.contains(document.activeElement)) {
                    closeMobileSearch();
                }
            }, 150);
        });

        const searchForm = mobileSearch.querySelector('.header__searchform');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                // Обработка поиска
                console.log('Поиск:', mobileSearchInput.value);
                setTimeout(() => {
                    closeMobileSearch();
                }, 500);
            });
        }

        function closeMobileSearch() {
            mobileSearch.classList.remove('active');
            body.style.overflow = '';
            mobileSearchInput.blur();
        }
    }
});