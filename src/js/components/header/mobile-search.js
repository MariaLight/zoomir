document.addEventListener('DOMContentLoaded', () => {
    const mobileSearchBtn = document.querySelector('.mobile-search-btn');
    const mobileSearch = document.getElementById('mobile-search');
    const mobileSearchInput = mobileSearch?.querySelector('.header__searchform__input');
    const mobileSearchClose = mobileSearch?.querySelector('.mobile-search__close');
    const body = document.body;

    if (mobileSearchBtn && mobileSearch && mobileSearchInput && mobileSearchClose) {
        // Открытие мобильного поиска
        mobileSearchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Добавляем класс active для показа поиска
            mobileSearch.classList.add('active');
            
            // Блокируем прокрутку body
            body.style.overflow = 'hidden';
            
            // Устанавливаем фокус на поле ввода с небольшой задержкой для корректной анимации
            setTimeout(() => {
                mobileSearchInput.focus();
            }, 100);
        });

        // Закрытие мобильного поиска при клике на кнопку закрытия
        mobileSearchClose.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileSearch();
        });

        // Закрытие мобильного поиска при клике на Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileSearch.classList.contains('active')) {
                closeMobileSearch();
            }
        });

        // Закрытие при клике вне области поиска
        mobileSearch.addEventListener('click', (e) => {
            if (e.target === mobileSearch) {
                closeMobileSearch();
            }
        });

        // Закрытие при снятии фокуса с поля ввода
        mobileSearchInput.addEventListener('blur', () => {
            // Используем setTimeout чтобы дать время для клика на кнопку закрытия
            setTimeout(() => {
                if (mobileSearch.classList.contains('active') && 
                    !mobileSearch.contains(document.activeElement)) {
                    closeMobileSearch();
                }
            }, 150);
        });

        // Закрытие при отправке формы
        const searchForm = mobileSearch.querySelector('.header__searchform');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                // Можно добавить логику обработки поиска здесь
                console.log('Поиск:', mobileSearchInput.value);
                // Закрываем поиск после отправки
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