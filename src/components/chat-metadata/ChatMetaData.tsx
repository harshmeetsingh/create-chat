import { SuccessAnimation } from "../success-animation/SuccessAnimation";
import "./ChatMetaData.css";

export const ChatMetaData = ({ responseTime }: any) => {
  const responseTimeInSeconds =
    "Response time: " + (responseTime / 1000).toFixed(2) + "s";
  return (
    <div className="chat-metadata-container">
      {responseTime && (
        <div className="chat-response-time">{responseTimeInSeconds}</div>
      )}
      <div>{responseTime && <SuccessAnimation />}</div>
    </div>
  );
};
