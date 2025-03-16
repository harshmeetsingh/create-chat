import { ChangeEvent } from "react";
import styles from "./ChatInput.module.css";

interface ChatInputProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputMessage: string;
}

export const ChatInput = ({ handleChange, inputMessage }: ChatInputProps) => {
  return (
    <input
      autoFocus
      type="text"
      value={inputMessage}
      onChange={handleChange}
      placeholder="Type your message..."
      className={styles["chat-input"]}
    />
  );
};
