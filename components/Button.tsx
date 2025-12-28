import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

type Props = {
    label: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
};

export default function Button({ label, onPress, style }: Props) {
    return (
        <View style={[styles.buttonContainer, style]} >
            <Pressable onPress={onPress} style={[styles.button]} >
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonLabel: {
        color: '#000000ff',
        fontSize: 16,
    },
});