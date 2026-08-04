import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  CheckCheck,
  CircleGauge,
  ClipboardCheck,
  Clock3,
  GraduationCap,
  Handshake,
  Headphones,
  Hotel,
  Landmark,
  LifeBuoy,
  MapPin,
  Network,
  PackageCheck,
  Router,
  Settings2,
  ShieldCheck,
  Store,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/content/site-content";

const icons: Record<IconName, LucideIcon> = {
  "arrow-right": ArrowRight,
  "badge-check": BadgeCheck,
  boxes: Boxes,
  "briefcase-business": BriefcaseBusiness,
  "building-2": Building2,
  "calendar-check": CalendarCheck,
  "check-check": CheckCheck,
  "circle-gauge": CircleGauge,
  "clipboard-check": ClipboardCheck,
  "clock-3": Clock3,
  "graduation-cap": GraduationCap,
  handshake: Handshake,
  headphones: Headphones,
  hotel: Hotel,
  landmark: Landmark,
  "life-buoy": LifeBuoy,
  "map-pin": MapPin,
  network: Network,
  "package-check": PackageCheck,
  router: Router,
  "settings-2": Settings2,
  "shield-check": ShieldCheck,
  store: Store,
  wifi: Wifi,
};

export function SiteIcon({ name, ...props }: { name: IconName } & React.ComponentProps<LucideIcon>) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" {...props} />;
}

