import { StatusBar, Text, View } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { THEME } from "./src/theme";
import { Loading } from "@components/Loading";
import { SignIn } from "@screens/SignIn";
import { SignUp } from "@screens/SignUp";
import { Routes } from "@routes/index";

export default function App() {
  const [fontLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"#202024"}
        translucent
      />
      {fontLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}
