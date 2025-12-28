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

    return (
        <View style={styles.container}>
            <Text style={styles.recordTitle}>
                Visit Record
            </Text>
            <FieldRecord title="Date and Time" icon='calendar' content={data.dateTime} />
            <FieldRecord title="Location" icon='map-pin' content={data.location} />
            <FieldRecord title="Doctor" icon='user' content={data.doctor} />
            <FieldRecord title="Prescription" icon='heart' content={data.prescription} />
            <FieldRecord title="Diagnosis" icon='clipboard' content={data.diagnosis} />
            <FieldRecord title="Doctor's Note" icon='book' content={data.doctorNote} />
            <FieldRecord title="Personal Note" icon='pen-tool' content={data.personalNote} />
            <FieldRecord title="Next Visit" icon='clock' content={data.nextVisit} />
        </View>
    )
}

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
        marginBottom: 10
    }
})