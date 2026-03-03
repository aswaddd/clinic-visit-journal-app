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
  llm: any,
): Promise<VisitFormData> {
  try {
    if (!llm?.isReady) {
      console.warn("LLM is not ready yet");
      return getEmptyFormData();
    }

    const systemPrompt = `You extract medical visit data from text. Return ONLY a JSON object with exactly 8 keys. No extra keys. No repeated keys. Stop after the closing }.

Rules:
- Use ONLY these keys: dateTime, location, doctor, diagnosis, prescription, doctorNote, personalNote, nextVisit
- Each key appears exactly once. Do not repeat any key.
- doctor must be a string (e.g. doctor name or department), never an object
- If multiple diagnoses or locations exist, combine into one string separated by commas
- Dates: YYYY-MM-DD or YYYY-MM-DD HH:MM. Examples: "02/23/2026"->"2026-02-23", "23 Feb 2026"->"2026-02-23"
- If a field is not found, use ""

Example (copy this structure exactly):
{"dateTime":"2026-02-23 14:30","location":"Ohio","doctor":"Dr. John Smith","diagnosis":"Hypertension","prescription":"Lisinopril 10mg daily","doctorNote":"BP elevated","personalNote":"","nextVisit":"2026-03-01"}`;

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

    // Strip markdown code blocks if present (e.g. ```json ... ```)
    const cleanedResponse = response
      .replace(/^```(?:json)?\s*\n?|\n?```\s*$/g, "")
      .trim();
    let jsonStr =
      cleanedResponse.match(/\{[\s\S]*\}/)?.[0] ??
      cleanedResponse.match(/\{[\s\S]*/)?.[0];
    if (!jsonStr) {
      console.warn(
        "No JSON found in LLM response, raw:",
        cleanedResponse.slice(0, 200),
      );
      return getEmptyFormData();
    }

    const extractedData = extractFirstValues(jsonStr);
    return {
      dateTime: normalizeDateField(extractedData.dateTime || ""),
      location: extractedData.location || "",
      doctor: extractedData.doctor || "",
      prescription: extractedData.prescription || "",
      diagnosis: extractedData.diagnosis || "",
      doctorNote: extractedData.doctorNote || "",
      personalNote: extractedData.personalNote || "",
      nextVisit: normalizeDateField(extractedData.nextVisit || ""),
    };
  } catch (error) {
    console.error("LLM extraction error:", error);
    return getEmptyFormData();
  }
}

function normalizeDateField(raw: string): string {
  if (!raw || !raw.trim()) return "";
  const d = new Date(raw.trim());
  if (Number.isNaN(d.getTime())) return raw;

  const hasTime = /\d{1,2}:\d{2}/.test(raw);
  if (hasTime) {
    return d.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const EXPECTED_KEYS = [
  "dateTime",
  "location",
  "doctor",
  "diagnosis",
  "prescription",
  "doctorNote",
  "personalNote",
  "nextVisit",
] as const;

/** Extract first occurrence of each key from JSON string. Prevents duplicate-key issues. */
function extractFirstValues(jsonStr: string): Partial<VisitFormData> {
  const result: Partial<VisitFormData> = {};
  for (const key of EXPECTED_KEYS) {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const strMatch = jsonStr.match(
      new RegExp(`"${escaped}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`),
    );
    if (strMatch) {
      result[key] = strMatch[1].replace(/\\"/g, '"');
      continue;
    }
    const objMatch = jsonStr.match(
      new RegExp(`"${escaped}"\\s*:\\s*\\{([^}]*)\\}`),
    );
    if (objMatch && key === "doctor") {
      const inner = objMatch[1];
      const dept = inner.match(/"department"\s*:\s*"([^"]*)"/)?.[1];
      const hosp = inner.match(/"hospital"\s*:\s*"([^"]*)"/)?.[1];
      result.doctor = dept || hosp || "";
    }
  }
  return result;
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
