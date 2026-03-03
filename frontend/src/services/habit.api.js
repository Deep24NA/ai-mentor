const BASE_URL = "http://localhost:5000/api/habits";

export const fetchHabits = async () =>{
    const token = localStorage.getItem('token');
    if (!token) return []; // Don't fetch if no token
    
    try {
        const res = await fetch(BASE_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) return []; // Handle 401s
        return await res.json();
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const createHabit = async (title) =>{
    const token = localStorage.getItem('token');
    const res = await fetch(BASE_URL , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({title}),
    });

    return res.json();
}

export const toggleHabit = async (id) =>{
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/${id}/toggle`,{
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return res.json();
}

