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
    
});
