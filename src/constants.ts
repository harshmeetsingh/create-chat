// model name has to be different because I am storing imgUrls as key value pairs to models
// added a pseudo different name with a prefix to handle three models -RP just tells its a Repeat model
// Can be handled in a much better way just did it as POC to show more than two models arer supported
export const TEXT_TO_IMAGE_MODELS = {
  Dall_E_3: "dall-e-3",
  DALL_E_2: "dall-e-2",
  DALL_E: "dall-e-2-RP",
};
export const IMAGE_TO_TEXT_MODELS = {
  GPT_4_O: "gpt-4o",
  GPT_4O_MINI: "gpt-4o-mini",
};

export const CHAT_TITLE = "Image Gen-Alyzer";

export const IMG_LOADING_TEXT = "Generating Images";
export const DESCRIPTION_LOADING_TEXT = "Generating responses";
