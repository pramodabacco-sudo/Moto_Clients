// client/src/features/home/components/HomeSearchBar.jsx
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../hooks/useTheme";

export default function HomeSearchBar({ value, onChangeText, onClear }) {
  const { theme } = useTheme();
  const isDark = theme.dark;
  const inputBg = isDark ? "#2c2c2e" : "#f2f2f7";
  const textColor = theme.colors.text;
  const placeholderColor = isDark ? "#636366" : "#8e8e93";
  const primary = theme.colors.primary;

  return (
    <View style={[styles.wrap, { backgroundColor: inputBg }]}>
      <Ionicons
        name="search-outline"
        size={17}
        color={placeholderColor}
        style={styles.icon}
      />
      <TextInput
        style={[styles.input, { color: textColor }]}
        placeholder="Search services..."
        placeholderTextColor={placeholderColor}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={onClear}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close-circle" size={16} color={placeholderColor} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  icon: {
    flexShrink: 0,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    paddingVertical: 0,
  },
});