import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./src/navigation/StackNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UserContext } from "./src/context/UserContext";
import Donut from "./src/components/Donut";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserContext>
        <StackNavigator />
      </UserContext>
    </GestureHandlerRootView>
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
