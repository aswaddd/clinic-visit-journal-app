export interface VisitFormData {
  dateTime: string;
  location: string;
  doctor: string;
  prescription: string;
  diagnosis: string;
  doctorNote: string;
  personalNote: string;
  nextVisit: string;
}

export async function extractVisitDataFromText(
  ocrText: string,
  llm: any, // The LLM instance from useLLM hook
): Promise<VisitFormData> {
  try {
    if (!llm?.isReady) {
      console.warn("LLM is not ready yet");
      return getEmptyFormData();
    }

    // Build a simple prompt
    const systemPrompt = `You are a medical data extraction assistant. Extract medical visit information from text and return ONLY a valid JSON object.

                          Extract these fields:
                          - dateTime: date and time of the visit (format: "Month DD, YYYY at HH:MM AM/PM"). If time is not specified, use "at 00:00 AM"
                          - location: clinic or hospital location name
                          - doctor: doctor's name
                          - diagnosis: medical diagnosis or findings
                          - prescription: medications and duration
                          - doctorNote: clinical notes from doctor
                          - personalNote: any other information not captured above
                          - nextVisit: scheduled date and time for next visit (same format as dateTime). If time is not specified, use "at 00:00 AM"

                          If a field is not found, use empty string ("").

                          Example output format:
                          {
                            "dateTime": "February 23, 2026 at 9:41 PM",
                            "location": "Ohio",
                            "doctor": "John",
                            "diagnosis": "medical condition",
                            "prescription": "drug names, duration, dosage",
                            "doctorNote": "clinical observations",
                            "personalNote": "patient notes or unidentified info",
                            "nextVisit": "February 28, 2026 at 9:41 PM"
                          }

                          IMPORTANT: Return ONLY the JSON object, no other text, no explanation. no labels. just the JSON starting and ending with {}.`;

    const userPrompt = `Extract medical visit data from this text:\n\n${ocrText}`;

    console.log("Starting LLM generation with generate...");
    const response = await llm.generate([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ]);
    console.log("Generation completed");
    console.log("LLM Raw Response:", response);
    console.log("Response length:", response?.length ?? 0);

    if (!response || response.trim() === "") {
      console.warn("Empty response from LLM");
      return getEmptyFormData();
    }

    // Parse the LLM response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.warn("No JSON found in LLM response, raw:", response);
      return getEmptyFormData();
    }

    const extractedData = JSON.parse(jsonMatch[0]) as VisitFormData;
    return {
      dateTime: extractedData.dateTime || "",
      location: extractedData.location || "",
      doctor: extractedData.doctor || "",
      prescription: extractedData.prescription || "",
      diagnosis: extractedData.diagnosis || "",
      doctorNote: extractedData.doctorNote || "",
      personalNote: extractedData.personalNote || "",
      nextVisit: extractedData.nextVisit || "",
    };
  } catch (error) {
    console.error("LLM extraction error:", error);
    return getEmptyFormData();
  }
}

function getEmptyFormData(): VisitFormData {
  return {
    dateTime: "",
    location: "",
    doctor: "",
    prescription: "",
    diagnosis: "",
    doctorNote: "",
    personalNote: "",
    nextVisit: "",
  };
}
