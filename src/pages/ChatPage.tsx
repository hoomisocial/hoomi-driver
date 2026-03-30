import { useState } from "react";
import { ChevronLeft, Phone, Paperclip, Send, CheckCheck } from "lucide-react";

interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
}

interface Message {
  id: string;
  text: string;
  time: string;
  fromMe: boolean;
  read?: boolean;
}

const contacts: ChatContact[] = [
  {
    id: "1",
    name: "William Doe",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Hello Ocha! lorem ipsum set dolor",
  },
  {
    id: "2",
    name: "Angel Septimus",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Hello Ocha! lorem ipsum set dolor",
  },
  {
    id: "3",
    name: "Rayna Bator",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Hello Ocha! lorem ipsum set dolor",
  },
  {
    id: "4",
    name: "Cristofer Culhane",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Hello Ocha! lorem ipsum set dolor",
  },
  {
    id: "5",
    name: "Leo Lipshutz",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Hello Ocha! lorem ipsum set dolor",
  },
  {
    id: "6",
    name: "Martin Dokidis",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Hello Ocha! lorem ipsum set dolor",
  },
];

const dummyMessages: Record<string, Message[]> = {
  "1": [
    { id: "m1", text: "Hi, good morning", time: "09:41", fromMe: true, read: true },
    { id: "m2", text: "could you please make sure to put some extra", time: "09:41", fromMe: false },
  ],
  "2": [
    { id: "m1", text: "Hello Angel, I'm on my way", time: "10:15", fromMe: true, read: true },
    { id: "m2", text: "Great, I'll be waiting at the gate", time: "10:16", fromMe: false },
  ],
  "3": [
    { id: "m1", text: "Hi Rayna, your order is ready", time: "11:00", fromMe: true, read: true },
    { id: "m2", text: "Thank you! Coming down now", time: "11:02", fromMe: false },
  ],
};

const ChatPage = () => {
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [inputValue, setInputValue] = useState("");

  if (selectedContact) {
    const messages = dummyMessages[selectedContact.id] || [];
    return (
      <div className="min-h-screen max-w-[430px] mx-auto flex flex-col bg-background">
        {/* Chat header */}
        <div className="flex items-center gap-3 px-5 pt-12 pb-4 bg-card border-b border-border">
          <button
            onClick={() => setSelectedContact(null)}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          >
            <ChevronLeft size={22} className="text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground flex-1">{selectedContact.name}</h1>
          <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <Phone size={18} className="text-primary" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 px-5 py-6 space-y-4 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                  msg.fromMe
                    ? "gradient-purple text-primary-foreground rounded-br-md"
                    : "bg-card text-foreground rounded-bl-md"
                }`}
              >
                <p className="text-[15px]">{msg.text}</p>
                <div className={`flex items-center gap-1 justify-end mt-1 ${msg.fromMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  <span className="text-[11px]">{msg.time}</span>
                  {msg.fromMe && msg.read && <CheckCheck size={14} />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input bar */}
        <div className="px-4 pb-6 pt-3 bg-card border-t border-border">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-3 bg-muted rounded-full px-4 py-3">
              <Paperclip size={20} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Type a message"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-transparent flex-1 outline-none text-foreground placeholder:text-muted-foreground text-sm"
              />
            </div>
            <button className="w-12 h-12 rounded-full gradient-purple flex items-center justify-center flex-shrink-0">
              <Send size={18} className="text-primary-foreground" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-[430px] mx-auto pb-20">
      {/* Header */}
      <div className="gradient-purple-header px-5 pt-10 pb-5">
        <h1 className="text-xl font-bold text-primary-foreground">Chats</h1>
      </div>

      {/* Contact list */}
      <div className="divide-y divide-border">
        {contacts.map((contact) => (
          <button
            key={contact.id}
            onClick={() => setSelectedContact(contact)}
            className="w-full flex items-center gap-4 px-5 py-4 text-left active:bg-muted/50 transition-colors"
          >
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-foreground">{contact.name}</p>
              <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatPage;
