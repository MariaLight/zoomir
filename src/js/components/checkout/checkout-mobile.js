document.addEventListener('DOMContentLoaded', () => {
    const mobileOpenBtn = document.querySelector('.checkout__mobile__open');
    const checkoutLeft = document.querySelector('.checkout__left');
    const checkoutRight = document.querySelector('.checkout__right');
    
    if (!mobileOpenBtn || !checkoutLeft) return;
    
    mobileOpenBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        mobileOpenBtn.classList.add('checkout__mobile__open--hidden');
        checkoutRight.classList.add('checkout__right--hidden');
        
        checkoutLeft.classList.add('checkout__left--active');
    });
});
