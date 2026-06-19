import { NavLink, Outlet } from "react-router-dom";
import {
  BarChart3,
  Bell,
  History,
  LayoutDashboard,
  LogOut,
  ReceiptText,
  Search,
  Settings,
  Users,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard, end: true },
  { label: "New Receipt", path: "/receipts", icon: ReceiptText },
  { label: "Customers", path: "/customers", icon: Users },
  { label: "Receipt History", path: "/receipt-history", icon: History },
  { label: "Reports", path: "/reports", icon: BarChart3 },
  { label: "Settings", path: "/settings", icon: Settings },
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#070707] text-zinc-100">
      <header className="sticky top-0 z-40 border-b border-[#272017] bg-[#090909]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1480px] items-center gap-4 px-6 py-3">
          <NavLink to="/" className="flex shrink-0 items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg border border-[#4b391d] bg-[#17130c] text-sm font-bold text-[#d8aa4a]">
              ॐ
            </div>
            <div className="leading-tight">
              <p className="text-base font-semibold text-white">
                Sannidhi Temple
              </p>
              <p className="text-xs text-zinc-500">Management Console</p>
            </div>
          </NavLink>

          <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-[#d8aa4a] text-black"
                        : "text-zinc-400 hover:bg-[#151515] hover:text-zinc-100"
                    }`
                  }
                >
                  <Icon size={16} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="ml-auto hidden w-72 items-center gap-2 rounded-lg border border-zinc-800 bg-[#101010] px-3 py-2 text-zinc-500 lg:flex">
            <Search size={16} />
            <input
              className="w-full bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-600"
              placeholder="Search receipt, mobile, name"
              type="search"
            />
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-lg border border-zinc-800 bg-[#101010] text-zinc-400 transition hover:border-[#4b391d] hover:text-[#d8aa4a]"
            title="Notifications"
          >
            <Bell size={17} />
          </button>

          <button className="flex items-center gap-2 rounded-lg border border-[#4b391d] bg-[#17130c] px-3 py-2 text-sm font-semibold text-[#d8aa4a] transition hover:bg-[#211a10]">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1480px] px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}
