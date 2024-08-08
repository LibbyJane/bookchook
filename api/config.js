// import localStorage from '@/middleware/localStorage';

// const token = localStorage.getItem('userToken');
// 'authorization': `Bearer ${token}`,
export const token = "d401ee67-62fc-406b-9bb0-3833ef147582";

export const apiBaseURL = import.meta.env.VITE_APP_API_BASE_URL;

export const config = {
    headers: {
        'content-type': 'application/json; charset=UTF-8',
        'authorization': `Bearer ${token}`
    }
}

export default { apiBaseURL, config, token }
