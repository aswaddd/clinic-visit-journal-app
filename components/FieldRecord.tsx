import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    title: string;
    icon: string;
    content: string;
}

export default function FieldRecord(props: Props) {
    const { title, icon, content } = props;
    return (
        <View style={{gap: 10}}>
            <View style={styles.fieldHeader}>
                <Feather name={icon as any} size={24} color="blue"  style={{marginRight: 10}}/>
                <Text style={styles.fieldTitle}>{title}</Text>
            </View>
            <Text style={styles.fieldBody}>{content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    fieldHeader: {
        flexDirection: 'row',
    },
    fieldTitle: {
        color: '#383838ff',
        fontSize: 16,
    },
    fieldBody: {
        marginLeft: 35,
        marginBottom: 10,
        fontSize: 20,
        color: '#000000ff',
    }
});