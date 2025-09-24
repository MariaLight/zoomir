document.addEventListener('DOMContentLoaded', () => {

    const burgerBtn = document.querySelector('.burger-btn');
    const burgerMenu = document.querySelector('.header__burger-menu');

    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('active');
        burgerMenu.classList.toggle('active');
    })
    
    
})