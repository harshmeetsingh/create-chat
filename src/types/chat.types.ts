export interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  images?: Record<string, string>;
  responses?: any;
  metaData?: any;
}
