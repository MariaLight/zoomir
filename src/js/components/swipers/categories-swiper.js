document.addEventListener('DOMContentLoaded', () => {
        if (document.querySelectorAll('.categories__swiper').length > 0) {
        document.querySelectorAll('.categories__swiper').forEach(swiper => {
            const categoriesSwiper = new Swiper(swiper, {
                navigation: {
                    nextEl: swiper.parentElement.querySelector('.swiper-button-next'),
                    prevEl: swiper.parentElement.querySelector('.swiper-button-prev'),
                },
                slidesPerView: 3,
                spaceBetween: 20,
                loop: true,

                breakpoints: {
                    576: {
                        slidesPerView: 2.2,
                    },
                },
            });
        });
    }
});