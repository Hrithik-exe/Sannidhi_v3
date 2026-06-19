import { NavLink, Outlet } from "react-router-dom";
import {
  BarChart3,
  History,
  Landmark,
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
      <header className="sticky top-0 z-40 border-b border-zinc-900 bg-[#070707] px-1 pt-1">
        <div className="flex items-center gap-5 rounded-2xl border border-zinc-800 bg-[#0b0b0b]/95 px-6 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur">
          <NavLink to="/" className="flex min-w-72 items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#4b391d] bg-[#17130c] text-[#d8aa4a]">
              <Landmark size={25} />
            </div>
            <p className="text-lg font-semibold text-white">Sannidhi Temple</p>
          </NavLink>

          <nav className="flex flex-1 items-center justify-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `relative flex h-11 items-center gap-2 px-3 text-sm font-medium transition ${
                      isActive
                        ? "text-[#f3c344]"
                        : "text-zinc-300 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon size={17} />
                      {item.label}
                      {isActive ? (
                        <span className="absolute inset-x-2 -bottom-3 h-0.5 rounded-full bg-[#f3c344]" />
                      ) : null}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="hidden w-72 items-center gap-2 rounded-xl border border-zinc-800 bg-[#111] px-4 py-3 text-zinc-500 xl:flex">
            <Search size={17} />
            <input
              className="w-full bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-500"
              placeholder="Search receipts, customers..."
              type="search"
            />
          </div>

          <button className="flex h-11 items-center gap-2 rounded-xl border border-zinc-800 bg-[#0f0f0f] px-4 text-sm font-semibold text-zinc-100 transition hover:border-[#4b391d] hover:text-[#f3c344]">
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
