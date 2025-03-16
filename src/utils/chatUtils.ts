import { Message } from "../types/chat.types";

export const getLastImageUrls = (messages: Message[]): string[] => {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].sender === "bot" && messages[i].images) {
      return Object.values(messages[i].images || {}) ?? [];
    }
  }
  return [];
};

export const getLastResponse = (messages: Message[]) => {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].sender === "bot" && messages[i].responses) {
      return Object.values(messages[i].responses || {}) ?? [];
    }
  }
  return [];
};
