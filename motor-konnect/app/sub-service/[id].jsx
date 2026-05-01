// app/sub-service/[id].jsx

import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import api from "../../src/services/apiClient";
import { useTheme } from "../../src/hooks/useTheme";

const { width } = Dimensions.get("window");

// ── Screen ─────────────────────────────────────────────

export default function SubServiceDetails() {
  const { id, service: serviceParam, carType } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, [id, serviceParam]);

  const init = async () => {
    try {
      // ✅ USE PASSED DATA FIRST
      if (serviceParam) {
        try {
          const parsed = JSON.parse(serviceParam);
          setService(parsed);
          return;
        } catch (e) {
          console.log("Parse error:", e.message);
        }
      }

      // ✅ FALLBACK API
      if (id) {
        const res = await api.get(`/services/sub-services/${id}`);
        setService(res.data);
      }
    } catch (err) {
      console.log("INIT ERROR:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── PRICE FIX (IMPORTANT) ─────────────────────────────

  const getServicePrice = () => {
    if (service?.pricing?.length > 0 && carType) {
      const match = service.pricing.find(
        (p) => p.carType === carType.toUpperCase(),
      );

      if (match) {
        const price = parseFloat(match.price);
        const discount = parseFloat(match.discount || 0);
        return Math.max(price - discount, 0);
      }
    }

    // fallback
    if (service?.price) return service.price;

    return 0;
  };

  const finalPrice = getServicePrice();

  // ── Loading ─────────────────────────────────────────

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!service) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>Service not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={theme.colors.primary} />
        </TouchableOpacity>

        <Text numberOfLines={1} style={styles.headerTitle}>
          {service.name}
        </Text>

        <View style={{ width: 22 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* IMAGE */}
        <View style={styles.heroWrap}>
          <Image
            source={{
              uri:
                service.image ||
                "https://via.placeholder.com/800x400?text=Service",
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          {/* NAME */}
          <Text style={styles.title}>{service.name}</Text>

          {/* PRICE */}
          <Text style={styles.price}>₹{finalPrice}</Text>

          {/* DESCRIPTION */}
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.desc}>
            {service.description?.trim()
              ? service.description
              : "No description available"}
          </Text>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() =>
            router.push({
              pathname: "/book",
              params: {
                externalServiceId: service.id,
              },
            })
          }
        >
          <Text style={styles.bookText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ── Styles ─────────────────────────────────────────────

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },

  headerTitle: {
    fontWeight: "700",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
    marginHorizontal: 8,
  },

  heroWrap: {
    height: 220,
  },

  heroImage: {
    width: "100%",
    height: "100%",
  },

  content: {
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },

  price: {
    fontSize: 20,
    color: "green",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },

  desc: {
    fontSize: 14,
    lineHeight: 20,
  },

  footer: {
    padding: 16,
  },

  bookBtn: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  bookText: {
    color: "#fff",
    fontWeight: "700",
  },
});
