import { User } from './User';
import { Filter } from './Filter';
import { ApiService } from '../services/api.service';

export class UserList {
    constructor() {
        this.users = [];
        this.filteredUsers = [];
        this.userListElement = document.getElementById('userList');
        this.preloader = this.createPreloader();
        document.body.appendChild(this.preloader);
    }

    /**
     * Create a preloader element.
     * @returns {HTMLElement} Preloader element.
     */
    createPreloader() {
        const preloader = document.createElement('div');
        preloader.classList.add('preloader');
        preloader.innerText = 'Loading...';
        preloader.style.display = 'none';
        return preloader;
    }

    /**
     * Initialize the user list by fetching users and rendering them.
     */
    async init() {
        this.showPreloader();

        try {
            const usersData = await ApiService.fetchUsers();
            this.users = usersData.map(user => new User(user));
            this.filteredUsers = [...this.users];
            this.renderUsers();

            this.filterComponent = new Filter(this.users, (filteredUsers) => {
                this.updateFilteredUsers(filteredUsers);
            });

            this.filterComponent.toggleTextFilter(this.users.length > 0);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            this.hidePreloader();
        }
    }

    updateFilteredUsers(filteredUsers) {
        this.filteredUsers = filteredUsers;
        this.renderUsers();
    }
    showPreloader() {
        this.preloader.style.display = 'block';
    }

    hidePreloader() {
        this.preloader.style.display = 'none';
    }

    /**
     * Render the list of users to the DOM.
     */
    renderUsers() {
        this.userListElement.innerHTML = '';

        if (this.filteredUsers.length === 0) {
            this.userListElement.innerHTML = '<p>No users found.</p>';
            return;
        }

        this.filteredUsers.forEach(user => {
            this.userListElement.appendChild(user.createCard());
        });
    }
}
