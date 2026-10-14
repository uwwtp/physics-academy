import {
  BookOpen,
  Gauge,
  LayoutDashboard,
  Library,
  Settings,
  Sparkles,
} from "lucide-react";

export const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/learning", label: "My Learning", icon: BookOpen },
  { href: "/library", label: "Course Library", icon: Library },
  { href: "/practice", label: "Practice", icon: Sparkles },
  { href: "/progress", label: "Progress", icon: Gauge },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;
