import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import AuthProvider from "@/src/providers/AuthProvider";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {

  return (
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="sign-in"
            options={{
              headerTitle: "Sign Up",
              headerBackTitle: "Login",
              presentation: "modal",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="sign-up"
            options={{
              headerTitle: "Sign Up",
              headerBackTitle: "Login",
              presentation: "modal",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="add-trip"
            options={{
              headerTitle: "",
              headerBackTitle: "Back",
              headerShown: false,
            }}
          />
          
          <Stack.Screen
            name="add-accommodation"
            options={{
              headerTitle: "",
              headerShown: false,
              headerBackTitleVisible: false,
              headerBackTitle: "Back",
            }}
          />
          <Stack.Screen
            name="reset-password"
            options={{
              headerTitle: "Reset Password",
              headerBackTitleVisible: false,
              headerBackTitle:"back"
            }}
          />
        </Stack>
      </AuthProvider>
  );
}
