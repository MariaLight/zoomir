document.addEventListener('DOMContentLoaded', () => {
    const mobileOpenBtn = document.querySelector('.checkout__mobile__open');
    const checkoutLeft = document.querySelector('.checkout__left');
    
    if (!mobileOpenBtn || !checkoutLeft) return;
    
    mobileOpenBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Скрываем кнопку
        mobileOpenBtn.classList.add('checkout__mobile__open--hidden');
        
        // Показываем левую часть с анимацией
        checkoutLeft.classList.add('checkout__left--active');
    });
});
