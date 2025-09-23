document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        const choices = new Choices(sortSelect, {
            searchEnabled: false,
            shouldSort: false,
            placeholder: true,
            placeholderValue: 'По умолчанию',
            itemSelectText: '',
        });
    }
});
