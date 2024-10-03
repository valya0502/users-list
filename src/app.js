import './style/style.scss';
import { UserList } from './components/UserList';

document.addEventListener('DOMContentLoaded', () => {
    new UserList().init();
});
