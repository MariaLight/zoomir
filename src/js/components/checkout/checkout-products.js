document.addEventListener('DOMContentLoaded', () => {
    function changeQuantity(productItem, delta) {
        const countElement = productItem.querySelector('.checkout__products__item__count__value');
        if (!countElement) return;
        
        let currentCount = parseInt(countElement.textContent) || 0;
        let newCount = currentCount + delta;
        
        if (newCount < 1) newCount = 1;
        
        countElement.textContent = newCount;

        //Тут можно вызвать функцию отправки кол-ва на бэк
        console.log('Изменено количество:', newCount);
    }
    
    const minusButtons = document.querySelectorAll('.checkout__products__item__count__btn--minus');
    const plusButtons = document.querySelectorAll('.checkout__products__item__count__btn--plus');
    
    minusButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productItem = button.closest('.checkout__products__item');
            changeQuantity(productItem, -1);
        });
    });
    
    plusButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productItem = button.closest('.checkout__products__item');
            changeQuantity(productItem, 1);
        });
    });

    const deleteButtons = document.querySelectorAll('.checkout__products__item__delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productItem = button.closest('.checkout__products__item');
            deleteProduct(productItem);
        });
    });

    function deleteProduct(productItem) {
        //Тут можно вызвать функцию удаления товара на бэк
        console.log('Удален товар:', productItem);
        productItem.remove();
    }
})