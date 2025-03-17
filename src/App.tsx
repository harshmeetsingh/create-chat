import React from "react";
import ChatApp from "./ChatApp";
import "./App.css";
import { ThemeToggle } from "./components/theme-toggle/ThemeToggle";

const App: React.FC = () => {
  return (
    <div>
      <ThemeToggle />
      <ChatApp />
    </div>
  );
};

export default App;
