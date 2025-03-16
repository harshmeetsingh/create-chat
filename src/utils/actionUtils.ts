import { TEXT_TO_IMAGE_MODELS } from "../constants";
import { Message } from "../types/chat.types";

export async function getImgResponseBotMsg(
  generateImageCB: {
    (prompt: string, model: string): Promise<string | null | undefined>;
    (arg0: any, arg1: string): any;
  },
  inputMessage: string
) {
  const currentMsgId = Date.now();
  const models = Object.values(TEXT_TO_IMAGE_MODELS);

  // Create an array of promises for parallel execution
  const imagePromises = models.map((model) =>
    generateImageCB(inputMessage, model)
  );

  const generatedUrls = await Promise.all(imagePromises);

  const generategImageUrlMap: Record<string, string> = Object.fromEntries(
    models.map((model, index) => [model, generatedUrls[index] || ""])
  );

  const newMessage: Message = {
    id: currentMsgId,
    text: "",
    sender: "bot",
    images: generategImageUrlMap,
  };
  return newMessage;
}

export async function getTextResponsesBotMsg(
  generateDescriptionsCB: {
    (imageUrls: string[], prompt: string, model: string): Promise<any>;
    (arg0: any, arg1: any, arg2: any): any;
  },
  lastImageUrls: string[],
  model: string,
  inputMessage: string,
  setMessagesCB: (concatString: string) => void
) {
  const stream = await generateDescriptionsCB(
    lastImageUrls,
    inputMessage,
    model
  );

  let concatString = "";

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || "";
    concatString += content;
    setMessagesCB(concatString);
  }
}
