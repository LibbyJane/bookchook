// import localStorage from '@/middleware/localStorage';

// const token = localStorage.getItem('bookerToken');
let token = null;

export const apiBaseURL = import.meta.env.VITE_APP_API_BASE_URL;

export const config = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'authorization': `Bearer ${token}`
    }
}

export default { apiBaseURL, config }
