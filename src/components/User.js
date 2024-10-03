export class User {
    constructor(userData) {
        const { name, username, email, phone, website, company, address } = userData;

        this.name = name;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.website = website;
        this.company = company.name;
        this.address = this.formatAddress(address);
    }

    /**
     * Format the address into a readable string.
     * @param {Object} address User's address data.
     * @returns {string} Formatted address.
     */
    formatAddress(address) {
        const { street, suite, city, zipcode } = address;
        return `${street}, ${suite}, ${city}, ${zipcode}`;
    }

    /**
     * Create a user card element.
     * @returns {HTMLElement} User card element.
     */
    createCard() {
        const card = document.createElement('div');
        card.classList.add('user-card');

        card.innerHTML = `
            <h3 class="user-card__name">${this.name}</h3>
            <p class="user-card__username">${this.username}</p>
            <p><strong>Email: </strong><a href="mailto:${this.email}">${this.email}</a></p>
            <p><strong>Phone: </strong>${this.phone}</p>
            <p><strong>Website: </strong><a href="http://${this.website}" target="_blank">${this.website}</a></p>
            <p><strong>Company: </strong>${this.company}</p>
            <p><strong>Address: </strong>${this.address}</p>
        `;

        return card;
    }
}
