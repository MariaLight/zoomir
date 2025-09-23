document.addEventListener('DOMContentLoaded', function() {
    const headerFixed = document.querySelector('.header-fixed');
    const header = document.querySelector('.header');
    
    if (!headerFixed || !header) return;
    
    let lastScrollTop = 0;
    const scrollThreshold = 100;
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > scrollThreshold) {
            headerFixed.classList.add('show');
        } else {
            headerFixed.classList.remove('show');
        }
        
        lastScrollTop = scrollTop;
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const searchInput = headerFixed.querySelector('.header-fixed__searchform__input');
    const address = headerFixed.querySelector('.header-fixed__address');
    const catalog = headerFixed.querySelector('.header-fixed__catalog');
    const btns = headerFixed.querySelector('.header-fixed__btns');
    
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            headerFixed.classList.add('search-focused');
        });
        
        searchInput.addEventListener('blur', function() {
            headerFixed.classList.remove('search-focused');
        });
    }
    
});
