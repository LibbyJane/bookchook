// import localStorage from '@/middleware/localStorage';

// const token = localStorage.getItem('userToken');
// 'authorization': `Bearer ${token}`,
export const token = "07692f41-5832-4f07-9c0a-070cdb7c1dfb";

export const apiBaseURL = import.meta.env.VITE_APP_API_BASE_URL;

export const config = {
    headers: {
        'content-type': 'application/json; charset=UTF-8',
        'authorization': `Bearer ${token}`
    }
}

export default { apiBaseURL, config, token }
