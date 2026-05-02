import React from "react";
import ChatBot from "react-chatbotify";

function App() {
  const flow = {
    start: {
      message: "Ask me anything 🤖",
      // This waits for the first message and sends it to 'process_chat'
      path: "process_chat", 
    },

    process_chat: {
      message: async (params) => {
        try {
          const res = await fetch("http://localhost:8000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: params.userInput }),
          });

          const data = await res.json();
          return data.reply || "No reply from AI";
        } catch (err) {
          console.error("Frontend Error:", err);
          return "⚠️ Error connecting to backend";
        }
      },
      // This creates the loop: after the AI replies, it waits for 
      // the next user input and triggers 'process_chat' again.
      path: "process_chat", 
    },
  };

  // --- THE MISSING RENDER LOGIC ---
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      marginTop: "50px" 
    }}>
      <h1>AI Chatbot 🚀</h1>
      <ChatBot flow={flow} />
    </div>
  );
}

export default App;