import './checkout-delivery';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.checkout__form');
    if (!form) return;

    // Проверка обязательных полей
    function validateRequired() {
        const requiredFields = ['username', 'surname', 'tel', 'email'];
        const deliveryRadio = document.querySelector('input[name="delivery"]:checked');
        
        if (deliveryRadio && deliveryRadio.value !== 'Самовывоз') {
            requiredFields.push('address', 'time');
        }

        let isValid = true;
        requiredFields.forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            
            if (!field || !field.value.trim()) {
                showError(fieldName, 'Обязательное поле');
                isValid = false;
            }
        });
        
        return isValid;
    }

    // Валидация имени
    function validateName(name) {
        return /^[а-яёА-ЯЁa-zA-Z\s\-]+$/.test(name);
    }

    // Валидация фамилии
    function validateSurname(surname) {
        return /^[а-яёА-ЯЁa-zA-Z\s\-]+$/.test(surname);
    }

    // Валидация российского телефона
    function validatePhone(phone) {
        const cleanPhone = phone.replace(/\D/g, '');
        return /^(\+7|7|8)?[0-9]{10}$/.test(cleanPhone);
    }

    // Валидация email
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Эмуляция проверки промокода
    async function validatePromocode(promocode) {
        if (!promocode) return true;
        
        // Эмуляция запроса к серверу
        return new Promise(resolve => {
            setTimeout(() => {
                const validPromocodes = ['SALE10', 'WELCOME', 'DISCOUNT'];
                resolve(validPromocodes.includes(promocode.toUpperCase()));
            }, 500);
        });
    }

    // Показать ошибку для поля
    function showError(fieldName, message) {
        const field = form.querySelector(`[name="${fieldName}"]`);
        const errorElement = field?.closest('.form-item')?.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        if (field) {
            field.style.border = '1px solid #FF0000';
        }
    }

    // Очистить ошибку для поля
    function clearError(fieldName) {
        const field = form.querySelector(`[name="${fieldName}"]`);
        const errorElement = field?.closest('.form-item')?.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        if (field) {
            field.style.border = '';
        }
    }

    // Валидация конкретного поля
    async function validateField(fieldName, value) {
        clearError(fieldName);
        
        switch (fieldName) {
            case 'username':
                if (value && !validateName(value)) {
                    showError(fieldName, 'Введите корректное имя');
                    return false;
                }
                break;
            case 'surname':
                if (value && !validateSurname(value)) {
                    showError(fieldName, 'Введите корректную фамилию');
                    return false;
                }
                break;
            case 'tel':
                if (value && !validatePhone(value)) {
                    showError(fieldName, 'Укажите корректный номер');
                    return false;
                }
                break;
            case 'email':
                if (value && !validateEmail(value)) {
                    showError(fieldName, 'Укажите корректный email');
                    return false;
                }
                break;
            case 'promocode':
                if (value) {
                    const isValid = await validatePromocode(value);
                    if (!isValid) {
                        showError(fieldName, 'Такого промокода не существует');
                        return false;
                    }
                }
                break;
        }
        return true;
    }

    // Обработчики событий для полей
    const fields = form.querySelectorAll('input[name]');
    fields.forEach(field => {
        field.addEventListener('blur', async () => {
            await validateField(field.name, field.value);
        });
    });

    // Обработчик отправки формы
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Очищаем все ошибки
        fields.forEach(field => clearError(field.name));
        
        // Проверяем обязательные поля
        const isRequiredValid = validateRequired();
        
        // Проверяем валидность всех полей
        let isFormValid = isRequiredValid;
        for (const field of fields) {
            if (field.value.trim()) {
                const isValid = await validateField(field.name, field.value);
                if (!isValid) isFormValid = false;
            }
        }
        
        if (isFormValid) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            console.log('Отправляем форму:', data);
        }
    });
})