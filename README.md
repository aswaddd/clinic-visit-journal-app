# clinic visit journal app

a digital storage app for your clinic visit records. take photos of your physical prescriptions and medical visit records, and store them securely on your phone. all storage is local and the llm model runs locally to ensure your privacy and security (unless your phone itself is compromised).

## setup

1. install dependencies

   ```bash
   npm install
   ```

2. start the app

   ```bash
   npx expo start
   ```

   in the output, you'll find options to open the app in an [android emulator](https://docs.expo.dev/workflow/android-studio-emulator/), [ios simulator](https://docs.expo.dev/workflow/ios-simulator/), or [expo go](https://expo.dev/go).

## how to use

1. **add a visit**: tap the "manual" button under "new visit" and fill in visit details (date, doctor, clinic name, etc.).
2. **capture records**: take a photo of your prescription or medical record. the app will extract and organize the text using local ocr and llm processing.
3. **view your history**: browse past visits in the "past visits" tab to review all your stored records.
4. **edit or delete**: tap any visit to edit details or delete records as needed.

## notes

currently supports image formats: **jpeg** and **png**. future plans include pdf support, multi-file uploads, user profiles, visit reminders, and cloud sync options.
