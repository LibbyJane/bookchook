// import localStorage from '@/middleware/localStorage';

// const token = localStorage.getItem('userToken');
// 'authorization': `Bearer ${token}`,
export const token = "ae98ddc7-0519-4628-9c9e-54fe01804938";

export const apibase_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const config = {
    headers: {
        'content-type': 'application/json; charset=UTF-8',
        'authorization': `Bearer ${token}`
    }
}

export default { apibase_URL, config, token }
