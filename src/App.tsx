import React from "react";
import ChatApp from "./ChatApp";
import "./App.css";
import { ThemeToggle } from "./components/theme-toggle/ThemeToggle";
import { SuccessAnimation } from "./components/success-animation/SuccessAnimation";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatAppProps {
  initialMessages?: Message[];
  theme?: "light" | "dark";
  userName?: string;
}

const App: React.FC = () => {
  return (
    <div>
      <ThemeToggle />
      <ChatApp />
    </div>
  );
};

export default App;
