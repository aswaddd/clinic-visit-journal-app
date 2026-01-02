import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FieldRecord from './FieldRecord';

type Props = {
    dateTime: string,
    location: string,
    doctor: string,
    prescription: string,
    diagnosis: string,
    doctorNote: string,
    personalNote: string,
    nextVisit: string,
}

export default function PastVisit(props: Props){
    const data = props;
    const [showMore, setShowMore] = useState(false);

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.recordTitle}>
                    Visit Record
                </Text>
                <Text style={styles.editButton} onPress={() => alert('Edit feature coming soon!')}>Edit</Text>
            </View>
            <FieldRecord title="Date and Time" icon='calendar' content={data.dateTime} />
            <FieldRecord title="Location" icon='map-pin' content={data.location} />
            <FieldRecord title="Doctor" icon='user' content={data.doctor} />
            {showMore && <FieldRecord title="Prescription" icon='heart' content={data.prescription} />}
            {showMore && <FieldRecord title="Diagnosis" icon='clipboard' content={data.diagnosis} />}
            {showMore && <FieldRecord title="Doctor's Note" icon='book' content={data.doctorNote} />}
            {showMore && <FieldRecord title="Personal Note" icon='pen-tool' content={data.personalNote} />}
            {showMore && <FieldRecord title="Next Visit" icon='clock' content={data.nextVisit} />}
            {showMore ?
                <Text style={styles.showMoreButton} onPress={() => setShowMore(false)}>Show Less</Text>
                :
                <Text style={styles.showMoreButton} onPress={() => setShowMore(true)}>Show More</Text>
            }
        </View>
    )
}
/**
 * TODO: edit button integration
 * TODO: users can edit this component to reorder what info they want to see first.
 */

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 18,
        borderColor: '#007AFF',
        justifyContent: 'flex-start',
        padding: 30,
        width: '90%',
        gap: 20,
    },
    recordTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    editButton: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 16,
    },
    showMoreButton: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'flex-end'
    }
})