import { useState } from "react";
import { sendMessage } from "../services/api";
import Message from "./Message";
import { useProgress } from "../context/ProgressContext";
import { useHabits } from "../context/HabitContext";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const { streak, messagesToday } = useProgress();
  const { completedTodayCount, habits } = useHabits();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const reply = await sendMessage({
      message: input,
      streak,
      messagesToday,
      completedTodayCount,
      totalHabits: habits.length,
    });

    setMessages((prev) => [
      ...prev,
      { text: reply, sender: "mentor" },
    ]);

    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen p-4 bg-gray-100">
      <div
        className={`mb-4 flex flex-col gap-2 ${messages.length > 6
            ? "max-h-[70vh] overflow-y-auto"
            : ""
          }`}
      >
        {messages.map((msg, idx) => (
          <Message key={idx} text={msg.text} sender={msg.sender} />
        ))}
        {loading && (
          <p className="text-sm text-gray-500">Mentor typing...</p>
        )}
      </div>

      <div className="flex gap-2 mt-auto">
        <input
          className="flex-1 p-2 rounded border"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your AI Mentor..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );

}
