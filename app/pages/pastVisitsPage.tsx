import PastVisit from "@/components/PastVisit";
import { ScrollView, StyleSheet } from "react-native";

const data = {
        dateTime: 'December 20, 2024 at 3:00 PM',
        location: 'location',
        doctor: 'doctor',
        prescription: '10000 xanax pills',
        diagnosis: 'you gon die twin',
        doctorNote: 'its so over brotato',
        personalNote: 'drake is so zesty',
        nextVisit: 'nextVisit',
    }

export default function PastVisitsPage() {
    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <PastVisit {...data} />
            <PastVisit {...data} />
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