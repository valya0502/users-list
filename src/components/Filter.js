export class Filter {
    constructor(users, filterCallback) {
        this.users = users;
        this.filterCallback = filterCallback;
        this.userTextFilter = document.getElementById('userTextFilter');
        this.selectedCompanies = new Set();
        this.searchQuery = '';

        this.companies = this.getUniqueCompanies();
        this.init();
    }

    /**
     * Get unique company names from users.
     * @returns {Array} Array of unique company names.
     */
    getUniqueCompanies() {
        const { users } = this
        if (!Array.isArray(users) || users.length === 0) return [];

        return [...new Set(users.map(user => user.company))];
    }

    /**
     * Initialize filter elements, including checkboxes and text input.
     */
    init() {
        const { users } = this
        if (!Array.isArray(users) || users.length === 0) return;

        this.createCompanyCheckboxes();

        this.userTextFilter.addEventListener('input', (event) => {
            this.searchQuery = event.target.value.toLowerCase();
            this.applyFilters();
        });
    }

    /**
     * Create checkboxes for filtering by companies.
     */
    createCompanyCheckboxes() {
        const { companies } = this
        const companyFilterContainer = document.getElementById('userCompanyFilter');
        companyFilterContainer.innerHTML = ''; // Очищуємо контейнер

        companies.forEach(company => {
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = company;

            checkbox.addEventListener('change', (event) => {
                event.target.checked ? this.selectedCompanies.add(company) : this.selectedCompanies.delete(company);
                this.applyFilters();
            });

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(company));
            companyFilterContainer.appendChild(label);
        });
    }

    /**
     * Apply filters to users based on text search and selected companies.
     */
    applyFilters() {
        const { users } = this
        const filteredUsers = users.filter(user => this.isUserMatchingFilter(user));
        this.filterCallback(filteredUsers);
    }

    /**
     * Check if a user matches the filter criteria.
     * @param {Object} user User to check.
     * @returns {boolean}
     */
    isUserMatchingFilter(user) {
        const { selectedCompanies } = this
        const matchesText = this.isUserMatchingText(user);
        const matchesCompany = selectedCompanies.size === 0 || selectedCompanies.has(user.company);

        return matchesText && matchesCompany;
    }

    /**
     * Check if a user matches the text search criteria.
     * @param {Object} user User to check.
     * @returns {boolean}
     */
    isUserMatchingText(user) {
        const searchLower = this.searchQuery.toLowerCase();
        return (
            user.name.toLowerCase().includes(searchLower) ||
            user.username.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower) ||
            user.phone.includes(searchLower) ||
            user.address.toLowerCase().includes(searchLower)
        );
    }

    /**
     * Enable or disable the text filter input based on user availability.
     */
    toggleTextFilter(isEnabled) {
        this.userTextFilter.disabled = !isEnabled;
        this.userTextFilter.value = '';
        this.searchQuery = '';
    }
}
