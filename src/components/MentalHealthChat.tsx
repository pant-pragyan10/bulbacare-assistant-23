
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, AlertTriangle, Bot, ArrowDown } from "lucide-react";
import { getMentalHealthResponse } from "@/utils/mentalHealthApi";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const MentalHealthChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm Dr. Well Being, your mental health assistant. I'm here to listen and provide support. How are you feeling today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);
    
    try {
      // Get response from the Mental Health API
      const response = await getMentalHealthResponse(userMessage.text);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error in chat:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I encountered an issue while processing your message. Please try again.",
        sender: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px] rounded-xl border border-border/60 bg-white overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between bg-background/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Dr. Well Being</h3>
            <p className="text-xs text-muted-foreground">AI-powered mental health support</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="text-xs h-8">
          <AlertTriangle className="h-3.5 w-3.5 mr-1" />
          Emergency Help
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] md:max-w-[70%] rounded-lg px-4 py-3 ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <div className="text-sm">{message.text}</div>
              <div
                className={`text-xs mt-1 ${
                  message.sender === "user"
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                }`}
              >
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-3 bg-muted">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messageEndRef} />
      </div>
      
      <div className="p-4 border-t bg-background/50">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="glass-input"
          />
          <Button type="submit" size="icon" className="button-glow">
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <div className="mt-2 text-xs text-muted-foreground text-center">
          Your conversations are private and secure
        </div>
      </div>
    </div>
  );
};

export default MentalHealthChat;
