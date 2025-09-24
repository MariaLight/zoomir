document.addEventListener('DOMContentLoaded', () => {
    const accordionTitles = document.querySelectorAll('.footer__column__title--accordion');
    
    accordionTitles.forEach(title => {
        title.addEventListener('click', () => {
            const column = title.closest('.footer__column');
            const list = column.querySelector('.footer__column__list');
            
            if (!list) return;
            
            const isActive = title.classList.contains('active');
            
            accordionTitles.forEach(otherTitle => {
                if (otherTitle !== title) {
                    otherTitle.classList.remove('active');
                    const otherList = otherTitle.closest('.footer__column').querySelector('.footer__column__list');
                    if (otherList) {
                        otherList.classList.remove('active');
                    }
                }
            });
            
            if (isActive) {
                title.classList.remove('active');
                list.classList.remove('active');
            } else {
                title.classList.add('active');
                list.classList.add('active');
            }
        });
    });
});
