import ChatBox from "../components/chat/ChatBox";

export default function Chat() {
  return (
    // ✅ removed h-full — let ChatBox size itself naturally inside the scrollable main
    <div className="flex flex-col max-w-6xl mx-auto w-full h-[calc(100vh-8rem)]">
      <ChatBox />
    </div>
  );
}
