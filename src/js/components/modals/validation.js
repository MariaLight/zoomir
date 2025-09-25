const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(input) {
    const value = input.value.trim();
    const errorMessage = getErrorMessage(input);

    if (!value) {
        showError(input, errorMessage, 'Поле обязательно для заполнения');
        return false;
    }

    if (!emailRegex.test(value)) {
        showError(input, errorMessage, 'Введите корректный email адрес');
        return false;
    }

    clearError(input);
    return true;
}

function validatePassword(input) {
    const value = input.value.trim();
    const errorMessage = getErrorMessage(input);

    if (!value) {
        showError(input, errorMessage, 'Поле обязательно для заполнения');
        return false;
    }

    clearError(input);
    return true;
}

function showError(input, errorElement, message) {
    input.classList.add('error-input');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearError(input) {
    input.classList.remove('error-input');
    const errorElement = getErrorMessage(input);
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

function getErrorMessage(input) {
    const formItem = input.closest('.modal__form__item');
    return formItem ? formItem.querySelector('.error-message') : null;
}

function setupFormValidation(form) {
    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="password"]');

    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            validateEmail(emailInput);
        });

        emailInput.addEventListener('input', () => {
            clearError(emailInput);
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('blur', () => {
            validatePassword(passwordInput);
        });

        passwordInput.addEventListener('input', () => {
            clearError(passwordInput);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isFormValid = true;

        if (emailInput) {
            if (!validateEmail(emailInput)) {
                isFormValid = false;
            }
        }

        if (passwordInput) {
            if (!validatePassword(passwordInput)) {
                isFormValid = false;
            }
        }

        if (isFormValid) {
            console.log('Форма валидна, можно отправлять данные');
            //Отправка данных
        }
    });
}

function initValidation() {
    const modalForms = document.querySelectorAll('.modal__form');
    modalForms.forEach(form => {
        setupFormValidation(form);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initValidation();
});

export default initValidation;