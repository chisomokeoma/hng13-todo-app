import { Colors } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";

const THEME_STORAGE_KEY = "@todo_app_theme";

export type Theme = "light" | "dark";

export function useTheme() {
  const systemTheme = useSystemColorScheme();
  const [theme, setTheme] = useState<Theme>("dark");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      } else if (systemTheme) {
        setTheme(systemTheme);
      }
    } catch (error) {
      console.error("Error loading theme:", error);
      if (systemTheme) {
        setTheme(systemTheme);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = useCallback(async () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  }, [theme]);

  const colors = Colors[theme];

  return {
    theme,
    colors,
    toggleTheme,
    isLoading,
  };
}

