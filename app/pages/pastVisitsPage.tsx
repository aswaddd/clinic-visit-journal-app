import PastVisit from "@/components/PastVisit";
import { ScrollView, StyleSheet } from "react-native";

/**
 * TODO: search, sort & filter for record history, calendar view? perhaps later.
 */

const visits = [
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

export default function PastVisitsPage() {
    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            {visits.map((visit, index) => (
                <PastVisit key={`${visit.dateTime}-${index}`} {...visit} />
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        gap: 20,
    }
});