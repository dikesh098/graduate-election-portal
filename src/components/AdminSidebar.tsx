"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, ClipboardList, Users, Megaphone, Calendar, LogOut,
} from "lucide-react";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/registrations", label: "Registrations", icon: ClipboardList },
  { href: "/admin/volunteers", label: "Volunteers", icon: Users },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { href: "/admin/events", label: "Events", icon: Calendar },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex h-screen w-56 flex-col justify-between bg-navy text-white">
      <div>
        <div className="px-5 py-6">
          <p className="font-head text-sm font-bold">Graduate Portal</p>
          <p className="text-xs text-blue-300">Admin Panel</p>
        </div>
        <nav className="mt-2 flex flex-col gap-1 px-3">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${
                  active ? "bg-blue-light text-white" : "text-blue-200 hover:bg-white/5"
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="mx-3 mb-5 flex items-center gap-3 rounded-md px-3 py-2 text-sm text-blue-200 hover:bg-white/5"
      >
        <LogOut size={16} />
        Log Out
      </button>
    </aside>
  );
}
