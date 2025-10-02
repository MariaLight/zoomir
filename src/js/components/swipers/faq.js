document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    function getInitialPadding() {
        if (window.innerWidth <= 576) {
            return '0 20px 0';
        }
        return '0 30px 0';
    }
    
    function getOpenPadding() {
        if (window.innerWidth <= 576) {
            return '0 20px 20px';
        }
        return '0 30px 30px';
    }
    
    faqItems.forEach(item => {
        const summary = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        answer.style.padding = getInitialPadding();
        answer.style.transition = 'max-height 0.4s ease-in-out, opacity 0.3s ease-in-out, padding 0.3s ease-in-out';
        
        summary.addEventListener('click', function(e) {
            e.preventDefault();
            
            const isOpen = item.hasAttribute('open');
            
            if (isOpen) {
                closeFaqItem(item, answer);
            } else {
                openFaqItem(item, answer);
            }
        });
    });
    
    function openFaqItem(item, answer) {
        item.setAttribute('open', '');
        answer.offsetHeight;
        
        const contentHeight = answer.scrollHeight;
        
        answer.style.maxHeight = contentHeight + 20 + 'px';
        answer.style.opacity = '1';
        answer.style.padding = getOpenPadding();
    }
    
    function closeFaqItem(item, answer) {
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        answer.style.padding = getInitialPadding();
        
        setTimeout(() => {
            item.removeAttribute('open');
        }, 400);
    }
    
    window.addEventListener('resize', function() {
        faqItems.forEach(item => {
            const answer = item.querySelector('.faq-answer');
            if (item.hasAttribute('open')) {
                answer.style.padding = getOpenPadding();
            } else {
                answer.style.padding = getInitialPadding();
            }
        });
    });
});
