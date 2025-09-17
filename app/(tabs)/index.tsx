import { Text, SafeAreaView, View } from "react-native";
import Button from '@/components/Button';

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ flex: 1, padding: 20, color:'#4b4b4bff' }}>Help your doctor understand your symptoms better with our simple tools</Text>
      <View style={{ flex: 2, gap: 15 }}>
        <Button 
          label="Describe your symptoms" 
          onPress={() => alert("Button Clicked!")}
          style={{ borderWidth: 1, borderRadius: 18, borderColor:'#007AFF' }}  
        />
        <Button 
          label="Take survey" 
          onPress={() => alert("Button Clicked!")}
          style={{ borderWidth: 1, borderRadius: 18, borderColor:'#007AFF' }}  
        />
      </View>
    </SafeAreaView>
  );
}
