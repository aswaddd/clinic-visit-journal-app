import TextRecognition from "react-native-text-recognition";

export async function extractTextFromImage(imageUri: string): Promise<string> {
  try {
    const result = await TextRecognition.recognize(imageUri);
    const text = result.join("\n");
    return text;
  } catch (error) {
    console.error("OCR error:", error);
    throw error;
  }
}
