// import localStorage from '@/middleware/localStorage';

// const token = localStorage.getItem('userToken');
// 'authorization': `Bearer ${token}`,
export const token = "784ec1c7-c9f6-4072-bc3a-a2e8f57b2617";

export const apiBaseURL = import.meta.env.VITE_APP_API_BASE_URL;

export const config = {
    headers: {
        'content-type': 'application/json; charset=UTF-8',
        'authorization': `Bearer ${token}`
    }
}

export default { apiBaseURL, config, token }
