import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  History,
  LayoutDashboard,
  LogOut,
  ReceiptText,
  Search,
  Settings,
  Users,
} from "lucide-react";

import Dock, { type DockItemConfig } from "./Dock";
import TargetCursor from "./TargetCursor";

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard, end: true },
  { label: "New Receipt", path: "/receipts", icon: ReceiptText },
  { label: "Customers", path: "/customers", icon: Users },
  { label: "Receipt History", path: "/receipt-history", icon: History },
  { label: "Reports", path: "/reports", icon: BarChart3 },
  { label: "Settings", path: "/settings", icon: Settings },
];

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const dockItems: DockItemConfig[] = navItems.map((item) => {
    const Icon = item.icon;
    const active = item.end
      ? location.pathname === item.path
      : location.pathname.startsWith(item.path);

    return {
      label: item.label,
      icon: <Icon size={19} />,
      active,
      onClick: () => navigate(item.path),
    };
  });

  return (
    <div className="min-h-screen bg-[#ebdccb] text-[#2c1b07]">
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
      />
      <header className="sticky top-0 z-40 border-b border-[#c8b7a6] bg-[#ebdccb] px-1 pt-1">
        <div className="relative flex min-h-[76px] items-center gap-5 rounded-2xl border border-[#c8b7a6] bg-[#f5eada]/95 px-6 py-3 shadow-[0_18px_60px_rgba(92,62,22,0.12)] backdrop-blur">
          <NavLink to="/" className="z-10 flex min-w-72 items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#5c3e16] bg-[#ebd8c0] overflow-hidden">
              <img
                src="/logo.jpg"
                alt="Sannidhi Temple Logo"
                className="h-full w-full object-cover"
                style={{ objectPosition: "center top" }}
              />
            </div>
            <p className="text-lg font-semibold text-[#2c1b07]">Sannidhi Temple</p>
          </NavLink>

          <Dock
            items={dockItems}
            outerClassName="dock-outer-header"
            className="dock-panel-header"
            panelHeight={66}
            dockHeight={110}
            baseItemSize={50}
            magnification={70}
            distance={180}
          />

          <div className="z-10 ml-auto hidden w-72 items-center gap-2 rounded-xl border border-[#a89278] bg-[#ebd8c0] px-4 py-3 text-[#7d654d] xl:flex">
            <Search size={17} />
            <input
              className="w-full bg-transparent text-sm text-[#2c1b07] outline-none placeholder:text-[#8c755c]"
              placeholder="Search receipts, customers..."
              type="search"
            />
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("authenticated");
              window.location.reload();
            }}
            className="z-10 flex h-11 items-center gap-2 rounded-xl border border-[#a89278] bg-[#ebd8c0] px-4 text-sm font-semibold text-[#5c3e16] transition hover:border-[#5c3e16] hover:text-[#2c1b07]"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-10 py-7">
        <Outlet />
      </main>
    </div>
  );
}
