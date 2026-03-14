import PromoCarousel from "./PromoCarousel";
import ServiceGrid from "./ServiceGrid";
import MembershipCards from "./MembershipCards";
import CuratedServices from "./CuratedServices";
import AssistBanner from "./AssistBanner";
import { PROMO_BANNERS } from "../data/home.data";
import VehicleSelector from "./VehicleSelector";

export default function SectionRenderer({ section }) {
  switch (section.type) {
    case "carousel":
      return <PromoCarousel banners={PROMO_BANNERS} />;

    case "services":
      return <ServiceGrid services={section.data || []} />;

    case "vehicleSelector":
      return (
        <VehicleSelector
          selected={section.selected}
          onChange={section.onChange}
        />
      );

    case "membership":
      return <MembershipCards />;

    case "curated":
      return <CuratedServices />;

    case "assist":
      return <AssistBanner />;

    default:
      return null;
  }
}
