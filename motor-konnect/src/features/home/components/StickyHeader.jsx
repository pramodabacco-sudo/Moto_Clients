// client/src/features/home/components/StickyHeader.jsx
import { StyleSheet, Animated } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import HomeSearchBar from "./HomeSearchBar";

export default function StickyHeader({ scrollY, searchQuery, onSearchChange, onSearchClear }) {
  const { theme } = useTheme();

  const shadowOpacity = scrollY?.interpolate({
    inputRange: [0, 20],
    outputRange: [0, 0.12],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          shadowOpacity,
          borderBottomColor: theme.colors.border,
          borderBottomWidth: StyleSheet.hairlineWidth,
        },
      ]}
    >
      <HomeSearchBar
        value={searchQuery}
        onChangeText={onSearchChange}
        onClear={onSearchClear}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    zIndex: 10,
  },
});