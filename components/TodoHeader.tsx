import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TodoHeaderProps {
  onThemeToggle: () => void;
}

export function TodoHeader({ onThemeToggle }: TodoHeaderProps) {
  const { colors, theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingTop: 60,
      paddingBottom: 40,
      maxWidth: 600,
      alignSelf: "center",
      width: "100%",
    },
    title: {
      fontSize: 40,
      fontWeight: "700",
      letterSpacing: 15,
      color: "#FFFFFF",
    },
    themeButton: {
      padding: 8,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title} accessible={true} accessibilityRole="header">
        TODO
      </Text>
      <TouchableOpacity
        onPress={onThemeToggle}
        style={styles.themeButton}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={
          theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
        }
        accessibilityHint="Double tap to toggle between light and dark themes"
      >
        <Ionicons
          name={theme === "dark" ? "sunny" : "moon"}
          size={26}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </View>
  );
}
