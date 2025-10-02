document.addEventListener('DOMContentLoaded', () => {
    const mobileOpenBtn = document.querySelector('.checkout__mobile__open');
    const checkoutLeft = document.querySelector('.checkout__left');
    const checkoutRight = document.querySelector('.checkout__right');
    const backBtn = document.querySelector('.checkout__back-btn');
    
    if (!mobileOpenBtn || !checkoutLeft) return;
    
    const showCheckoutForm = () => {
        mobileOpenBtn.classList.add('checkout__mobile__open--hidden');
        checkoutRight.classList.add('checkout__right--hidden');
        
        setTimeout(() => {
            checkoutLeft.classList.add('checkout__left--active');
        }, 150);
    };
    
    const showCart = () => {
        checkoutLeft.classList.remove('checkout__left--active');
        
        setTimeout(() => {
            checkoutRight.classList.remove('checkout__right--hidden');
            mobileOpenBtn.classList.remove('checkout__mobile__open--hidden');
        }, 150);
    };
    
    mobileOpenBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showCheckoutForm();
    });
    
    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showCart();
        });
    }
});
