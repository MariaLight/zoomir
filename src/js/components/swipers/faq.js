document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const summary = item.querySelector('.faq-question');
        
        summary.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (item.hasAttribute('open')) {
                item.removeAttribute('open');
                return;
            }
            
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.hasAttribute('open')) {
                    otherItem.removeAttribute('open');
                }
            });
            
            item.setAttribute('open', '');
        });
    });
});
