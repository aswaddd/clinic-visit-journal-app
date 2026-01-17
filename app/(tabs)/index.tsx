import Button from '@/components/Button';
import { router } from 'expo-router';
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {

  const handleAddNewVisit = () => {
    router.push('../pages/addVisitPage');
  };

  const handleSeePastVisit = () => {
    router.push('../pages/pastVisitsPage');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1, gap: 15, justifyContent: 'center', alignItems: 'center' }}>
        <Button 
          label="Add visit record" 
          onPress={handleAddNewVisit}
          style={styles.button}  
        />
        <Button 
          label="See past visits" 
          onPress={handleSeePastVisit}
          style={styles.button}  
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 18,
    borderColor: '#007AFF',
  },
});
