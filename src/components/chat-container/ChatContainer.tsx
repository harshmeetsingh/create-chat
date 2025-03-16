import { useRef, useState } from "react";
import { DESCRIPTION_LOADING_TEXT, IMG_LOADING_TEXT } from "../../constants";
import { Message } from "../../types/chat.types";
import { ImageResponses } from "../image-response/ImageResponses";
import { Loader } from "../loader/Loader";
import { MessageResponse } from "../message-response/MessageResponse";
import "./ChatContainer.css";

interface ChatContainerProps {
  messages: Message[];
  imagesLoading: boolean;
  responsesLoading: boolean;
  messageBotRef: {
    current: any;
  };
  updateResponseTimeForImageHandler: any;
  imgRendering: boolean;
  updateImageRendering: (val: boolean) => void;
}
export const ChatContainer = ({
  messages,
  imagesLoading,
  responsesLoading,
  messageBotRef,
  updateResponseTimeForImageHandler,
  imgRendering,
  updateImageRendering,
}: ChatContainerProps) => {
  const imgLoading = imagesLoading || imgRendering;
  const completeImageRender = () => {
    updateImageRendering(false);
    updateResponseTimeForImageHandler();
  };
  return (
    <>
      {messages.length > 0 && (
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id + message.sender}
              className={`message ${
                message.sender === "user" ? "user-message" : "bot-message"
              }`}
            >
              {message.sender === "bot" &&
              Object.keys(message.responses || {})?.length > 0 ? (
                <MessageResponse
                  responses={message.responses}
                  metaData={message.metaData}
                />
              ) : (
                <div ref={messageBotRef} className="message-text">
                  {message.text}
                </div>
              )}

              {message.images && (
                <ImageResponses
                  images={message.images}
                  metaData={message.metaData}
                  completeImageRender={completeImageRender}
                />
              )}
            </div>
          ))}
          {(imgLoading || responsesLoading) && (
            <div
              key="loading-placeholder"
              className={`message ${"bot-message"}`}
            >
              <Loader
                suffix={
                  imgLoading ? IMG_LOADING_TEXT : DESCRIPTION_LOADING_TEXT
                }
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
