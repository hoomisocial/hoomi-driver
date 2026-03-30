const ChatPage = () => {
  return (
    <div className="min-h-screen max-w-[430px] mx-auto pb-20">
      <div className="gradient-purple-header px-5 pt-10 pb-5">
        <h1 className="text-xl font-bold text-primary-foreground">Chat</h1>
      </div>
      <div className="flex-1 flex items-center justify-center px-5 mt-20">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">No messages yet</p>
          <p className="text-muted-foreground/70 text-sm mt-1">Your conversations will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
