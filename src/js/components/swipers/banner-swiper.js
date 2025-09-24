document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.banner__swiper')) {
        const bannerSwiper = new Swiper('.banner__swiper', {
            navigation: {
                nextEl: '.banner__swiper .swiper-button-next',
                prevEl: '.banner__swiper .swiper-button-prev',
            },
            pagination: {
                el: '.banner__swiper .swiper-pagination',
                clickable: true,
            },
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            effect: 'fade',
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
        });
    }
});