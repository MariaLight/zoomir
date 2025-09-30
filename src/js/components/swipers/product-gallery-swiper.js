document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.product-gallery');
    if (!galleryContainer) return;

    const thumbsSwiper = new Swiper('.product-gallery__thumbnails .swiper', {
        spaceBetween: 10,
        slidesPerView: 5,
        direction: 'vertical',
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.product-gallery__thumbnails .swiper-button-next',
            prevEl: '.product-gallery__thumbnails .swiper-button-prev',
        },
        breakpoints: {
            320: {
                direction: 'horizontal',
                slidesPerView: 4,
            },
            576: {
                direction: 'horizontal',
                slidesPerView: 6,
            },
            1200: {
                direction: 'vertical',
                slidesPerView: 5,
            },
        },
        on: {
            init: function() {
                const totalSlides = this.slides.length;
                
                if (totalSlides <= 5) {
                    this.navigation.nextEl.style.display = 'none';
                    this.navigation.prevEl.style.display = 'none';
                } else {
                    this.navigation.nextEl.style.display = 'flex';
                    this.navigation.prevEl.style.display = 'flex';
                }
            },
            slideChange: function() {
                const totalSlides = this.slides.length;
                
                if (totalSlides <= 5) {
                    this.navigation.nextEl.style.display = 'none';
                    this.navigation.prevEl.style.display = 'none';
                } else {
                    this.navigation.nextEl.style.display = 'flex';
                    this.navigation.prevEl.style.display = 'flex';
                }
            }
        }
    });

    const mainSwiper = new Swiper('.product-gallery__main .swiper', {
        spaceBetween: 10,
        thumbs: {
            swiper: thumbsSwiper,
        },
    });

    // Инициализируем Fancybox для галереи
    Fancybox.bind('[data-fancybox="product-gallery"]', {
        // Настройки Fancybox
        Toolbar: {
            display: {
                left: ["infobar"],
                middle: [],
                right: ["slideshow", "thumbs", "close"],
            },
        },
        Thumbs: {
            autoStart: false,
        },
        Images: {
            zoom: true,
        },
    });
});
