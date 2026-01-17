import AsyncStorage from "@react-native-async-storage/async-storage";

export interface VisitRecord {
  id?: string;
  dateTime: string;
  location: string;
  doctor: string;
  prescription: string;
  diagnosis: string;
  doctorNote: string;
  personalNote: string;
  nextVisit: string;
}

const STORAGE_KEY = "healthJournalAppData";

export const loadVisits = async (): Promise<VisitRecord[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load visits:", error);
    return [];
  }
};

export const saveVisits = async (visits: VisitRecord[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(visits));
  } catch (error) {
    console.error("Failed to save visits:", error);
    throw error;
  }
};

export const addVisit = async (visit: VisitRecord): Promise<void> => {
  try {
    const visits = await loadVisits();
    const newVisit = {
      id: Date.now().toString(),
      ...visit,
    };
    visits.unshift(newVisit);
    await saveVisits(visits);
  } catch (error) {
    console.error("Failed to add visit:", error);
    throw error;
  }
};

export const deleteVisit = async (id: string): Promise<void> => {
  try {
    const visits = await loadVisits();
    const filtered = visits.filter((v) => v.id !== id && v.dateTime !== id);
    await saveVisits(filtered);
  } catch (error) {
    console.error("Failed to delete visit:", error);
    throw error;
  }
};

export const updateVisit = async (
  id: string,
  updatedVisit: VisitRecord,
): Promise<void> => {
  try {
    const visits = await loadVisits();
    const index = visits.findIndex((v) => v.id === id);
    if (index !== -1) {
      visits[index] = { ...updatedVisit, id };
      await saveVisits(visits);
    } else {
      throw new Error("Visit not found");
    }
  } catch (error) {
    console.error("Failed to update visit:", error);
    throw error;
  }
};
