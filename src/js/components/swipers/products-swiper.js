document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelectorAll('.products__swiper').length > 0) {
        document.querySelectorAll('.products__swiper').forEach(swiper => {
            const productsSwiper = new Swiper(swiper, {
                navigation: {
                    nextEl: swiper.parentElement.querySelector('.swiper-button-next'),
                    prevEl: swiper.parentElement.querySelector('.swiper-button-prev'),
                },
                slidesPerView: 4,
                spaceBetween: 20,

                breakpoints: {
                    320: {
                        slidesPerView: 1.3,
                    },  
                    576: {
                        slidesPerView: 2.2,
                    },  
                    992: {
                        slidesPerView: 4,
                    },
                },
            });
        });
    }
});