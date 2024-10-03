import { API_ENDPOINTS } from '../constants/api.constants';
export class ApiService {
    static async fetchUsers() {
        try {
            const response = await fetch(API_ENDPOINTS.USERS);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            return await response.json();
        } catch (error) {
            console.error('API error:', error);
            return [];
        }
    }
}