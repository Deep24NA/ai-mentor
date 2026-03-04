const BASE_URL = "http://localhost:5000/api/reflections";

export const generateReflection = async (payload) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
    });

    return res.json();
};

export const fetchReflectionHistory = async (page = 1, limit = 7) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/history?page=${page}&limit=${limit}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return res.json();
};

export const fetchWeeklySummary = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/weekly-summary`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return res.json();
};

export const fetchMemoryInsights = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/memory-insights`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return res.json();
};
