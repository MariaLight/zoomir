function updateResetButton(block, inputs, resetButton) {
    let hasValue = false;
    
    if (inputs.length > 0) {
        hasValue = Array.from(inputs).some(input => {
            if (input.type === 'checkbox') {
                return input.checked;
            } else {
                return input.value.trim() !== '';
            }
        });
    }
    
    if (resetButton) {
        if (hasValue) {
            resetButton.style.display = 'flex';
            block.classList.add('catalog__filter__block--active');
        } else {
            resetButton.style.display = 'none';
            block.classList.remove('catalog__filter__block--active');
        }
    }
}

function resetFilterBlock(block, inputs, resetButton) {
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });

    resetButton.style.display = 'none';
    block.classList.remove('catalog__filter__block--active');

    inputs.forEach(input => {
        if (input.type !== 'checkbox') {
            input.blur();
        }
    });
}

function toggleShowMore(block, showMoreButton) {
    const allCheckboxes = block.querySelectorAll('.catalog__filter__checkbox');
    const isExpanded = showMoreButton.dataset.expanded === 'true';
    
    allCheckboxes.forEach((checkbox, index) => {
        if (index >= 5) {
            if (isExpanded) {
                checkbox.classList.add('catalog__filter__checkbox--hidden');
            } else {
                checkbox.classList.remove('catalog__filter__checkbox--hidden');
            }
        }
    });
    
    showMoreButton.textContent = isExpanded ? 'Показать ещё' : 'Скрыть';
    showMoreButton.dataset.expanded = isExpanded ? 'false' : 'true';
}

function initFilterBlock(block) {
    const inputs = block.querySelectorAll('.catalog__filter__input, .catalog__filter__checkbox__input');
    const resetButton = block.querySelector('.catalog__filter__reset');
    const showMoreButton = block.querySelector('.catalog__filter__show-more');

    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            input.addEventListener('change', () => {
                updateResetButton(block, inputs, resetButton);
            });
        } else {
            input.addEventListener('input', () => {
                updateResetButton(block, inputs, resetButton);
            });

            input.addEventListener('blur', () => {
                updateResetButton(block, inputs, resetButton);
            });
        }
    });

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            resetFilterBlock(block, inputs, resetButton);
        });
    }

    if (showMoreButton) {
        showMoreButton.dataset.expanded = 'false';
        showMoreButton.addEventListener('click', () => {
            toggleShowMore(block, showMoreButton);
        });
    }

    updateResetButton(block, inputs, resetButton);
}

function initCatalogFilters() {
    const filterBlocks = document.querySelectorAll('.catalog__filter__block');
    
    filterBlocks.forEach(block => {
        initFilterBlock(block);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initCatalogFilters();

    const filters = document.querySelector('.catalog__sidebar--products');
    const filtersClose = document.querySelector('.catalog__filters__close');
    const filtersOpen = document.querySelector('.catalog__filters__open');
    if (filters) {
        filtersOpen.addEventListener('click', () => {
            filters.classList.add('active');
        });

        filtersClose.addEventListener('click', () => {
            filters.classList.remove('active');
        });
    }
});

export { initCatalogFilters };
