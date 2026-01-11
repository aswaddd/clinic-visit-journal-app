import AsyncStorage from '@react-native-async-storage/async-storage';

export interface VisitRecord {
    dateTime: string;
    location: string;
    doctor: string;
    prescription: string;
    diagnosis: string;
    doctorNote: string;
    personalNote: string;
    nextVisit: string;
}

const STORAGE_KEY = 'healthJournalAppData';

export const loadVisits = async (): Promise<VisitRecord[]> => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Failed to load visits:', error);
        return [];
    }
};

export const saveVisits = async (visits: VisitRecord[]): Promise<void> => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(visits));
    } catch (error) {
        console.error('Failed to save visits:', error);
        throw error;
    }
};

export const addVisit = async (visit: VisitRecord): Promise<void> => {
    try {
        const visits = await loadVisits();
        visits.unshift(visit);
        await saveVisits(visits);
    } catch (error) {
        console.error('Failed to add visit:', error);
        throw error;
    }
};

export const deleteVisit = async (dateTime: string): Promise<void> => {
    try {
        const visits = await loadVisits();
        const filtered = visits.filter(v => v.dateTime !== dateTime);
        await saveVisits(filtered);
    } catch (error) {
        console.error('Failed to delete visit:', error);
        throw error;
    }
};

export const initializeDefaultData = async (): Promise<void> => {
    try {
        const existing = await AsyncStorage.getItem(STORAGE_KEY);
        if (!existing) {
            const defaultVisits: VisitRecord[] = [
                {
                    dateTime: 'December 20, 2024 at 3:00 PM',
                    location: 'Downtown Clinic',
                    doctor: 'Dr. Carter',
                    prescription: 'Ibuprofen 400mg',
                    diagnosis: 'Tension headache',
                    doctorNote: 'Hydrate and rest; follow up if symptoms persist.',
                    personalNote: 'Felt better after two days.',
                    nextVisit: 'January 5, 2025 at 10:00 AM',
                },
                {
                    dateTime: 'November 11, 2024 at 1:30 PM',
                    location: 'Midtown Health Center',
                    doctor: 'Dr. Lee',
                    prescription: 'Vitamin D 2000 IU daily',
                    diagnosis: 'Mild fatigue',
                    doctorNote: 'Check labs next visit; maintain sleep schedule.',
                    personalNote: 'Need to improve sleep routine.',
                    nextVisit: 'December 12, 2024 at 9:15 AM',
                },
                {
                    dateTime: 'October 3, 2024 at 4:15 PM',
                    location: 'Riverside Medical',
                    doctor: 'Dr. Singh',
                    prescription: 'Albuterol inhaler as needed',
                    diagnosis: 'Exercise-induced asthma',
                    doctorNote: 'Use inhaler before runs; monitor triggers.',
                    personalNote: 'Track symptoms after workouts.',
                    nextVisit: 'February 2, 2025 at 2:00 PM',
                },
                {
                    dateTime: 'September 9, 2024 at 9:45 AM',
                    location: 'Uptown Family Practice',
                    doctor: 'Dr. Rivera',
                    prescription: 'Amoxicillin 500mg, 7 days',
                    diagnosis: 'Sinus infection',
                    doctorNote: 'Complete antibiotics; use nasal rinse daily.',
                    personalNote: 'Remember to take doses with food.',
                    nextVisit: 'September 30, 2024 at 8:30 AM',
                },
                {
                    dateTime: 'August 1, 2024 at 2:20 PM',
                    location: 'Harbor Wellness',
                    doctor: 'Dr. Patel',
                    prescription: 'Physical therapy twice weekly',
                    diagnosis: 'Lower back strain',
                    doctorNote: 'Start PT; avoid heavy lifting for two weeks.',
                    personalNote: 'Stretch daily and log pain level.',
                    nextVisit: 'August 22, 2024 at 11:00 AM',
                },
            ];
            await saveVisits(defaultVisits);
        }
    } catch (error) {
        console.error('Failed to initialize default data:', error);
    }
};