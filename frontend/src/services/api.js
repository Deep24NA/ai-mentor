export const sendMessage = async (payload) => {
  const res = await fetch("http://localhost:5000/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: payload.message,
      streak: payload.streak,
      messagesToday: payload.messagesToday,         
      completedTodayCount: payload.completedTodayCount,
      totalHabits: payload.totalHabits,             
    }),
  });

  const data = await res.json();
  return data.reply;
};
