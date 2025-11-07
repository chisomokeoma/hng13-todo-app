import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type FilterType = "all" | "active" | "completed";

interface TodoFiltersProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function TodoFilters({ filter, onFilterChange }: TodoFiltersProps) {
  const { colors } = useTheme();

  const filters: FilterType[] = ["all", "active", "completed"];

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 20,
      width: "100%",
      maxWidth: 600,
      alignSelf: "center",
    },
    filterButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    filterText: {
      fontSize: 16,
      letterSpacing: -0.25,
    },
    activeFilterText: {
      fontWeight: "700",
    },
    inactiveFilterText: {
      fontWeight: "400",
    },
    activeFilter: {
      color: colors.accent,
    },
    inactiveFilter: {
      color: colors.textSecondary,
    },
  });

  return (
    <View style={styles.container}>
      {filters.map((filterType) => (
        <TouchableOpacity
          key={filterType}
          onPress={() => onFilterChange(filterType)}
          style={styles.filterButton}
          accessible={true}
          accessibilityRole="button"
          accessibilityState={{ selected: filter === filterType }}
          accessibilityLabel={`Filter by ${filterType}`}
        >
          <Text
            style={[
              styles.filterText,
              filter === filterType
                ? [styles.activeFilter, styles.activeFilterText]
                : [styles.inactiveFilter, styles.inactiveFilterText],
            ]}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
