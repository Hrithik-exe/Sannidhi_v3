import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Receipts",
    path: "/receipts",
    icon: Receipt,
  },
  {
    name: "Customers",
    path: "/customers",
    icon: Users,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: BarChart3,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200">
      <div className="border-b border-gray-200 p-6">
        <h1 className="text-xl font-bold">
          Sannidhi
        </h1>
      </div>

      <nav className="p-4">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}