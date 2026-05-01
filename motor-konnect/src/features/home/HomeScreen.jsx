// HomeScreen.jsx
import { Animated, StyleSheet, RefreshControl, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/useTheme";
import { useRef, useState, useEffect, useMemo } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import SectionRenderer from "./components/SectionRenderer";
import StickyHeader from "./components/StickyHeader";
import HomeHeader from "./components/HomeHeader";
import api from "../../services/apiClient";

import { useAuth } from "../../providers/AuthProvider";
import { useLoginSheet } from "../../providers/LoginSheetProvider";
import { getSelectedVehicle } from "../vehicle/vehicle.service";

export default function HomeScreen() {
  const { theme } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  const [refreshing, setRefreshing] = useState(false);
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [garages, setGarages] = useState([]);
  const [garageLoading, setGarageLoading] = useState(false);
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [category, setCategory] = useState("CAR");
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useAuth();
  const { openLoginSheet } = useLoginSheet();

  useFocusEffect(
    useCallback(() => {
      const syncVehicle = async () => {
        try {
          const vehicle = await getSelectedVehicle();
          if (vehicle?.model?.segment) {
            setSelectedVehicleType(vehicle.model.segment);
          }
        } catch (e) {
          console.log("❌ Focus sync error:", e.message);
        }
      };
      syncVehicle();
    }, []),
  );

  useEffect(() => {
    loadServices();
    loadGarages();
  }, [category]);

  const loadServices = async () => {
    try {
      const [serviceRes, packageRes] = await Promise.all([
        api.get(`/services?vehicleType=${category}`),
        api.get(`/packages?vehicleType=${category}`),
      ]);
      setServices(serviceRes.data);
      const rawPackages = packageRes.data?.data || [];
      const formattedPackages = rawPackages.map((pkg) => ({
        ...pkg,
        garageId: pkg.userId || pkg.garageId,
        garageName: pkg.garageName || "Unknown Garage",
      }));
      setPackages(formattedPackages);
    } catch (err) {
      console.log("❌ ERROR:", err);
    }
  };

  const BASE_URL = "https://ld3bgq17-8000.inc1.devtunnels.ms/api/v1";

  const loadGarages = async () => {
    try {
      setGarageLoading(true);
      const res = await fetch(`${BASE_URL}/external/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.EXPO_PUBLIC_API_KEY,
        },
      });
      const data = await res.json();
      const garagesData = data?.data || [];
      const filtered = garagesData.filter(
        (g) => g.services && g.services.length > 0,
      );
      setGarages(filtered);
    } catch (err) {
      console.log("❌ GARAGE ERROR:", err);
      setGarages([]);
    } finally {
      setGarageLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([loadServices(), loadGarages()]);
    try {
      const vehicle = await getSelectedVehicle();
      if (vehicle?.model?.segment)
        setSelectedVehicleType(vehicle.model.segment);
    } catch (e) {
      console.log("❌ Refresh error:", e.message);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    if (!user) openLoginSheet();
  }, []);

  // --- SEARCH LOGIC ---
  const filteredServices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return services;
    return services.filter((s) => (s.name || "").toLowerCase().includes(q));
  }, [services, searchQuery]);

  const filteredGarages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return garages;
    return garages.filter(
      (g) =>
        (g.companyName || g.name || "").toLowerCase().includes(q) ||
        (g.address || "").toLowerCase().includes(q),
    );
  }, [garages, searchQuery]);

  const isSearching = searchQuery.trim().length > 0;
  const vehicleType = selectedVehicleType || "SEDAN";

  const sections = useMemo(() => {
    if (isSearching) {
      return [
        {
          id: "garages-search",
          type: "garages",
          data: filteredGarages,
          loading: false,
          selectedVehicleType: vehicleType,
        },
        {
          id: "services-search",
          type: "services",
          data: filteredServices,
          selectedVehicleType: vehicleType,
        },
      ];
    }

    return [
      {
        id: "carousel",
        type: "carousel",
        data: packages,
        selectedVehicleType: vehicleType,
      },
      {
        id: "vehicleSelector",
        type: "vehicleSelector",
        selected: vehicleType,
        onChange: setSelectedVehicleType,
      },
      {
        id: "services",
        type: "services",
        data: services,
        selectedVehicleType: vehicleType,
      },
      {
        id: "garages",
        type: "garages",
        data: garages,
        loading: garageLoading,
        selectedVehicleType: vehicleType,
      },
      { id: "membership", type: "membership" },
      { id: "curated", type: "curated", data: packages },
      { id: "assist", type: "assist" },
    ];
  }, [
    services,
    filteredServices,
    packages,
    garages,
    filteredGarages,
    garageLoading,
    vehicleType,
    isSearching,
  ]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      edges={["top"]}
    >
      <StickyHeader
        scrollY={scrollY}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchClear={() => setSearchQuery("")}
      />
      <Animated.FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.sectionWrapper}>
            <SectionRenderer section={item} />
          </View>
        )}
        ListHeaderComponent={
          !isSearching ? (
            <View style={styles.homeHeaderWrap}>
              <HomeHeader />
            </View>
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 80 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeHeaderWrap: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 8 },
  sectionWrapper: { paddingHorizontal: 16, marginBottom: 16 },
});
