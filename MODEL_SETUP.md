# LLM Model Setup

This app uses a local LLM to extract medical visit data from OCR text. You need to download a quantized model file.

## Recommended Model

**Llama 3.2 1B Instruct (Quantized Q4_K_M)** - ~800MB

- Good balance of size, speed, and accuracy
- Works well on mobile devices

## Download Instructions

1. Download the model from Hugging Face:

   ```
   https://huggingface.co/bartowski/Llama-3.2-1B-Instruct-GGUF/blob/main/Llama-3.2-1B-Instruct-Q4_K_M.gguf
   ```

2. Place the model file in your project:
   - iOS: `ios/models/llama-model.gguf`
   - Android: `android/app/src/main/assets/models/llama-model.gguf`

3. Create the directories if they don't exist:

   ```bash
   mkdir -p ios/models
   mkdir -p android/app/src/main/assets/models
   ```

4. **Important for iOS**: Add the model to Xcode:
   - Open `ios/preclinicSurveyApp.xcworkspace` in Xcode
   - Drag `ios/models/llama-model.gguf` into the project navigator
   - Make sure "Copy items if needed" is **checked**
   - Make sure your app target is selected
   - The model will be bundled with your app

5. Initialize the model in your app (already done in `lib/llmUtils.ts`):

   ```typescript
   import { initializeModel } from "@/lib/llmUtils";

   // On-demand (already implemented in handleImportVisit)
   await initializeModel(); // Platform-specific paths handled automatically
   ```

## Alternative Models

If you want a smaller model:

- **TinyLlama 1.1B Q4_K_M** (~700MB)
  - https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF

If you want better accuracy (larger size):

- **Llama 3.2 3B Instruct Q4_K_M** (~2GB)
  - https://huggingface.co/bartowski/Llama-3.2-3B-Instruct-GGUF

## Notes

- The model file should NOT be committed to git (add to `.gitignore`)
- Each device will need to download the model separately
- First inference will be slow (~5-10 seconds), subsequent ones faster
