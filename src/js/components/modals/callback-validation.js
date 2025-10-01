document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.modal__form--callback');
    if (!form) return;

    function validateName(name) {
        return /^[а-яёА-ЯЁa-zA-Z\s\-]+$/.test(name) && name.length >= 2;
    }

    function validatePhone(phone) {
        const cleanPhone = phone.replace(/\D/g, '');
        return /^(\+7|7|8)?[0-9]{10}$/.test(cleanPhone);
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(fieldName, message) {
        const field = form.querySelector(`[name="${fieldName}"]`);
        const errorElement = field?.closest('.modal__form__item')?.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        if (field) {
            field.style.border = '1px solid #FF0000';
        }
    }

    function clearError(fieldName) {
        const field = form.querySelector(`[name="${fieldName}"]`);
        const errorElement = field?.closest('.modal__form__item')?.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        if (field) {
            field.style.border = '';
        }
    }
    function validateField(fieldName, value) {
        clearError(fieldName);

        if (!value.trim()) {
            showError(fieldName, 'Обязательное поле');
            return false;
        }

        switch (fieldName) {
            case 'name':
                if (!validateName(value)) {
                    showError(fieldName, 'Введите корректное имя');
                    return false;
                }
                break;
            case 'phone':
                if (!validatePhone(value)) {
                    showError(fieldName, 'Укажите корректный номер');
                    return false;
                }
                break;
            case 'email':
                if (!validateEmail(value)) {
                    showError(fieldName, 'Укажите корректный email');
                    return false;
                }
                break;
            case 'question':
                if (value.trim().length < 10) {
                    showError(fieldName, 'Вопрос должен содержать минимум 10 символов');
                    return false;
                }
                break;
        }
        return true;
    }

    function validateCheckbox() {
        const checkbox = form.querySelector('[name="agreement"]');
        if (!checkbox || !checkbox.checked) {
            alert('Необходимо согласие с политикой конфиденциальности');
            return false;
        }
        return true;
    }

    const fields = form.querySelectorAll('input[name], textarea[name]');
    fields.forEach(field => {
        field.addEventListener('blur', () => {
            if (field.name !== 'agreement') {
                validateField(field.name, field.value);
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        fields.forEach(field => {
            if (field.name !== 'agreement') {
                clearError(field.name);
            }
        });

        let isValid = true;
        fields.forEach(field => {
            if (field.name !== 'agreement') {
                if (!validateField(field.name, field.value)) {
                    isValid = false;
                }
            }
        });

        if (!validateCheckbox()) {
            isValid = false;
        }

        if (isValid) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            console.log('Отправляем форму обратной связи:', data);

            const modal = form.closest('.modal');
            const modalSuccess = document.querySelector('#modal-success');
            if (modal) {
                modal.classList.remove('modal--active');
                document.body.style.overflow = '';
                modalSuccess.classList.add('modal--active');
                document.body.style.overflow = 'hidden';
                setTimeout(() => {
                    modalSuccess.classList.remove('modal--active');
                    document.body.style.overflow = '';
                }, 3000);
            }

            form.reset();
        }
    });
});

