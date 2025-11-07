import { Id } from "@/convex/_generated/dataModel";
import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TodoItemProps {
  id: Id<"todos">;
  title: string;
  completed: boolean;
  onToggle: (id: Id<"todos">) => void;
  onDelete: (id: Id<"todos">) => void;
  drag?: () => void;
  isActive?: boolean;
}

export function TodoItem({
  id,
  title,
  completed,
  onToggle,
  onDelete,
  drag,
  isActive,
}: TodoItemProps) {
  const { colors } = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 20,
      backgroundColor: colors.container,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      minHeight: 60,
      opacity: isActive ? 0.8 : 1,
      position: "relative",
    },
    checkboxContainer: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: completed ? colors.checkboxChecked : colors.checkbox,
      marginRight: 16,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: completed ? colors.checkboxChecked : "transparent",
      overflow: "hidden",
      opacity: isPressed ? 0.7 : 1,
      transform: [{ scale: isPressed ? 0.95 : 1 }],
      position: "relative",
    },
    checkboxImage: {
      width: 24,
      height: 24,
      borderRadius: 12,
      position: "absolute",
    },
    checkmark: {
      position: "absolute",
      zIndex: 1,
    },
    textContainer: {
      flex: 1,
      position: "relative",
    },
    text: {
      fontSize: 16,
      letterSpacing: -0.25,
      color: completed ? colors.textCompleted : colors.text,
      textDecorationLine: completed ? "line-through" : "none",
    },
    deleteButton: {
      padding: 8,
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onLongPress={drag}
      delayLongPress={200}
      style={styles.container}
      accessible={true}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: completed }}
      accessibilityLabel={
        completed ? `${title}, completed` : `${title}, not completed`
      }
      accessibilityHint="Double tap to toggle completion, long press to drag"
    >
      <TouchableOpacity
        onPress={() => onToggle(id)}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        style={styles.checkboxContainer}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        accessible={false}
        activeOpacity={0.8}
      >
        {completed ? (
          <>
            <Image
              source={require("@/assets/images/checked.png")}
              style={styles.checkboxImage}
              resizeMode="cover"
            />
            <Ionicons
              name="checkmark"
              size={16}
              color="#FFFFFF"
              style={styles.checkmark}
            />
          </>
        ) : null}
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <TouchableOpacity
        onPress={() => onDelete(id)}
        style={styles.deleteButton}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`Delete ${title}`}
        accessibilityHint="Double tap to delete this todo"
      >
        <Ionicons name="close" size={20} color={colors.icon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
