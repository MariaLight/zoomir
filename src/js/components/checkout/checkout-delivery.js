document.addEventListener('DOMContentLoaded', () => {

    // Убираем блок с адресом при выборе самовывоза
    const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
    const deliveryFields = document.querySelector('.checkout__form__delivery__grid');
    
    function toggleDeliveryFields() {
        const selectedRadio = document.querySelector('input[name="delivery"]:checked');
        if (selectedRadio && selectedRadio.value === 'Самовывоз') {
            deliveryFields.classList.add('d-none');
        } else {
            deliveryFields.classList.remove('d-none');
        }
    }
    
    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', toggleDeliveryFields);
    });
    toggleDeliveryFields();



})