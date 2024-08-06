// import localStorage from '@/middleware/localStorage';

// const token = localStorage.getItem('userToken');
// 'authorization': `Bearer ${token}`,
export const token = "7944ea10-6182-4373-96ce-76abae07ceb4";

export const apiBaseURL = import.meta.env.VITE_APP_API_BASE_URL;

export const config = {
    headers: {
        'content-type': 'application/json; charset=UTF-8',
        'authorization': `Bearer ${token}`
    }
}

export default { apiBaseURL, config, token }
