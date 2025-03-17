import React, {
  useState,
  ChangeEvent,
  useEffect,
  useRef,
  useMemo,
} from "react";
import "./ChatApp.css";
import { useOpenAIImageGenerator } from "./service-hooks/text-to-image/useOpenAIImageGenerator";
import {
  CHAT_TITLE,
  IMAGE_TO_TEXT_MODELS,
  TEXT_TO_IMAGE_MODELS,
} from "./constants";
import { useOpenAIImageToText } from "./service-hooks/image-to-text/useOpenAIImageToTextGenerator";
import { ChatHeader } from "./components/chat-header/ChatHeader";
import { ChatInput } from "./components/chat-input/ChatInput";

import { Message } from "./types/chat.types";
import { getLastImageUrls, getLastResponse } from "./utils/chatUtils";

import { ChatContainer } from "./components/chat-container/ChatContainer";
import {
  getImgResponseBotMsg,
  getTextResponsesBotMsg,
} from "./utils/actionUtils";
import { ErrorBanner } from "./components/error-banner/ErrorBanner";

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [responseError, setResponseError] = useState<string>("");
  const [generateTextForImage, setGenerateTextForImage] = useState(false);
  const messageBotRef = useRef<any>(null);
  const [completion, setCompletion] = useState(0);
  const startDescription = useRef<number>(0);
  const startImageRendering = useRef<number>(0);
  const [imgRendering, setImageRendering] = useState(true);
  const [promptCounter, setPromptCounter] = useState(0);

  const updateImageRendering = (val: boolean) => {
    setImageRendering(val);
  };

  const scrollToBottom = () => {
    messageBotRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const {
    generateImage,
    isLoading: imagesLoading,
    error: imgError,
  } = useOpenAIImageGenerator();

  const {
    generateDescriptions,
    loading: responseLoading,
    error: textError,
  } = useOpenAIImageToText();

  //Event handlers

  const updateResponseTimeForImageHandler = () => {
    setMessages((messages) => {
      let lastMessage = { ...messages[messages.length - 1] };
      lastMessage.metaData = {
        responseTime: performance.now() - startImageRendering?.current,
      };

      const copyMessages = [...messages.slice(0, -1), lastMessage];
      return copyMessages;
    });
  };

  const showAskFollowUp = useMemo(() => {
    return (
      getLastImageUrls(messages).length > 0 &&
      getLastResponse(messages).length > 0
    );
  }, [messages]);
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>,
    generateImagePrompt: string
  ): Promise<void> => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
    };

    const currentMessages = [...messages, userMessage];

    setMessages(currentMessages);
    setInputMessage("");
    setPromptCounter((count) => count + 1);
    if (generateImagePrompt === "image" || !generateTextForImage) {
      try {
        startImageRendering.current = performance.now();
        const newMessage = await getImgResponseBotMsg(
          generateImage,
          inputMessage
        );
        setMessages((messages) => [...messages, newMessage]);
        setGenerateTextForImage(true);
      } catch (err: unknown) {
        setResponseError(err instanceof Error ? err.message : String(err));
      }
    } else {
      try {
        const msgId = Date.now();
        startDescription.current = performance.now();
        Object.values(IMAGE_TO_TEXT_MODELS).forEach(async (model: string) => {
          const lastImageUrls = getLastImageUrls(messages);
          const setMessagesCB = (concatString: string) => {
            setMessages((messages) => {
              const lastMessageResponses =
                messages[messages.length - 1].responses;
              const botResponse: Message = {
                id: msgId,
                text: "",
                sender: "bot",
                responses: { ...lastMessageResponses, [model]: concatString },
              };
              return [...currentMessages, botResponse];
            });
          };

          await getTextResponsesBotMsg(
            generateDescriptions,
            lastImageUrls,
            model,
            inputMessage,
            setMessagesCB
          );

          setCompletion((completion) => completion + 1);
        });
      } catch (err: unknown) {
        setResponseError(err instanceof Error ? err.message : String(err));
      }
    }
  };
  // All Effects
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (imgError || textError) {
      setResponseError("Something Went Wrong");
      setImageRendering(false);
    }
  }, [imgError, textError]);

  useEffect(() => {
    if (completion === Object.values(TEXT_TO_IMAGE_MODELS).length) {
      setMessages((messages) => {
        let lastMessage = { ...messages[messages.length - 1] };
        lastMessage.metaData = {
          responseTime: performance.now() - startDescription?.current,
        };

        const copyMessages = [...messages.slice(0, -1), lastMessage];
        return copyMessages;
      });
      setCompletion(0);
    }
  }, [completion]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputMessage(e.target.value);
  };

  return (
    <div>
      {responseError && (
        <ErrorBanner
          errMessage="Something went Wrong"
          onClose={() => {
            setResponseError("");
            setMessages([]);
            setPromptCounter(0);
            setGenerateTextForImage(false);
            setImageRendering(false);
            setInputMessage("");
            setCompletion(0);
          }}
        />
      )}
      <ChatHeader title={CHAT_TITLE} promptCounter={promptCounter} />
      <div className="chat-container">
        <ChatContainer
          messages={messages}
          messageBotRef={messageBotRef}
          imagesLoading={imagesLoading}
          responsesLoading={responseLoading}
          updateResponseTimeForImageHandler={updateResponseTimeForImageHandler}
          imgRendering={imgRendering}
          updateImageRendering={updateImageRendering}
        />
        <form className="chat-input-form">
          <ChatInput
            handleChange={handleInputChange}
            inputMessage={inputMessage}
          />
          <button
            type="submit"
            className="send-button"
            onClick={(e) => {
              const callType = showAskFollowUp ? "image" : "";
              handleSubmit(e, callType);
            }}
          >
            {showAskFollowUp ? "Generate" : "Send"}
          </button>
          {showAskFollowUp && (
            <button
              type="submit"
              className="send-button"
              onClick={(e) => handleSubmit(e, "text")}
            >
              Ask followup
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatApp;
