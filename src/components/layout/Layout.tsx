import { NavLink, Outlet } from "react-router-dom";
import {
  BarChart3,
  History,
  LayoutDashboard,
  LogOut,
  ReceiptText,
  Search,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "New Receipt", path: "/receipts", icon: ReceiptText },
  { label: "Customers", path: "/customers", icon: Users },
  { label: "Receipt History", path: "/receipt-history", icon: History },
  { label: "Reports", path: "/reports", icon: BarChart3 },
  { label: "Settings", path: "/settings", icon: Settings },
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <header className="sticky top-0 z-40 border-b border-amber-400/10 bg-[#050505]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center gap-5 px-6 py-4">
          <NavLink to="/" className="flex shrink-0 items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-amber-300/30 bg-amber-300/10 text-amber-200 shadow-[0_0_28px_rgba(245,158,11,0.16)]">
              <Sparkles size={21} />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-wide text-white">
                Sannidhi
              </p>
              <p className="text-xs text-amber-200/70">Temple Management</p>
            </div>
          </NavLink>

          <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={`${item.label}-${item.path}`}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-amber-300 text-black shadow-[0_0_24px_rgba(245,158,11,0.24)]"
                        : "text-zinc-300 hover:bg-zinc-900 hover:text-amber-100"
                    }`
                  }
                >
                  <Icon size={16} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="ml-auto hidden min-w-64 items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-400 lg:flex">
            <Search size={17} />
            <input
              className="w-full bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-500"
              placeholder="Search receipts, customers..."
              type="search"
            />
          </div>

          <button className="flex items-center gap-2 rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:border-amber-300/40 hover:bg-amber-300/20">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-6 py-7">
        <Outlet />
      </main>
    </div>
  );
}
