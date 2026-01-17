import PastVisit from "@/components/PastVisit";
import { loadVisits, VisitRecord } from "@/lib/storageUtils";
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";

/**
 * TODO: when one visit is expanded (showMore is true) then the others will collapse.
 * Maybe the user can set this to their preference as well.
 * TODO: add pull to refresh functionality
 * TODO: add "no visits recorded" message
 * TODO: add filtering/sorting options
 * TODO: add search functionality
 */

export default function PastVisitsPage() {
    const [visits, setVisits] = useState<VisitRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const loadedVisits = await loadVisits();
            setVisits(loadedVisits);
        } catch (error) {
            console.error('Error loading visits:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            {visits.length === 0 ? (
                <Text>No visit records found.</Text>
            ) : (
                visits.map((visit, index) => (
                    <PastVisit key={`${visit.dateTime}-${index}`} {...visit} />
                ))
            )}
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