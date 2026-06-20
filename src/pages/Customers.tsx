import { useState } from "react";
import {
  Users,
  UserPlus,
  ReceiptText,
  BadgeIndianRupee,
  Search,
  Filter,
  Eye,
  MoreHorizontal,
  X,
  Star,
  Phone,
  MapPin,
  Mail,
  Printer,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Upload,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────── */

const NAKSHATRAS = [
  "All Nakshatras",
  "Rohini",
  "Anuradha",
  "Pushya",
  "Mrigashirsha",
  "Hasta",
  "Shravana",
  "Revati",
  "Uttara Phalguni",
  "Poorva Ashadha",
  "Dhanishta",
  "Ashwini",
  "Bharani",
];

type PayMode = "Cash" | "UPI" | "Card";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  mode: PayMode;
}

interface Customer {
  id: number;
  name: string;
  nakshatra: string;
  phone: string;
  totalReceipts: number;
  totalAmount: number;
  lastVisit: string;
  memberSince: string;
  address: string;
  email: string;
  transactions: Transaction[];
}

const customers: Customer[] = [
  {
    id: 1,
    name: "Ramesh Kumar",
    nakshatra: "Rohini",
    phone: "9876543210",
    totalReceipts: 12,
    totalAmount: 4850,
    lastVisit: "25 May 2025",
    memberSince: "14 Mar 2024",
    address: "#12, 4th Cross, Malleswaram\nBangalore – 560003, Karnataka",
    email: "rameshkumar@email.com",
    transactions: [
      { id: "R-2025-2343", date: "25 May 2025", amount: 50, mode: "Cash" },
      { id: "R-2025-2101", date: "14 May 2025", amount: 200, mode: "UPI" },
      { id: "R-2025-1890", date: "03 May 2025", amount: 150, mode: "Cash" },
      { id: "R-2025-1654", date: "21 Apr 2025", amount: 100, mode: "Card" },
      { id: "R-2025-1342", date: "08 Apr 2025", amount: 300, mode: "UPI" },
    ],
  },
  {
    id: 2,
    name: "Suresh Babu",
    nakshatra: "Anuradha",
    phone: "9123456780",
    totalReceipts: 9,
    totalAmount: 3620,
    lastVisit: "24 May 2025",
    memberSince: "02 Jan 2024",
    address: "#5, 2nd Main, Jayanagar\nBangalore – 560011, Karnataka",
    email: "sureshbabu@email.com",
    transactions: [
      { id: "R-2025-2310", date: "24 May 2025", amount: 400, mode: "UPI" },
      { id: "R-2025-1980", date: "10 May 2025", amount: 220, mode: "Cash" },
    ],
  },
  {
    id: 3,
    name: "Lakshmi Devi",
    nakshatra: "Pushya",
    phone: "9988776655",
    totalReceipts: 15,
    totalAmount: 6250,
    lastVisit: "24 May 2025",
    memberSince: "20 Feb 2024",
    address: "#8, Temple Road, Basavanagudi\nBangalore – 560004, Karnataka",
    email: "lakshmidevi@email.com",
    transactions: [
      { id: "R-2025-2315", date: "24 May 2025", amount: 500, mode: "Card" },
      { id: "R-2025-2010", date: "12 May 2025", amount: 300, mode: "UPI" },
    ],
  },
  {
    id: 4,
    name: "Prasad Rao",
    nakshatra: "Mrigashirsha",
    phone: "9000090000",
    totalReceipts: 7,
    totalAmount: 2800,
    lastVisit: "23 May 2025",
    memberSince: "11 Apr 2024",
    address: "#3, Kalidasa Road, Yelahanka\nBangalore – 560064, Karnataka",
    email: "prasadrao@email.com",
    transactions: [
      { id: "R-2025-2290", date: "23 May 2025", amount: 150, mode: "Cash" },
    ],
  },
  {
    id: 5,
    name: "Anitha Reddy",
    nakshatra: "Hasta",
    phone: "9345678901",
    totalReceipts: 11,
    totalAmount: 4450,
    lastVisit: "23 May 2025",
    memberSince: "05 Jun 2024",
    address: "#21, HSR Layout\nBangalore – 560102, Karnataka",
    email: "anithareddy@email.com",
    transactions: [
      { id: "R-2025-2280", date: "23 May 2025", amount: 250, mode: "UPI" },
    ],
  },
  {
    id: 6,
    name: "Venkatesh M.",
    nakshatra: "Shravana",
    phone: "9876501234",
    totalReceipts: 5,
    totalAmount: 1900,
    lastVisit: "22 May 2025",
    memberSince: "30 Aug 2024",
    address: "#9, Vijayanagar\nBangalore – 560040, Karnataka",
    email: "venkateshm@email.com",
    transactions: [
      { id: "R-2025-2250", date: "22 May 2025", amount: 100, mode: "Cash" },
    ],
  },
  {
    id: 7,
    name: "Padmaja N.",
    nakshatra: "Revati",
    phone: "8123456789",
    totalReceipts: 8,
    totalAmount: 3100,
    lastVisit: "21 May 2025",
    memberSince: "14 Jul 2024",
    address: "#17, Koramangala 4th Block\nBangalore – 560034, Karnataka",
    email: "padmajan@email.com",
    transactions: [
      { id: "R-2025-2230", date: "21 May 2025", amount: 200, mode: "UPI" },
    ],
  },
  {
    id: 8,
    name: "Karthik G.",
    nakshatra: "Uttara Phalguni",
    phone: "9900112233",
    totalReceipts: 10,
    totalAmount: 3750,
    lastVisit: "21 May 2025",
    memberSince: "22 Oct 2024",
    address: "#6, Whitefield\nBangalore – 560066, Karnataka",
    email: "karthikg@email.com",
    transactions: [
      { id: "R-2025-2220", date: "21 May 2025", amount: 350, mode: "Card" },
    ],
  },
  {
    id: 9,
    name: "Meena Iyer",
    nakshatra: "Poorva Ashadha",
    phone: "9340012345",
    totalReceipts: 6,
    totalAmount: 2400,
    lastVisit: "20 May 2025",
    memberSince: "19 Dec 2023",
    address: "#33, Indiranagar 100 Feet Road\nBangalore – 560038, Karnataka",
    email: "meenaiyer@email.com",
    transactions: [
      { id: "R-2025-2200", date: "20 May 2025", amount: 450, mode: "UPI" },
    ],
  },
  {
    id: 10,
    name: "Raghavendra",
    nakshatra: "Dhanishta",
    phone: "9845612345",
    totalReceipts: 14,
    totalAmount: 5600,
    lastVisit: "20 May 2025",
    memberSince: "08 Mar 2024",
    address: "#2, Rajajinagar\nBangalore – 560010, Karnataka",
    email: "raghavendra@email.com",
    transactions: [
      { id: "R-2025-2180", date: "20 May 2025", amount: 600, mode: "Cash" },
    ],
  },
];

/* ─── Helpers ───────────────────────────────────────────────── */

function fmt(n: number) {
  return "₹ " + n.toLocaleString("en-IN");
}

const modeColor: Record<PayMode, string> = {
  Cash: "border-emerald-800 bg-emerald-950 text-emerald-400",
  UPI: "border-blue-800 bg-blue-950 text-blue-400",
  Card: "border-purple-800 bg-purple-950 text-purple-400",
};

/* ─── Sub-components ────────────────────────────────────────── */

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="cust-stat-card">
      <div className="cust-stat-icon">
        <Icon size={18} />
      </div>
      <div>
        <p className="cust-stat-label">{label}</p>
        <p className="cust-stat-value">{value}</p>
        <p className="cust-stat-sub">{sub}</p>
      </div>
    </div>
  );
}

function NakshatraBadge({ name }: { name: string }) {
  return (
    <span className="cust-nakshatra-badge">
      <Star size={11} className="text-[#d8aa4a]" />
      {name}
    </span>
  );
}

/* ─── Detail Panel ──────────────────────────────────────────── */

type DetailTab = "Overview" | "Transaction History" | "Notes";

function CustomerDetailPanel({
  customer,
  onClose,
}: {
  customer: Customer;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<DetailTab>("Overview");

  return (
    <aside className="cust-detail-panel">
      {/* Header */}
      <div className="cust-detail-header">
        <h2 className="cust-detail-title">Customer Details</h2>
        <button className="cust-detail-close" onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>
      </div>

      {/* Avatar + name */}
      <div className="cust-detail-hero">
        <div className="cust-detail-avatar">
          <Users size={26} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="cust-detail-name">{customer.name}</p>
            <NakshatraBadge name={customer.nakshatra} />
          </div>
          <p className="cust-detail-phone">{customer.phone}</p>
          <p className="cust-detail-since">Member since {customer.memberSince}</p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="cust-detail-stats">
        <div className="cust-detail-stat">
          <p className="cust-detail-stat-label">Total Receipts</p>
          <p className="cust-detail-stat-value">{customer.totalReceipts}</p>
        </div>
        <div className="cust-detail-stat">
          <p className="cust-detail-stat-label">Total Amount</p>
          <p className="cust-detail-stat-value">{fmt(customer.totalAmount)}</p>
        </div>
        <div className="cust-detail-stat">
          <p className="cust-detail-stat-label">Last Visit</p>
          <p className="cust-detail-stat-value">{customer.lastVisit}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="cust-detail-tabs">
        {(["Overview", "Transaction History", "Notes"] as DetailTab[]).map((t) => (
          <button
            key={t}
            className={`cust-detail-tab ${tab === t ? "cust-detail-tab-active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="cust-detail-body">
        {tab === "Overview" && (
          <div className="space-y-3">
            <div className="cust-detail-field">
              <div className="cust-detail-field-icon"><Users size={13} /></div>
              <div className="cust-detail-field-content">
                <span className="cust-detail-field-label">Full Name</span>
                <span className="cust-detail-field-value">{customer.name}</span>
              </div>
            </div>
            <div className="cust-detail-field">
              <div className="cust-detail-field-icon"><Star size={13} /></div>
              <div className="cust-detail-field-content">
                <span className="cust-detail-field-label">Nakshatra</span>
                <span className="cust-detail-field-value">{customer.nakshatra}</span>
              </div>
            </div>
            <div className="cust-detail-field">
              <div className="cust-detail-field-icon"><Phone size={13} /></div>
              <div className="cust-detail-field-content">
                <span className="cust-detail-field-label">Phone Number</span>
                <span className="cust-detail-field-value">{customer.phone}</span>
              </div>
            </div>
            <div className="cust-detail-field">
              <div className="cust-detail-field-icon"><MapPin size={13} /></div>
              <div className="cust-detail-field-content">
                <span className="cust-detail-field-label">Address</span>
                <span className="cust-detail-field-value whitespace-pre-line">{customer.address}</span>
              </div>
            </div>
            <div className="cust-detail-field">
              <div className="cust-detail-field-icon"><Mail size={13} /></div>
              <div className="cust-detail-field-content">
                <span className="cust-detail-field-label">Email</span>
                <span className="cust-detail-field-value">{customer.email}</span>
              </div>
            </div>

            {/* Recent transactions */}
            <div className="pt-1">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-zinc-100">Recent Transactions</p>
                <button className="text-xs text-[#d8aa4a] hover:underline">View All</button>
              </div>
              <div className="space-y-1.5">
                {customer.transactions.map((tx) => (
                  <div key={tx.id} className="cust-tx-row">
                    <span className="cust-tx-id">{tx.id}</span>
                    <span className="cust-tx-date">{tx.date}</span>
                    <span className="cust-tx-amount">₹ {tx.amount}</span>
                    <span className={`cust-mode-badge ${modeColor[tx.mode]}`}>{tx.mode}</span>
                    <button className="cust-tx-print"><Printer size={12} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "Transaction History" && (
          <div className="space-y-1.5">
            {customer.transactions.map((tx) => (
              <div key={tx.id} className="cust-tx-row">
                <span className="cust-tx-id">{tx.id}</span>
                <span className="cust-tx-date">{tx.date}</span>
                <span className="cust-tx-amount">₹ {tx.amount}</span>
                <span className={`cust-mode-badge ${modeColor[tx.mode]}`}>{tx.mode}</span>
                <button className="cust-tx-print"><Printer size={12} /></button>
              </div>
            ))}
          </div>
        )}

        {tab === "Notes" && (
          <textarea
            className="w-full min-h-[160px] rounded-lg border border-zinc-800 bg-[#0d0d0d] px-3 py-2.5 text-sm text-zinc-300 outline-none resize-none placeholder:text-zinc-600 focus:border-[#4b391d]"
            placeholder="Add notes about this customer..."
          />
        )}
      </div>

      {/* Footer CTA */}
      <div className="cust-detail-footer">
        <button className="cust-whatsapp-btn">
          <MessageCircle size={15} />
          Send WhatsApp Reminder
        </button>
      </div>
    </aside>
  );
}

/* ─── Main Page ─────────────────────────────────────────────── */

export default function Customers() {
  const [search, setSearch] = useState("");
  const [nakshatra, setNakshatra] = useState("All Nakshatras");
  const [selected, setSelected] = useState<Customer | null>(customers[0]);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.nakshatra.toLowerCase().includes(q);
    const matchNakshatra =
      nakshatra === "All Nakshatras" || c.nakshatra === nakshatra;
    return matchSearch && matchNakshatra;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      <style>{`
        /* ── Layout ─────────────────────────────────────────── */
        .cust-root {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
        }
        .cust-main {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        /* ── Page header ─────────────────────────────────────── */
        .cust-page-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }
        .cust-title-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .cust-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.02em;
        }
        .cust-title-icon {
          display: grid;
          place-items: center;
          width: 2rem;
          height: 2rem;
          border-radius: 0.5rem;
          border: 1px solid #4b391d;
          background: #17130c;
          color: #d8aa4a;
        }
        .cust-subtitle {
          margin-top: 0.2rem;
          font-size: 0.82rem;
          color: #71717a;
        }
        .cust-actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-shrink: 0;
        }
        .cust-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.9rem;
          border-radius: 0.6rem;
          border: 1px solid #3f3f46;
          background: #111;
          color: #d4d4d8;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 160ms, color 160ms;
        }
        .cust-btn-outline:hover {
          border-color: #4b391d;
          color: #d8aa4a;
        }
        .cust-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.9rem;
          border-radius: 0.6rem;
          border: none;
          background: #d8aa4a;
          color: #0d0d0d;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 160ms;
        }
        .cust-btn-primary:hover {
          background: #e8be5a;
        }

        /* ── Stat cards ─────────────────────────────────────── */
        .cust-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.85rem;
        }
        .cust-stat-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.1rem;
          border-radius: 0.75rem;
          border: 1px solid #1f1f23;
          background: #101010;
        }
        .cust-stat-icon {
          display: grid;
          place-items: center;
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 0.6rem;
          border: 1px solid #4b391d;
          background: #17130c;
          color: #d8aa4a;
          flex-shrink: 0;
        }
        .cust-stat-label {
          font-size: 0.72rem;
          color: #71717a;
          font-weight: 500;
        }
        .cust-stat-value {
          font-size: 1.3rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .cust-stat-sub {
          font-size: 0.7rem;
          color: #52525b;
          margin-top: 0.1rem;
        }

        /* ── Table panel ─────────────────────────────────────── */
        .cust-table-panel {
          border-radius: 0.85rem;
          border: 1px solid #1f1f23;
          background: #101010;
          overflow: hidden;
        }
        .cust-table-toolbar {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 1rem;
          border-bottom: 1px solid #1a1a1e;
        }
        .cust-search-wrap {
          position: relative;
          flex: 1;
        }
        .cust-search-icon {
          position: absolute;
          left: 0.7rem;
          top: 50%;
          transform: translateY(-50%);
          color: #52525b;
          pointer-events: none;
        }
        .cust-search-input {
          width: 100%;
          padding: 0.45rem 0.8rem 0.45rem 2.1rem;
          border-radius: 0.55rem;
          border: 1px solid #27272a;
          background: #0d0d0d;
          color: #e4e4e7;
          font-size: 0.8rem;
          outline: none;
          transition: border-color 160ms;
        }
        .cust-search-input::placeholder { color: #52525b; }
        .cust-search-input:focus { border-color: #4b391d; }

        .cust-nakshatra-select {
          padding: 0.45rem 2rem 0.45rem 0.75rem;
          border-radius: 0.55rem;
          border: 1px solid #27272a;
          background: #0d0d0d;
          color: #a1a1aa;
          font-size: 0.8rem;
          outline: none;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.55rem center;
        }
        .cust-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.75rem;
          border-radius: 0.55rem;
          border: 1px solid #27272a;
          background: #0d0d0d;
          color: #a1a1aa;
          font-size: 0.8rem;
          cursor: pointer;
          transition: border-color 160ms, color 160ms;
        }
        .cust-filter-btn:hover { border-color: #4b391d; color: #d8aa4a; }

        /* ── Table ───────────────────────────────────────────── */
        .cust-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
        .cust-table thead tr {
          background: #0b0b0b;
          border-bottom: 1px solid #1a1a1e;
        }
        .cust-table th {
          padding: 0.65rem 1rem;
          text-align: left;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #52525b;
        }
        .cust-table tbody tr {
          border-bottom: 1px solid #141418;
          cursor: pointer;
          transition: background 130ms;
        }
        .cust-table tbody tr:hover { background: #131316; }
        .cust-table tbody tr.cust-row-active {
          background: #14110a;
          border-left: 2px solid #d8aa4a;
        }
        .cust-table td { padding: 0.7rem 1rem; color: #a1a1aa; vertical-align: middle; }

        .cust-customer-cell {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .cust-avatar {
          display: grid;
          place-items: center;
          width: 1.8rem;
          height: 1.8rem;
          border-radius: 50%;
          border: 1px solid #27272a;
          background: #1a1a1e;
          color: #71717a;
          flex-shrink: 0;
        }
        .cust-customer-name { color: #e4e4e7; font-weight: 500; }
        .cust-nakshatra-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.15rem 0.45rem;
          border-radius: 99px;
          border: 1px solid #3a2e12;
          background: #1a1509;
          color: #c9993a;
          font-size: 0.68rem;
          font-weight: 500;
        }
        .cust-amount { color: #e4e4e7; font-weight: 600; }
        .cust-actions-cell {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .cust-icon-btn {
          display: grid;
          place-items: center;
          width: 1.8rem;
          height: 1.8rem;
          border-radius: 0.4rem;
          border: 1px solid transparent;
          background: transparent;
          color: #52525b;
          cursor: pointer;
          transition: background 130ms, color 130ms, border-color 130ms;
        }
        .cust-icon-btn:hover { background: #17130c; color: #d8aa4a; border-color: #4b391d; }
        .cust-icon-btn-active { background: #17130c; color: #d8aa4a; border-color: #4b391d; }

        /* ── Pagination ──────────────────────────────────────── */
        .cust-pagination {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 1rem;
          border-top: 1px solid #1a1a1e;
          font-size: 0.78rem;
          color: #52525b;
        }
        .cust-page-btns { display: flex; align-items: center; gap: 0.3rem; }
        .cust-page-btn {
          display: grid;
          place-items: center;
          min-width: 1.8rem;
          height: 1.8rem;
          padding: 0 0.3rem;
          border-radius: 0.4rem;
          border: 1px solid #27272a;
          background: #0d0d0d;
          color: #a1a1aa;
          font-size: 0.78rem;
          cursor: pointer;
          transition: background 130ms, color 130ms, border-color 130ms;
        }
        .cust-page-btn:hover { border-color: #4b391d; color: #d8aa4a; }
        .cust-page-btn-active { border-color: #d8aa4a; background: #1e1609; color: #d8aa4a; font-weight: 600; }
        .cust-page-btn:disabled { opacity: 0.35; cursor: not-allowed; }

        /* ── Detail panel ────────────────────────────────────── */
        .cust-detail-panel {
          width: 300px;
          flex-shrink: 0;
          border-radius: 0.85rem;
          border: 1px solid #1f1f23;
          background: #0f0f0f;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: sticky;
          top: 100px;
          max-height: calc(100vh - 120px);
          overflow-y: auto;
          scrollbar-width: none;
        }
        .cust-detail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1rem 0.75rem;
          border-bottom: 1px solid #1a1a1e;
        }
        .cust-detail-title { font-size: 0.9rem; font-weight: 600; color: #e4e4e7; }
        .cust-detail-close {
          display: grid;
          place-items: center;
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 0.35rem;
          border: 1px solid #27272a;
          background: transparent;
          color: #71717a;
          cursor: pointer;
          transition: background 130ms, color 130ms;
        }
        .cust-detail-close:hover { background: #1a1a1e; color: #e4e4e7; }

        .cust-detail-hero {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.9rem 1rem 0.75rem;
          border-bottom: 1px solid #1a1a1e;
        }
        .cust-detail-avatar {
          display: grid;
          place-items: center;
          width: 2.8rem;
          height: 2.8rem;
          border-radius: 50%;
          border: 1px solid #4b391d;
          background: #17130c;
          color: #d8aa4a;
          flex-shrink: 0;
        }
        .cust-detail-name { font-size: 0.95rem; font-weight: 600; color: #f0f0f0; }
        .cust-detail-phone { font-size: 0.78rem; color: #71717a; margin-top: 0.1rem; }
        .cust-detail-since { font-size: 0.7rem; color: #52525b; margin-top: 0.15rem; }

        .cust-detail-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-bottom: 1px solid #1a1a1e;
        }
        .cust-detail-stat {
          padding: 0.65rem 0.75rem;
          border-right: 1px solid #1a1a1e;
          text-align: center;
        }
        .cust-detail-stat:last-child { border-right: none; }
        .cust-detail-stat-label { font-size: 0.65rem; color: #52525b; }
        .cust-detail-stat-value { font-size: 0.82rem; font-weight: 600; color: #e4e4e7; margin-top: 0.15rem; }

        .cust-detail-tabs {
          display: flex;
          border-bottom: 1px solid #1a1a1e;
        }
        .cust-detail-tab {
          flex: 1;
          padding: 0.55rem 0.25rem;
          font-size: 0.72rem;
          font-weight: 500;
          color: #71717a;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: color 130ms, border-color 130ms;
          text-align: center;
        }
        .cust-detail-tab:hover { color: #a1a1aa; }
        .cust-detail-tab-active { color: #d8aa4a; border-bottom-color: #d8aa4a; }

        .cust-detail-body { padding: 0.85rem 1rem; flex: 1; }

        .cust-detail-field {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          padding: 0.5rem 0;
          border-bottom: 1px solid #141418;
        }
        .cust-detail-field:last-child { border-bottom: none; }
        .cust-detail-field-icon {
          display: grid;
          place-items: center;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 0.35rem;
          border: 1px solid #27272a;
          background: #141414;
          color: #71717a;
          flex-shrink: 0;
          margin-top: 0.05rem;
        }
        .cust-detail-field-content { flex: 1; min-width: 0; }
        .cust-detail-field-label { display: block; font-size: 0.68rem; color: #52525b; }
        .cust-detail-field-value { display: block; font-size: 0.78rem; color: #d4d4d8; margin-top: 0.1rem; word-break: break-word; }

        /* ── Transaction row ─────────────────────────────────── */
        .cust-tx-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.55rem;
          border-radius: 0.45rem;
          border: 1px solid #1a1a1e;
          background: #0d0d0d;
          font-size: 0.73rem;
        }
        .cust-tx-id { color: #d8aa4a; font-weight: 600; flex: 1; min-width: 0; truncate: true; }
        .cust-tx-date { color: #71717a; white-space: nowrap; }
        .cust-tx-amount { color: #e4e4e7; font-weight: 600; white-space: nowrap; }
        .cust-mode-badge {
          padding: 0.1rem 0.4rem;
          border-radius: 99px;
          border-width: 1px;
          border-style: solid;
          font-size: 0.65rem;
          font-weight: 600;
          white-space: nowrap;
        }
        .cust-tx-print {
          display: grid;
          place-items: center;
          width: 1.4rem;
          height: 1.4rem;
          border-radius: 0.3rem;
          border: 1px solid #27272a;
          background: transparent;
          color: #52525b;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 130ms, color 130ms;
        }
        .cust-tx-print:hover { background: #1a1a1e; color: #a1a1aa; }

        /* ── Footer ─────────────────────────────────────────── */
        .cust-detail-footer {
          padding: 0.85rem 1rem;
          border-top: 1px solid #1a1a1e;
        }
        .cust-whatsapp-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.6rem;
          border-radius: 0.6rem;
          border: 1px solid #4b391d;
          background: #17130c;
          color: #d8aa4a;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 160ms, border-color 160ms;
        }
        .cust-whatsapp-btn:hover { background: #1e1a0e; border-color: #d8aa4a; }

        @media (max-width: 1200px) {
          .cust-stats { grid-template-columns: repeat(2, 1fr); }
          .cust-detail-panel { width: 280px; }
        }
        @media (max-width: 900px) {
          .cust-root { flex-direction: column; }
          .cust-detail-panel { width: 100%; position: static; max-height: none; }
          .cust-stats { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="cust-root">
        {/* ── Main ─────────────────────────────────────────── */}
        <div className="cust-main">
          {/* Page header */}
          <div className="cust-page-header">
            <div>
              <div className="cust-title-row">
                <h1 className="cust-title">Customers</h1>
                <div className="cust-title-icon"><Users size={16} /></div>
              </div>
              <p className="cust-subtitle">Manage your temple devotees and their transaction history.</p>
            </div>
            <div className="cust-actions">
              <button className="cust-btn-outline">
                <Upload size={14} /> Import Customers
              </button>
              <button className="cust-btn-primary">
                <UserPlus size={14} /> Add New Customer
              </button>
            </div>
          </div>

          {/* Stat cards */}
          <div className="cust-stats">
            <StatCard icon={Users} label="Total Customers" value="1,892" sub="All registered devotees" />
            <StatCard icon={UserPlus} label="New This Month" value="28" sub="New customers" />
            <StatCard icon={ReceiptText} label="Total Receipts" value="2,342" sub="All time receipts" />
            <StatCard icon={BadgeIndianRupee} label="Total Donations" value="₹ 12,45,680" sub="All time donations" />
          </div>

          {/* Table */}
          <div className="cust-table-panel">
            <div className="cust-table-toolbar">
              <div className="cust-search-wrap">
                <Search size={14} className="cust-search-icon" />
                <input
                  className="cust-search-input"
                  placeholder="Search by name, phone or nakshatra..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                />
              </div>
              <select
                className="cust-nakshatra-select"
                value={nakshatra}
                onChange={(e) => { setNakshatra(e.target.value); setPage(1); }}
              >
                {NAKSHATRAS.map((n) => <option key={n}>{n}</option>)}
              </select>
              <button className="cust-filter-btn">
                <Filter size={13} /> Filter
              </button>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table className="cust-table">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Nakshatra</th>
                    <th>Phone</th>
                    <th>Total Receipts</th>
                    <th>Total Amount</th>
                    <th>Last Visit</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => setSelected(c)}
                      className={selected?.id === c.id ? "cust-row-active" : ""}
                    >
                      <td>
                        <div className="cust-customer-cell">
                          <div className="cust-avatar"><Users size={12} /></div>
                          <span className="cust-customer-name">{c.name}</span>
                        </div>
                      </td>
                      <td><NakshatraBadge name={c.nakshatra} /></td>
                      <td>{c.phone}</td>
                      <td>{c.totalReceipts}</td>
                      <td><span className="cust-amount">{fmt(c.totalAmount)}</span></td>
                      <td>{c.lastVisit}</td>
                      <td>
                        <div className="cust-actions-cell">
                          <button
                            className={`cust-icon-btn ${selected?.id === c.id ? "cust-icon-btn-active" : ""}`}
                            onClick={(e) => { e.stopPropagation(); setSelected(c); }}
                            aria-label="View customer"
                          >
                            <Eye size={13} />
                          </button>
                          <button className="cust-icon-btn" aria-label="More options">
                            <MoreHorizontal size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginated.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center", color: "#52525b", padding: "2rem" }}>
                        No customers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="cust-pagination">
              <span>Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, filtered.length)} of {filtered.length} customers</span>
              <div className="cust-page-btns">
                <button
                  className="cust-page-btn"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={13} />
                </button>
                {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    className={`cust-page-btn ${page === p ? "cust-page-btn-active" : ""}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ))}
                {totalPages > 3 && <span style={{ color: "#52525b" }}>…</span>}
                {totalPages > 3 && (
                  <button
                    className={`cust-page-btn ${page === totalPages ? "cust-page-btn-active" : ""}`}
                    onClick={() => setPage(totalPages)}
                  >
                    {totalPages}
                  </button>
                )}
                <button
                  className="cust-page-btn"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Detail panel ──────────────────────────────────── */}
        {selected && (
          <CustomerDetailPanel
            customer={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </div>
    </>
  );
}