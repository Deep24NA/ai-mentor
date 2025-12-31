const BASE_URL = "http://localhost:5000/api/habits";

export const fetchHabits = async () =>{
    const res = await fetch(BASE_URL);
    return res.json();
}

export const createHabit = async (title) =>{
    const res = await fetch(BASE_URL , {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify({title}),
    });

    return res.json();
}

export const toggleHabit = async (id) =>{
    const res = await fetch(`${BASE_URL}/${id}/toggle`,{
        method: "PATCH",
    });

    return res.json();
}

