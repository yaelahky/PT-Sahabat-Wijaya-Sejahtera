import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  CheckCheck,
  ClipboardCheck,
  GraduationCap,
  Handshake,
  Hotel,
  Landmark,
  Network,
  PackageCheck,
  Router,
  Settings2,
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
  "clipboard-check": ClipboardCheck,
  "graduation-cap": GraduationCap,
  handshake: Handshake,
  hotel: Hotel,
  landmark: Landmark,
  network: Network,
  "package-check": PackageCheck,
  router: Router,
  "settings-2": Settings2,
  store: Store,
  wifi: Wifi,
};

export function SiteIcon({ name, ...props }: { name: IconName } & React.ComponentProps<LucideIcon>) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" {...props} />;
}
