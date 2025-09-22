document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelectorAll('.images__swiper').length > 0) {
        document.querySelectorAll('.images__swiper').forEach(swiper => {
            const imagesSwiper = new Swiper(swiper, {
                navigation: {
                    nextEl: swiper.parentElement.querySelector('.swiper-button-next'),
                    prevEl: swiper.parentElement.querySelector('.swiper-button-prev'),
                },
                slidesPerView: 5,
                spaceBetween: 20,
                loop: true,
            });
        });
    }
});