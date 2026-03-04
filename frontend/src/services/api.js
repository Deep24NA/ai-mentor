export const sendMessage = async (payload) => {
  const token = localStorage.getItem('token');
  const res = await fetch("http://localhost:5000/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Bearer ${token}` })
    },
    body: JSON.stringify({
      message: payload.message,
      mode: payload.mode,
      category: payload.category,
      personality: payload.personality || "Friendly Assistant",
      streak: payload.streak,
      messagesToday: payload.messagesToday,         
      completedTodayCount: payload.completedTodayCount,
      totalHabits: payload.totalHabits,             
    }),
  });

  const data = await res.json();
  return data?.data?.aiResponse || data?.reply || "I didn't quite catch that. Try again.";
};

export const fetchChatHistory = async (page = 1, limit = 20) => {
  const token = localStorage.getItem('token');
  if (!token) return [];
  
  try {
      const res = await fetch(`http://localhost:5000/api/chat/history?page=${page}&limit=${limit}`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      if (!res.ok) return [];
      const data = await res.json();
      return data.data || [];
  } catch (error) {
      console.error("Failed to fetch chat history:", error);
      return [];
  }
};
