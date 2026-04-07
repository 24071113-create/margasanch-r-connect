import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { smsResponses } from "@/data/mockData";

interface Message {
  text: string;
  sender: "bot" | "user";
}

const OfflineSMS = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { text: "Welcome to MargaSanchār SMS Service.\nPlease enter your station code to continue.\n\nTry: 102", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [hasEnteredCode, setHasEnteredCode] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");

    const newMessages: Message[] = [...messages, { text: userMsg, sender: "user" }];

    const response = smsResponses[userMsg];
    if (response) {
      if (userMsg === "102") setHasEnteredCode(true);
      newMessages.push({ text: response, sender: "bot" });
    } else if (!hasEnteredCode) {
      newMessages.push({ text: "Invalid station code. Please enter a valid code (e.g., 102).", sender: "bot" });
    } else {
      newMessages.push({ text: "Invalid input, please try again.\nReply 1, 2, or 3.", sender: "bot" });
    }

    setMessages(newMessages);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] max-w-sm mx-auto">
      <div className="px-4 py-4">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-primary font-medium">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <h2 className="text-xl font-bold mt-2">📡 Offline Mode (SMS)</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-line ${
              msg.sender === "user"
                ? "bg-primary text-primary-foreground rounded-br-md"
                : "bg-card border rounded-bl-md shadow-sm"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 pb-4 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 p-3 rounded-xl border bg-card text-card-foreground"
        />
        <button onClick={handleSend} className="p-3 bg-primary text-primary-foreground rounded-xl shadow-md">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default OfflineSMS;
