import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

/**
 * TODO: Add icons
 * TODO: Date and time picker integration
 * TODO: Form validation
 * TODO: Save button functionality
 * TODO: Form Submission
 */

export default function AddVisitPage() {
    const [formData, setFormData] = useState({
        dateTime: '',
        location: '',
        doctor: '',
        prescription: '',
        diagnosis: '',
        doctorNote: '',
        personalNote: '',
        nextVisit: '',
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.recordTitle}>
                        Create New Visit Record
                    </Text>
                    <Text>
                        Fill in the details from your medical visit below.
                    </Text>
                </View>

                <View>
                    <Text style={styles.label}>Date and Time</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g., January 17, 2026 at 2:00 PM"
                        value={formData.dateTime}
                        onChangeText={(value) => handleInputChange('dateTime', value)}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Location</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g., City Hospital"
                        value={formData.location}
                        onChangeText={(value) => handleInputChange('location', value)}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Doctor</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g., Dr. Smith"
                        value={formData.doctor}
                        onChangeText={(value) => handleInputChange('doctor', value)}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Diagnosis</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g., Common cold"
                        value={formData.diagnosis}
                        onChangeText={(value) => handleInputChange('diagnosis', value)}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Prescription</Text>
                    <TextInput
                        style={styles.multilineInput}
                        placeholder="e.g., Ibuprofen 400mg, twice daily"
                        value={formData.prescription}
                        onChangeText={(value) => handleInputChange('prescription', value)}
                        multiline
                    />
                </View>

                <View>
                    <Text style={styles.label}>Doctor's Note</Text>
                    <TextInput
                        style={styles.multilineInput}
                        placeholder="Notes from the doctor"
                        value={formData.doctorNote}
                        onChangeText={(value) => handleInputChange('doctorNote', value)}
                        multiline
                    />
                </View>

                <View>
                    <Text style={styles.label}>Personal Note</Text>
                    <TextInput
                        style={styles.multilineInput}
                        placeholder="Your personal observations"
                        value={formData.personalNote}
                        onChangeText={(value) => handleInputChange('personalNote', value)}
                        multiline
                    />
                </View>

                <View>
                    <Text style={styles.label}>Next Visit Date and Time</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g., February 1, 2026 at 10:00 AM"
                        value={formData.nextVisit}
                        onChangeText={(value) => handleInputChange('nextVisit', value)}
                    />
                </View>
                <Text style={styles.saveButton}>Save</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        gap: 20,
        paddingBottom: 40,
    },
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
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
    },
    multilineInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        minHeight: 80,
        textAlignVertical: 'top',
    },
    saveButton: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'flex-end'
    }
});