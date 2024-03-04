import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import AppNavigation from "./src/navigation";
import { NavigationContainer } from "@react-navigation/native";
export default function App() {
  return (
    <View className="flex-1 h-screen">
      <StatusBar style="auto" />
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
