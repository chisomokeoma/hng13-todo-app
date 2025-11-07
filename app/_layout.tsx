import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { ConvexProviderWrapper } from "@/contexts/ConvexProvider";
import { useTheme } from "@/hooks/use-theme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const { theme } = useTheme();

  return (
    <ConvexProviderWrapper>
      <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style={theme === "dark" ? "light" : "dark"} />
      </ThemeProvider>
    </ConvexProviderWrapper>
  );
}
