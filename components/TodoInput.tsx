import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface TodoInputProps {
  onSubmit: (title: string) => void;
}

export function TodoInput({ onSubmit }: TodoInputProps) {
  const { colors, theme } = useTheme();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      onSubmit(trimmedValue);
      setInputValue("");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 20,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      minHeight: 60,
      borderRadius: 5,
      width: "100%",
      maxWidth: 600,
      alignSelf: "center",
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.checkbox,
      marginRight: 16,
    },
    input: {
      flex: 1,
      fontSize: 16,
      letterSpacing: -0.25,
      color: colors.text,
      paddingVertical: 0,
      minHeight: 24,
    },
    submitButton: {
      padding: 8,
      marginLeft: 8,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.checkbox} />
      <TextInput
        style={styles.input}
        placeholder="Create a new todo..."
        placeholderTextColor={colors.textSecondary}
        value={inputValue}
        onChangeText={setInputValue}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        accessible={true}
        accessibilityLabel="Todo input field"
        accessibilityHint="Enter a new todo item and press done to add it"
      />
      {inputValue.trim().length > 0 && (
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.submitButton}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Add todo"
          accessibilityHint="Double tap to add this todo item"
        >
          <Ionicons name="add-circle" size={24} color={colors.accent} />
        </TouchableOpacity>
      )}
    </View>
  );
}
