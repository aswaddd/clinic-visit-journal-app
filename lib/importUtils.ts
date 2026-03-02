import { router } from "expo-router";
import { Alert } from "react-native";
import { extractVisitDataFromText } from "./llmUtils";
import { extractTextFromImage } from "./ocrUtils";

/**
 * Shared pipeline: image URI → OCR → LLM extraction → navigate to add visit form.
 * Used by camera scan, photo import, and file import.
 */
export async function processImageAndNavigate(
  imageUri: string,
  llm: any,
  setProcessing: (v: boolean) => void,
) {
  try {
    const ocrText = await extractTextFromImage(imageUri);
    if (!ocrText.trim()) {
      Alert.alert("No Text Found", "Could not extract any text from the image.");
      return;
    }

    setProcessing(true);
    const formData = await extractVisitDataFromText(ocrText, llm);
    setProcessing(false);

    router.push({
      pathname: "../pages/addVisitPage",
      params: { formData: JSON.stringify(formData) },
    });
  } catch (error) {
    setProcessing(false);
    Alert.alert("Error", "Failed to process the image. Please try again.");
    console.error("Image processing error:", error);
  }
}

export function checkLLMReady(llm: any): boolean {
  if (!llm.isReady) {
    Alert.alert(
      "Model Loading",
      `The AI model is still loading (${(llm.downloadProgress * 100).toFixed(0)}%). Please wait and try again.`,
    );
    return false;
  }
  return true;
}
