import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCart } from "../src/hooks/useCart";

export default function ServiceConfirmScreen() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();
  const { garageId, name } = useLocalSearchParams();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleConfirm = () => {
    // 🔧 CRM API integration later
    console.log("BOOKING PAYLOAD:", {
      garageId,
      services: cartItems,
      type: "service_booking",
    });

    clearCart();

    Alert.alert(
      "Booking Confirmed 🚗",
      "Your request has been sent to the garage. They will contact you shortly.",
      [
        {
          text: "OK",
          onPress: () => router.replace("/(tabs)/services"),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Confirm Booking</Text>
      </View>

      {/* Garage */}
      <View style={styles.section}>
        <Text style={styles.label}>Selected Garage</Text>
        <Text style={styles.value}>{name}</Text>
      </View>

      {/* Services */}
      <View style={styles.section}>
        <Text style={styles.label}>Services</Text>

        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Text style={styles.itemName}>
                {item.title} × {item.quantity}
              </Text>
              <Text style={styles.itemPrice}>
                ₹{item.price * item.quantity}
              </Text>
            </View>
          )}
        />
      </View>

      {/* Total */}
      <View style={styles.section}>
        <Text style={styles.label}>Estimated Cost</Text>
        <Text style={styles.total}>₹{total}</Text>
      </View>

      {/* Info Box */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          💡 No online payment required. Pay directly after service completion.
        </Text>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.btn} onPress={handleConfirm}>
        <Text style={styles.btnText}>Confirm Booking</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    padding: 16,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
  },

  section: {
    padding: 16,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
  },

  label: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },

  value: {
    fontSize: 15,
    fontWeight: "600",
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  itemName: {
    fontSize: 14,
  },

  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
  },

  total: {
    fontSize: 18,
    fontWeight: "700",
  },

  infoBox: {
    margin: 16,
    padding: 12,
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
  },

  infoText: {
    fontSize: 13,
    color: "#444",
  },

  btn: {
    margin: 16,
    backgroundColor: "#0062ff",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
  },
});
