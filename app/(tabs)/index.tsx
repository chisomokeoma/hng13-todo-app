import { FilterType, TodoFilters } from "@/components/TodoFilters";
import { TodoHeader } from "@/components/TodoHeader";
import { TodoInput } from "@/components/TodoInput";
import { TodoItem } from "@/components/TodoItem";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useTheme } from "@/hooks/use-theme";
import { useMutation, useQuery } from "convex/react";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";

type Todo = {
  _id: Id<"todos">;
  title: string;
  completed: boolean;
  order: number;
};

export default function HomeScreen() {
  const { colors, theme, toggleTheme } = useTheme();
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const todos = useQuery(api.todos.list, {
    filter: filter === "all" ? undefined : filter,
    search: searchQuery || undefined,
  });

  const createTodo = useMutation(api.todos.create);
  const toggleComplete = useMutation(api.todos.toggleComplete);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const reorderTodos = useMutation(api.todos.reorder);
  const clearCompleted = useMutation(api.todos.clearCompleted);

  const handleCreateTodo = useCallback(
    async (title: string) => {
      try {
        await createTodo({ title });
      } catch (error) {
        console.error("Error creating todo:", error);
      }
    },
    [createTodo]
  );

  const handleToggleComplete = useCallback(
    async (id: Id<"todos">) => {
      try {
        await toggleComplete({ id });
      } catch (error) {
        console.error("Error toggling todo:", error);
      }
    },
    [toggleComplete]
  );

  const handleDeleteTodo = useCallback(
    async (id: Id<"todos">) => {
      try {
        await deleteTodo({ id });
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    },
    [deleteTodo]
  );

  const handleReorder = useCallback(
    async (data: Todo[]) => {
      try {
        const ids = data.map((item) => item._id);
        await reorderTodos({ ids });
      } catch (error) {
        console.error("Error reordering todos:", error);
      }
    },
    [reorderTodos]
  );

  const handleClearCompleted = useCallback(async () => {
    try {
      await clearCompleted();
    } catch (error) {
      console.error("Error clearing completed todos:", error);
    }
  }, [clearCompleted]);

  const activeTodosCount = todos?.filter((todo) => !todo.completed).length || 0;
  const hasCompletedTodos = todos?.some((todo) => todo.completed) || false;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topSection: {
      height: 280,
      width: "100%",
    },
    backgroundImage: {
      flex: 1,
      width: "100%",
      justifyContent: "flex-start",
    },
    bottomSection: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      flexGrow: 1,
    },
    inputContainer: {
      position: "absolute",
      top: 200,
      left: 24,
      right: 24,
      zIndex: 10,
      alignItems: "center",
    },
    todoContainer: {
      marginHorizontal: 24,
      marginTop: 20,
      borderRadius: 5,
      backgroundColor: colors.container,
      overflow: "hidden",
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      width: "100%",
      maxWidth: 600,
      alignSelf: "center",
    },
    listContainer: {
      maxHeight: 400,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      gap: 8,
    },
    footerText: {
      fontSize: 14,
      letterSpacing: -0.19,
      color: colors.textSecondary,
    },
    clearButton: {
      padding: 4,
    },
    clearButtonText: {
      fontSize: 14,
      letterSpacing: -0.19,
      color: colors.textSecondary,
    },
    emptyState: {
      padding: 40,
      alignItems: "center",
    },
    emptyStateText: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: "center",
    },
    loadingContainer: {
      padding: 40,
      alignItems: "center",
    },
    reorderHint: {
      paddingTop: 40,
      paddingBottom: 20,
      alignItems: "center",
    },
    reorderHintText: {
      fontSize: 14,
      letterSpacing: -0.19,
      color: colors.textSecondary,
    },
  });

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Todo>) => {
    return (
      <ScaleDecorator>
        <TodoItem
          id={item._id}
          title={item.title}
          completed={item.completed}
          onToggle={handleToggleComplete}
          onDelete={handleDeleteTodo}
          drag={drag}
          isActive={isActive}
        />
      </ScaleDecorator>
    );
  };

  const backgroundImage =
    theme === "dark"
      ? require("@/assets/images/dark-bg.jpg")
      : require("@/assets/images/light-bg.png");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <ImageBackground
          source={backgroundImage}
          style={styles.topSection}
          resizeMode="cover"
        >
          <TodoHeader onThemeToggle={toggleTheme} />
        </ImageBackground>

        <View style={styles.inputContainer}>
          <TodoInput onSubmit={handleCreateTodo} />
        </View>

        <View style={styles.bottomSection}>
          <ScrollView
            style={styles.scrollContent}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
          >
            <View style={styles.todoContainer}>
              {todos === undefined ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color={colors.accent} />
                </View>
              ) : todos.length === 0 ? (
                <>
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>
                      {filter === "active"
                        ? "No active todos"
                        : filter === "completed"
                          ? "No completed todos"
                          : "No todos yet. Add one above!"}
                    </Text>
                  </View>
                  <View style={styles.footer}>
                    <Text style={styles.footerText}>
                      {activeTodosCount}{" "}
                      {activeTodosCount === 1 ? "item" : "items"} left
                    </Text>
                    <TodoFilters filter={filter} onFilterChange={setFilter} />
                    <View style={{ width: 100 }} />
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.listContainer}>
                    <DraggableFlatList
                      data={todos as Todo[]}
                      onDragEnd={({ data }) => handleReorder(data)}
                      keyExtractor={(item) => item._id}
                      renderItem={renderItem}
                      scrollEnabled={false}
                      nestedScrollEnabled={true}
                    />
                  </View>
                  <View style={styles.footer}>
                    <Text style={styles.footerText}>
                      {activeTodosCount}{" "}
                      {activeTodosCount === 1 ? "item" : "items"} left
                    </Text>
                    <TodoFilters filter={filter} onFilterChange={setFilter} />
                    {hasCompletedTodos && (
                      <TouchableOpacity
                        onPress={handleClearCompleted}
                        style={styles.clearButton}
                        accessible={true}
                        accessibilityRole="button"
                        accessibilityLabel="Clear completed todos"
                        accessibilityHint="Double tap to remove all completed todos"
                      >
                        <Text style={styles.clearButtonText}>
                          Clear Completed
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </>
              )}
            </View>
            {todos && todos.length > 0 && (
              <View style={styles.reorderHint}>
                <Text style={styles.reorderHintText}>
                  Drag and drop to reorder list
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
