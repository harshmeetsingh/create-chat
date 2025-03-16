import { useState } from "react";
import { OpenAI } from "openai";
import { API_KEY } from "../../utils/apiKeyUtils";

const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });

export function useOpenAIImageToText() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateDescriptions = async (
    imageUrls: string[],
    prompt: string,
    model: string
  ): Promise<any> => {
    setLoading(true);
    setError(null);

    try {
      const messages = [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
            ...imageUrls.map((url) => ({
              type: "image_url",
              image_url: {
                url,
              },
            })),
          ],
        },
      ];

      const response = await openai.chat.completions.create({
        model: model,
        messages: messages as any, // Type assertion needed due to OpenAI types
        max_tokens: 500,
        stream: true,
      });

      setLoading(false);
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Error extracting text from images:", error);
      setError(errorMessage);
      setLoading(false);

      return {
        success: false,
        descriptions: [],
        error: errorMessage,
      };
    }
  };

  return {
    generateDescriptions,
    loading,
    error,
  };
}
