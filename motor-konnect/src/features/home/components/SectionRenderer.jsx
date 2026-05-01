// SectionRenderer.jsx
import PromoCarousel from "./PromoCarousel";
import MembershipCards from "./MembershipCards";
import CuratedServices from "./CuratedServices";
import AssistBanner from "./AssistBanner";
import VehicleSelector from "./VehicleSelector";
import GarageList from "./GarageList";

export default function SectionRenderer({ section }) {
  // ✅ FIX: Extract the vehicle segment from the section object
  // passed down by the HomeScreen useMemo.
  const selectedVehicleType = section?.selectedVehicleType;

  switch (section.type) {
    case "carousel":
      return (
        <PromoCarousel
          banners={section.data}
          selectedVehicleType={selectedVehicleType} // ✅ Forwarding to Carousel
        />
      );

    case "garages":
      return (
        <GarageList
          garages={section.data}
          loading={section.loading}
          selectedVehicleType={selectedVehicleType} // ✅ Forwarding to GarageList
        />
      );

    case "curated":
      return (
        <CuratedServices
          data={section.data}
          selectedVehicleType={selectedVehicleType} // ✅ Forwarding to Curated items
        />
      );

    case "membership":
      return <MembershipCards />;

    case "assist":
      return <AssistBanner />;

    default:
      return null;
  }
}
