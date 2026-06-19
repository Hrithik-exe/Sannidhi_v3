import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeIndianRupee,
  CalendarDays,
  DatabaseBackup,
  Download,
  Eye,
  FileBarChart,
  Plus,
  ReceiptText,
  Users,
  Wallet,
} from "lucide-react";

const kpis = [
  {
    label: "Today's Income",
    value: "Rs. 48,350",
    detail: "124 receipts",
    icon: BadgeIndianRupee,
  },
  {
    label: "Monthly Income",
    value: "Rs. 12,45,680",
    detail: "June collections",
    icon: Wallet,
  },
  {
    label: "Total Receipts",
    value: "2,342",
    detail: "All-time issued",
    icon: ReceiptText,
  },
  {
    label: "Total Customers",
    value: "1,892",
    detail: "Registered devotees",
    icon: Users,
  },
];

const incomeData = [36, 44, 39, 58, 51, 73, 68, 84, 76, 91, 86, 98];
const linePoints = incomeData
  .map((value, index) => `${index * 46},${120 - value}`)
  .join(" ");

const offerings = [
  { name: "Archana", value: 42, amount: "Rs. 20,307", color: "#d8aa4a" },
  { name: "Abhishekam", value: 25, amount: "Rs. 12,087", color: "#a87518" },
  { name: "Prasadam", value: 18, amount: "Rs. 8,703", color: "#f0d08a" },
  { name: "General Donation", value: 15, amount: "Rs. 7,253", color: "#6f4c16" },
];

const quickActions = [
  { label: "New Receipt", icon: Plus },
  { label: "Add Customer", icon: Users },
  { label: "View Receipts", icon: Eye },
  { label: "Daily Report", icon: FileBarChart },
  { label: "Backup Data", icon: DatabaseBackup },
  { label: "Export Data", icon: Download },
];

const receipts = [
  {
    no: "SN-1024",
    time: "10:42 AM",
    customer: "Ramesh Iyer",
    mobile: "98450 22341",
    offering: "Archana",
    amount: "Rs. 2,500",
    mode: "UPI",
  },
  {
    no: "SN-1023",
    time: "10:31 AM",
    customer: "Lakshmi Rao",
    mobile: "99008 11429",
    offering: "Prasadam",
    amount: "Rs. 850",
    mode: "Cash",
  },
  {
    no: "SN-1022",
    time: "10:14 AM",
    customer: "Venkatesh Bhat",
    mobile: "97412 66201",
    offering: "Abhishekam",
    amount: "Rs. 5,100",
    mode: "Card",
  },
  {
    no: "SN-1021",
    time: "09:58 AM",
    customer: "Meera Shenoy",
    mobile: "98867 77104",
    offering: "Archana",
    amount: "Rs. 1,250",
    mode: "UPI",
  },
  {
    no: "SN-1020",
    time: "09:41 AM",
    customer: "Suresh Kumar",
    mobile: "99862 44518",
    offering: "Donation",
    amount: "Rs. 11,000",
    mode: "UPI",
  },
];

function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-lg border border-zinc-800 bg-[#101010] ${className}`}>
      {children}
    </section>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-4 rounded-lg border border-[#2b2418] bg-[#0f0d09] p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-[#d8aa4a]">
            <CalendarDays size={15} />
            Saturday, 20 June 2026
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Good morning, Admin
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Daily collections, receipts, and offering activity for temple office
            staff.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-lg border border-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:border-[#4b391d] hover:text-[#d8aa4a]">
            View Report
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-[#d8aa4a] px-4 py-2 text-sm font-bold text-black transition hover:bg-[#e6bd62]">
            New Receipt
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => {
          const Icon = item.icon;

          return (
            <Panel key={item.label} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-500">
                    {item.label}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                    {item.value}
                  </h2>
                  <p className="mt-1 text-xs text-zinc-500">{item.detail}</p>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-[#4b391d] bg-[#17130c] text-[#d8aa4a]">
                  <Icon size={19} />
                </div>
              </div>
            </Panel>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr_0.8fr]">
        <Panel className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">
                Monthly Income
              </h2>
              <p className="text-sm text-zinc-500">Collection trend</p>
            </div>
            <span className="rounded-md border border-[#4b391d] bg-[#17130c] px-3 py-1 text-sm font-medium text-[#d8aa4a]">
              Rs. 12.45L
            </span>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-[#0b0b0b] p-4">
            <svg
              className="h-56 w-full overflow-visible"
              viewBox="0 0 506 140"
              preserveAspectRatio="none"
              role="img"
              aria-label="Monthly income line chart"
            >
              <path
                d="M0 30H506 M0 60H506 M0 90H506 M0 120H506"
                stroke="#27272a"
                strokeDasharray="4 6"
                strokeWidth="1"
              />
              <polyline
                fill="none"
                points={linePoints}
                stroke="#d8aa4a"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              {incomeData.map((value, index) => (
                <circle
                  key={index}
                  cx={index * 46}
                  cy={120 - value}
                  fill="#0b0b0b"
                  r="4"
                  stroke="#d8aa4a"
                  strokeWidth="2"
                />
              ))}
            </svg>
            <div className="mt-3 grid grid-cols-12 text-center text-xs text-zinc-600">
              {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map(
                (month, index) => (
                  <span key={`${month}-${index}`}>{month}</span>
                ),
              )}
            </div>
          </div>
        </Panel>

        <Panel className="p-5">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-white">
              Revenue by Offering
            </h2>
            <p className="text-sm text-zinc-500">Today's split</p>
          </div>
          <div className="mx-auto grid h-40 w-40 place-items-center rounded-full bg-[conic-gradient(#d8aa4a_0_42%,#a87518_42%_67%,#f0d08a_67%_85%,#6f4c16_85%_100%)]">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-[#101010] text-center">
              <div>
                <p className="text-xl font-semibold text-white">21</p>
                <p className="text-xs text-zinc-500">Offerings</p>
              </div>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {offerings.map((item) => (
              <div key={item.name}>
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.name}
                  </div>
                  <span className="text-sm text-zinc-400">{item.amount}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-zinc-900">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-5">
          <h2 className="text-base font-semibold text-white">Quick Actions</h2>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.label}
                  className="flex min-h-20 flex-col items-start justify-between rounded-lg border border-zinc-800 bg-[#0b0b0b] p-3 text-left text-sm font-medium text-zinc-300 transition hover:border-[#4b391d] hover:text-[#d8aa4a]"
                >
                  <Icon size={18} />
                  {action.label}
                </button>
              );
            })}
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <Panel className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-white">
                Recent Receipts
              </h2>
              <p className="text-sm text-zinc-500">Latest entries for today</p>
            </div>
            <button className="rounded-lg border border-zinc-800 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:border-[#4b391d] hover:text-[#d8aa4a]">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[840px] border-collapse text-left text-sm">
              <thead className="bg-[#0b0b0b] text-xs uppercase tracking-wide text-zinc-600">
                <tr>
                  <th className="px-5 py-3 font-semibold">Receipt</th>
                  <th className="px-5 py-3 font-semibold">Time</th>
                  <th className="px-5 py-3 font-semibold">Customer</th>
                  <th className="px-5 py-3 font-semibold">Mobile</th>
                  <th className="px-5 py-3 font-semibold">Offering</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold">Mode</th>
                  <th className="px-5 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {receipts.map((receipt) => (
                  <tr key={receipt.no} className="text-zinc-400 hover:bg-[#131313]">
                    <td className="px-5 py-3 font-semibold text-[#d8aa4a]">
                      {receipt.no}
                    </td>
                    <td className="px-5 py-3">{receipt.time}</td>
                    <td className="px-5 py-3 text-zinc-100">{receipt.customer}</td>
                    <td className="px-5 py-3">{receipt.mobile}</td>
                    <td className="px-5 py-3">{receipt.offering}</td>
                    <td className="px-5 py-3 font-semibold text-zinc-100">
                      {receipt.amount}
                    </td>
                    <td className="px-5 py-3">
                      <span className="rounded-md border border-zinc-800 bg-[#0b0b0b] px-2 py-1 text-xs font-medium text-zinc-300">
                        {receipt.mode}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <button className="grid h-8 w-8 place-items-center rounded-md text-zinc-500 transition hover:bg-[#17130c] hover:text-[#d8aa4a]">
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel className="p-5">
            <h2 className="text-base font-semibold text-white">
              Today's Summary
            </h2>
            <div className="mt-4 space-y-3">
              {[
                ["Receipts Generated", "124"],
                ["Cash Collection", "Rs. 18,200"],
                ["UPI Collection", "Rs. 24,650"],
                ["Card Collection", "Rs. 5,500"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-zinc-500">{label}</span>
                  <span className="font-medium text-zinc-100">{value}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="border-[#4b391d] bg-[#0f0d09] p-5">
            <p className="text-sm font-medium text-[#d8aa4a]">
              Top Offering Today
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Archana</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-500">
              328 receipts generated, contributing 42% of today's revenue.
            </p>
            <div className="mt-4 rounded-lg border border-[#4b391d] bg-[#17130c] p-3">
              <p className="text-xl font-semibold text-[#d8aa4a]">Rs. 20,307</p>
              <p className="text-xs text-zinc-500">Current collection</p>
            </div>
          </Panel>
        </div>
      </section>
    </div>
  );
}
