export default function Message ({text , sender}){
    const isUser = sender === "user";

    return(
            <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`px-5 py-3 rounded-2xl max-w-[80%] text-[15px] leading-relaxed relative ${
          isUser
            ? "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white shadow-md rounded-tr-sm"
            : "glass-card border-white/10 text-gray-100 rounded-tl-sm shadow-sm"
        }`}
      >
        {text}
      </div>
    </div>
    )


}