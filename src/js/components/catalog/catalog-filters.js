/*
    КОММЕНТАРИЙ: это фронтенд часть фильтров для каталога. 
    AJAX запрос к бэку можно сделать в ajaxUpdateFilters().
    Если это всё не нужно, то нужно оставить в файле только часть в строках 281-292 (это для отображения кнопки фильтров на мобильных)
*/



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

    updateActiveFiltersDisplay();
    ajaxUpdateFilters();
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

function ajaxUpdateFilters() {
    const activeFilters = collectActiveFilters();

    console.log('Обновляем фильтры');
    console.log('Активные фильтры:', activeFilters);
}

function collectActiveFilters() {
    const filterBlocks = document.querySelectorAll('.catalog__filter__block');
    const activeFilters = [];

    filterBlocks.forEach(block => {
        const filterType = block.getAttribute('data-filter');
        const filterTitle = block.querySelector('.catalog__filter__title').textContent;

        const checkboxes = block.querySelectorAll('.catalog__filter__checkbox__input:checked');
        if (checkboxes.length > 0) {
            checkboxes.forEach(checkbox => {
                const checkboxText = checkbox.closest('.catalog__filter__checkbox').querySelector('.catalog__filter__checkbox__text').textContent;
                activeFilters.push({
                    type: 'checkbox',
                    filterType: filterType,
                    filterTitle: filterTitle,
                    value: checkboxText,
                    element: checkbox
                });
            });
        }

        const inputs = block.querySelectorAll('.catalog__filter__input');
        if (inputs.length === 2) {
            const fromInput = block.querySelector('[data-field="from"]');
            const toInput = block.querySelector('[data-field="to"]');

            if (fromInput && toInput && (fromInput.value.trim() || toInput.value.trim())) {
                const fromValue = fromInput.value.trim() || '';
                const toValue = toInput.value.trim() || '';

                let filterText = '';
                if (fromValue && toValue) {
                    filterText = `от ${fromValue} до ${toValue}`;
                } else if (fromValue) {
                    filterText = `от ${fromValue}`;
                } else if (toValue) {
                    filterText = `до ${toValue}`;
                }

                if (filterText) {
                    activeFilters.push({
                        type: 'range',
                        filterType: filterType,
                        filterTitle: filterTitle,
                        value: filterText,
                        fromElement: fromInput,
                        toElement: toInput
                    });
                }
            }
        }
    });

    return activeFilters;
}

function updateFiltersButton() {
    const filtersButton = document.querySelector('.catalog__filters__open');
    if (!filtersButton) return;

    const activeFilters = collectActiveFilters();
    const activeFiltersCount = activeFilters.length;

    if (activeFiltersCount > 0) {
        filtersButton.classList.add('has-active-filters');

        filtersButton.innerHTML = `
            <span>Фильтры <span class="catalog__filters__active__count">(${activeFiltersCount})</span></span>
        `;
    } else {
        filtersButton.classList.remove('has-active-filters');

        filtersButton.innerHTML = `
            <span>Фильтры</span>
        `;
    }
}

function updateActiveFiltersDisplay() {
    const activeFiltersContainer = document.querySelector('.catalog__active__filters');
    if (!activeFiltersContainer) return;

    const activeFilters = collectActiveFilters();

    activeFiltersContainer.innerHTML = '';

    activeFilters.forEach(filter => {
        const filterItem = document.createElement('div');
        filterItem.className = 'catalog__active__filter__item';
        filterItem.setAttribute('data-filter-type', filter.filterType);

        let filterText = '';
        if (filter.type === 'checkbox') {
            filterText = filter.value;
        } else if (filter.type === 'range') {
            filterText = `${filter.filterTitle}: ${filter.value}`;
        }

        filterItem.innerHTML = `
            <span>${filterText}</span>
            <button type="button" class="catalog__active__filter__remove">
                <img src="./img/svg/close-white.svg" alt="Закрыть">
            </button>
        `;

        const removeButton = filterItem.querySelector('.catalog__active__filter__remove');
        removeButton.addEventListener('click', () => {
            removeActiveFilter(filter);
        });

        activeFiltersContainer.appendChild(filterItem);
    });

    updateFiltersButton();
}

function removeActiveFilter(filter) {
    if (filter.type === 'checkbox') {
        filter.element.checked = false;
        filter.element.dispatchEvent(new Event('change'));
    } else if (filter.type === 'range') {
        filter.fromElement.value = '';
        filter.toElement.value = '';
        filter.fromElement.dispatchEvent(new Event('input'));
        filter.fromElement.dispatchEvent(new Event('blur'));
        filter.toElement.dispatchEvent(new Event('input'));
        filter.toElement.dispatchEvent(new Event('blur'));
    }

    updateActiveFiltersDisplay();
    ajaxUpdateFilters();
}

function initCatalogFilters() {
    const filterBlocks = document.querySelectorAll('.catalog__filter__block');

    filterBlocks.forEach(block => {
        initFilterBlock(block);
    });

    filterBlocks.forEach(block => {
        const inputs = block.querySelectorAll('.catalog__filter__input, .catalog__filter__checkbox__input');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                input.addEventListener('change', () => {
                    updateActiveFiltersDisplay();
                    ajaxUpdateFilters();
                });
            } else {
                input.addEventListener('blur', () => {
                    updateActiveFiltersDisplay();
                    ajaxUpdateFilters();
                });
            }
        });
    });

    updateActiveFiltersDisplay();
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