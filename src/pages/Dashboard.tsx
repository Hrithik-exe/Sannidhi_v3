import type { ReactNode } from "react";
import {
  ArrowUpRight,
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
    change: "+18.2%",
    icon: BadgeIndianRupee,
  },
  {
    label: "Monthly Income",
    value: "Rs. 12,45,680",
    change: "+9.8%",
    icon: Wallet,
  },
  {
    label: "Total Receipts",
    value: "2,342",
    change: "+124 today",
    icon: ReceiptText,
  },
  {
    label: "Total Customers",
    value: "1,892",
    change: "+38 new",
    icon: Users,
  },
];

const incomeData = [36, 44, 39, 58, 51, 73, 68, 84, 76, 91, 86, 98];

const offerings = [
  { name: "Archana", value: 42, color: "#f5c542" },
  { name: "Abhishekam", value: 25, color: "#f59e0b" },
  { name: "Prasadam", value: 18, color: "#fef3c7" },
  { name: "Donations", value: 15, color: "#a16207" },
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
    date: "20 Jun 2026",
    customer: "Ramesh Iyer",
    mobile: "98450 22341",
    amount: "Rs. 2,500",
    mode: "UPI",
  },
  {
    no: "SN-1023",
    date: "20 Jun 2026",
    customer: "Lakshmi Rao",
    mobile: "99008 11429",
    amount: "Rs. 850",
    mode: "Cash",
  },
  {
    no: "SN-1022",
    date: "20 Jun 2026",
    customer: "Venkatesh Bhat",
    mobile: "97412 66201",
    amount: "Rs. 5,100",
    mode: "Card",
  },
  {
    no: "SN-1021",
    date: "19 Jun 2026",
    customer: "Meera Shenoy",
    mobile: "98867 77104",
    amount: "Rs. 1,250",
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
    <section
      className={`rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.28)] ${className}`}
    >
      {children}
    </section>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-7">
      <section className="overflow-hidden rounded-[2rem] border border-amber-300/15 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.22),transparent_32%),linear-gradient(135deg,#111111,#050505_55%,#111111)] p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-sm font-medium text-amber-100">
              <CalendarDays size={15} />
              Saturday, 20 June 2026
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Good Morning, Admin <span aria-hidden="true">&#x1F64F;</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-300">
              Track temple offerings, daily receipts, and collection trends from
              one clean management dashboard.
            </p>
          </div>

          <button className="inline-flex w-fit items-center gap-2 rounded-2xl bg-amber-300 px-5 py-3 text-sm font-bold text-black shadow-[0_0_32px_rgba(245,158,11,0.28)] transition hover:bg-amber-200">
            Create Receipt
            <ArrowUpRight size={17} />
          </button>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => {
          const Icon = item.icon;

          return (
            <Panel key={item.label} className="p-6">
              <div className="flex items-start justify-between">
                <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-3 text-amber-200">
                  <Icon size={22} />
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  {item.change}
                </span>
              </div>
              <p className="mt-5 text-sm font-medium text-zinc-400">
                {item.label}
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
                {item.value}
              </h2>
            </Panel>
          );
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.4fr_0.9fr_0.8fr]">
        <Panel className="min-h-96">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Monthly Income
              </h2>
              <p className="text-sm text-zinc-500">Last 12 months</p>
            </div>
            <span className="rounded-full border border-amber-300/20 px-3 py-1 text-sm text-amber-100">
              Rs. 12.45L
            </span>
          </div>

          <div className="relative flex h-64 items-end gap-3 rounded-2xl border border-zinc-800 bg-black/30 p-5">
            <div className="absolute inset-x-5 top-1/4 border-t border-dashed border-zinc-800" />
            <div className="absolute inset-x-5 top-1/2 border-t border-dashed border-zinc-800" />
            <div className="absolute inset-x-5 top-3/4 border-t border-dashed border-zinc-800" />
            {incomeData.map((height, index) => (
              <div
                key={index}
                className="relative z-10 flex flex-1 flex-col items-center gap-2"
              >
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-amber-700 to-amber-200 shadow-[0_0_18px_rgba(245,158,11,0.18)]"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-zinc-500">
                  {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][
                    index
                  ]}
                </span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              Revenue by Offering
            </h2>
            <p className="text-sm text-zinc-500">Today&apos;s distribution</p>
          </div>
          <div className="mx-auto grid h-48 w-48 place-items-center rounded-full bg-[conic-gradient(#f5c542_0_42%,#f59e0b_42%_67%,#fef3c7_67%_85%,#a16207_85%_100%)]">
            <div className="grid h-28 w-28 place-items-center rounded-full bg-zinc-950 text-center">
              <div>
                <p className="text-2xl font-bold text-white">21</p>
                <p className="text-xs text-zinc-500">Offerings</p>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {offerings.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-zinc-300">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.name}
                </div>
                <span className="text-sm font-semibold text-white">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.label}
                  className="flex min-h-24 flex-col items-start justify-between rounded-2xl border border-zinc-800 bg-black/35 p-4 text-left text-sm font-semibold text-zinc-200 transition hover:border-amber-300/40 hover:bg-amber-300/10 hover:text-amber-100"
                >
                  <Icon size={20} />
                  {action.label}
                </button>
              );
            })}
          </div>
        </Panel>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <Panel>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Recent Receipts
              </h2>
              <p className="text-sm text-zinc-500">Latest temple collections</p>
            </div>
            <button className="rounded-xl border border-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:border-amber-300/30 hover:text-amber-100">
              View All
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-zinc-800">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="bg-black/50 text-xs uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Receipt Number</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Mobile</th>
                  <th className="px-4 py-3 font-semibold">Amount</th>
                  <th className="px-4 py-3 font-semibold">Payment Mode</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {receipts.map((receipt) => (
                  <tr key={receipt.no} className="text-zinc-300">
                    <td className="px-4 py-4 font-semibold text-amber-100">
                      {receipt.no}
                    </td>
                    <td className="px-4 py-4">{receipt.date}</td>
                    <td className="px-4 py-4 text-white">{receipt.customer}</td>
                    <td className="px-4 py-4">{receipt.mobile}</td>
                    <td className="px-4 py-4 font-semibold text-white">
                      {receipt.amount}
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-zinc-200">
                        {receipt.mode}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button className="rounded-lg p-2 text-zinc-400 transition hover:bg-amber-300/10 hover:text-amber-100">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel>
            <h2 className="text-lg font-semibold text-white">
              Today&apos;s Summary
            </h2>
            <div className="mt-5 space-y-4">
              {[
                ["Receipts Generated", "124"],
                ["Cash Collection", "Rs. 18,200"],
                ["UPI Collection", "Rs. 24,650"],
                ["Card Collection", "Rs. 5,500"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">{label}</span>
                  <span className="font-semibold text-white">{value}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="bg-gradient-to-br from-amber-300/15 to-zinc-950">
            <p className="text-sm font-medium text-amber-100">
              Top Offering Today
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white">Archana</h2>
            <p className="mt-2 text-sm text-zinc-400">
              328 receipts generated, contributing 42% of today&apos;s revenue.
            </p>
            <div className="mt-5 rounded-2xl border border-amber-300/20 bg-black/30 p-4">
              <p className="text-2xl font-bold text-amber-200">Rs. 20,307</p>
              <p className="text-xs text-zinc-500">Current collection</p>
            </div>
          </Panel>
        </div>
      </section>
    </div>
  );
}
