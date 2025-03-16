import { useState } from "react";
import { OpenAI } from "openai";
import { API_KEY } from "../../utils/apiKeyUtils";

const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });

export function useOpenAIImageGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async (prompt: string, model: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await openai.images.generate({
        model: model, // or "dall-e-2"
        prompt: prompt,
        n: 1, // Number of images
        size: "1024x1024", // Image resolution
      });

      return response.data[0].url;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while generating the image";
      setError(errorMessage);
      console.error("Error generating image:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateImage,
    isLoading,
    error,
  };
}
