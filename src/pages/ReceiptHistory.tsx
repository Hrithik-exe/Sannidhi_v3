import { useState } from "react";
import {
  Search,
  CalendarDays,
  ChevronDown,
  Filter,
  Eye,
  Printer,
  Download,
  Copy,
  BarChart3,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Star,
  FileDown,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────── */
type PayMode = "Cash" | "UPI" | "Card";

interface Receipt {
  id: string;
  date: string;
  time: string;
  customer: string;
  nakshatra: string;
  mobile: string;
  amount: number;
  mode: PayMode;
}

/* ─── Mock data ──────────────────────────────────────────────── */
const ALL_RECEIPTS: Receipt[] = [
  { id: "R-2025-2343", date: "25 May 2025", time: "11:30 AM", customer: "Ramesh Kumar",    nakshatra: "Rohini",          mobile: "9876543210", amount: 50,    mode: "Cash" },
  { id: "R-2025-2342", date: "25 May 2025", time: "10:15 AM", customer: "Suresh Babu",     nakshatra: "Anuradha",        mobile: "9123456780", amount: 750,   mode: "UPI"  },
  { id: "R-2025-2341", date: "25 May 2025", time: "09:45 AM", customer: "Lakshmi Devi",    nakshatra: "Pushya",          mobile: "9988776655", amount: 2100,  mode: "Card" },
  { id: "R-2025-2340", date: "24 May 2025", time: "06:20 PM", customer: "Prasad Rao",      nakshatra: "Mrigashirsha",    mobile: "9000090000", amount: 500,   mode: "Cash" },
  { id: "R-2025-2339", date: "24 May 2025", time: "05:10 PM", customer: "Anitha Reddy",    nakshatra: "Hasta",           mobile: "9345678901", amount: 1500,  mode: "UPI"  },
  { id: "R-2025-2338", date: "24 May 2025", time: "04:05 PM", customer: "Venkatesh M.",    nakshatra: "Shravana",        mobile: "9876501234", amount: 300,   mode: "Cash" },
  { id: "R-2025-2337", date: "23 May 2025", time: "07:40 PM", customer: "Padmaja N.",      nakshatra: "Revati",          mobile: "8123456789", amount: 1000,  mode: "Card" },
  { id: "R-2025-2336", date: "23 May 2025", time: "06:30 PM", customer: "Karthik G.",      nakshatra: "Uttara Phalguni", mobile: "9900112233", amount: 750,   mode: "UPI"  },
  { id: "R-2025-2335", date: "23 May 2025", time: "05:45 PM", customer: "Meena Iyer",      nakshatra: "Poorva Ashadha",  mobile: "9340012345", amount: 400,   mode: "Cash" },
  { id: "R-2025-2334", date: "22 May 2025", time: "08:15 PM", customer: "Raghavendra",     nakshatra: "Dhanishta",       mobile: "9845612345", amount: 2000,  mode: "Card" },
  { id: "R-2025-2333", date: "22 May 2025", time: "03:00 PM", customer: "Sita Devi",       nakshatra: "Ashwini",         mobile: "9876000001", amount: 125,   mode: "Cash" },
  { id: "R-2025-2332", date: "21 May 2025", time: "02:15 PM", customer: "Bhaskar Rao",     nakshatra: "Bharani",         mobile: "9812345670", amount: 500,   mode: "UPI"  },
  { id: "R-2025-2331", date: "21 May 2025", time: "11:00 AM", customer: "Geetha M.",       nakshatra: "Rohini",          mobile: "9988001122", amount: 200,   mode: "Card" },
  { id: "R-2025-2330", date: "20 May 2025", time: "10:30 AM", customer: "Vijay Kumar",     nakshatra: "Anuradha",        mobile: "9700112233", amount: 1000,  mode: "Cash" },
  { id: "R-2025-2329", date: "20 May 2025", time: "09:00 AM", customer: "Nalini S.",       nakshatra: "Pushya",          mobile: "9654321000", amount: 3000,  mode: "UPI"  },
  { id: "R-2025-2328", date: "19 May 2025", time: "06:00 PM", customer: "Mohan Das",       nakshatra: "Hasta",           mobile: "9001234567", amount: 75,    mode: "Cash" },
  { id: "R-2025-2327", date: "19 May 2025", time: "04:30 PM", customer: "Kavitha R.",      nakshatra: "Shravana",        mobile: "9123000456", amount: 500,   mode: "Card" },
  { id: "R-2025-2326", date: "18 May 2025", time: "07:00 PM", customer: "Sunil Shetty",    nakshatra: "Revati",          mobile: "9900456789", amount: 250,   mode: "UPI"  },
  { id: "R-2025-2325", date: "18 May 2025", time: "05:20 PM", customer: "Radha Krishnan",  nakshatra: "Dhanishta",       mobile: "9800123456", amount: 1500,  mode: "Cash" },
  { id: "R-2025-2324", date: "17 May 2025", time: "03:45 PM", customer: "Priya Nair",      nakshatra: "Rohini",          mobile: "9600111222", amount: 800,   mode: "Card" },
];

/* ─── Helpers ────────────────────────────────────────────────── */
const fmt = (n: number) => "₹ " + n.toLocaleString("en-IN");

const modeStyle: Record<PayMode, string> = {
  Cash: "rh-badge-cash",
  UPI:  "rh-badge-upi",
  Card: "rh-badge-card",
};

const NAKSHATRAS = [
  "All Nakshatras", "Rohini", "Anuradha", "Pushya", "Mrigashirsha",
  "Hasta", "Shravana", "Revati", "Uttara Phalguni", "Poorva Ashadha",
  "Dhanishta", "Ashwini", "Bharani",
];

/* ─── Donut chart ────────────────────────────────────────────── */
function DonutChart() {
  // Cash 50%, UPI 33%, Card 17%
  const segments = [
    { pct: 50, color: "#22c55e", label: "Cash",  amount: "₹ 6,23,450" },
    { pct: 33, color: "#6366f1", label: "UPI",   amount: "₹ 4,12,200" },
    { pct: 17, color: "#3b82f6", label: "Card",  amount: "₹ 2,10,030" },
  ];
  const r = 40, cx = 56, cy = 56, stroke = 18;
  const circ = 2 * Math.PI * r;

  let cumulative = 0;
  const slices = segments.map((s) => {
    const offset = circ - (s.pct / 100) * circ;
    const rotate = cumulative * 3.6 - 90;
    cumulative += s.pct;
    return { ...s, offset, rotate };
  });

  return (
    <div className="rh-donut-wrap">
      <svg width="112" height="112" viewBox="0 0 112 112">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1a1a1e" strokeWidth={stroke} />
        {slices.map((s) => (
          <circle
            key={s.label}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={stroke}
            strokeDasharray={`${circ - s.offset} ${s.offset}`}
            strokeDashoffset={s.offset}
            transform={`rotate(${s.rotate} ${cx} ${cy})`}
            strokeLinecap="butt"
          />
        ))}
      </svg>
      <div className="rh-donut-legend">
        {segments.map((s) => (
          <div key={s.label} className="rh-legend-row">
            <span className="rh-legend-dot" style={{ background: s.color }} />
            <span className="rh-legend-label">{s.label}</span>
            <span className="rh-legend-amt">{s.amount} ({s.pct}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
const PER_PAGE_OPTIONS = [10, 25, 50];

export default function ReceiptHistory() {
  const [search, setSearch]       = useState("");
  const [nakshatra, setNakshatra] = useState("All Nakshatras");
  const [mode, setMode]           = useState("All Modes");
  const [minAmt, setMinAmt]       = useState("");
  const [maxAmt, setMaxAmt]       = useState("");
  const [page, setPage]           = useState(1);
  const [perPage, setPerPage]     = useState(10);

  /* filtering */
  const filtered = ALL_RECEIPTS.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.id.toLowerCase().includes(q) || r.customer.toLowerCase().includes(q) || r.mobile.includes(q);
    const matchNak    = nakshatra === "All Nakshatras" || r.nakshatra === nakshatra;
    const matchMode   = mode === "All Modes" || r.mode === mode;
    const matchMin    = !minAmt || r.amount >= Number(minAmt);
    const matchMax    = !maxAmt || r.amount <= Number(maxAmt);
    return matchSearch && matchNak && matchMode && matchMin && matchMax;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated  = filtered.slice((page - 1) * perPage, page * perPage);

  const visiblePages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, "...", totalPages);
    }
    return pages;
  };

  return (
    <>
      <style>{`
        /* ── Root ───────────────────────────────────────────── */
        .rh-root { display: grid; grid-template-columns: 1fr 260px; gap: 1.25rem; align-items: flex-start; }
        .rh-main { display: flex; flex-direction: column; gap: 1rem; min-width: 0; }

        /* ── Header ─────────────────────────────────────────── */
        .rh-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
        .rh-title { font-size: 1.55rem; font-weight: 700; color: #fff; letter-spacing: -0.02em; }
        .rh-subtitle { margin-top: 0.2rem; font-size: 0.8rem; color: #71717a; }
        .rh-header-actions { display: flex; align-items: center; gap: 0.6rem; flex-shrink: 0; }
        .rh-date-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.4rem 0.8rem; border-radius: 0.55rem;
          border: 1px solid #27272a; background: #111; color: #a1a1aa;
          font-size: 0.78rem; cursor: pointer; transition: border-color 150ms;
        }
        .rh-date-btn:hover { border-color: #4b391d; color: #d8aa4a; }
        .rh-export-btn {
          display: inline-flex; align-items: center; gap: 0.45rem;
          padding: 0.4rem 0.85rem; border-radius: 0.55rem;
          border: none; background: #d8aa4a; color: #0d0d0d;
          font-size: 0.78rem; font-weight: 700; cursor: pointer; transition: background 150ms;
        }
        .rh-export-btn:hover { background: #e8be5a; }

        /* ── Filters ────────────────────────────────────────── */
        .rh-filters {
          display: grid; grid-template-columns: 1fr 1fr auto auto 1fr;
          gap: 0.6rem; align-items: end;
          padding: 0.85rem 1rem; border-radius: 0.75rem;
          border: 1px solid #1f1f23; background: #101010;
        }
        .rh-filter-label { font-size: 0.68rem; color: #52525b; font-weight: 500; margin-bottom: 0.3rem; }
        .rh-search-wrap { position: relative; }
        .rh-search-ico { position: absolute; left: 0.65rem; top: 50%; transform: translateY(-50%); color: #52525b; pointer-events: none; }
        .rh-input {
          width: 100%; padding: 0.42rem 0.75rem 0.42rem 2rem;
          border-radius: 0.5rem; border: 1px solid #27272a;
          background: #0d0d0d; color: #e4e4e7; font-size: 0.78rem; outline: none;
          transition: border-color 150ms;
        }
        .rh-input::placeholder { color: #52525b; }
        .rh-input:focus { border-color: #4b391d; }
        .rh-select {
          width: 100%; padding: 0.42rem 1.8rem 0.42rem 0.7rem;
          border-radius: 0.5rem; border: 1px solid #27272a;
          background: #0d0d0d; color: #a1a1aa; font-size: 0.78rem; outline: none; cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 0.5rem center;
        }
        .rh-amt-row { display: flex; align-items: center; gap: 0.3rem; }
        .rh-amt-input {
          width: 100%; padding: 0.42rem 0.6rem;
          border-radius: 0.5rem; border: 1px solid #27272a;
          background: #0d0d0d; color: #e4e4e7; font-size: 0.78rem; outline: none;
          transition: border-color 150ms;
        }
        .rh-amt-input::placeholder { color: #52525b; }
        .rh-amt-input:focus { border-color: #4b391d; }
        .rh-amt-sep { color: #52525b; font-size: 0.75rem; flex-shrink: 0; }
        .rh-date-range-wrap { position: relative; }
        .rh-date-ico { position: absolute; left: 0.65rem; top: 50%; transform: translateY(-50%); color: #52525b; pointer-events: none; }
        .rh-date-input {
          width: 100%; padding: 0.42rem 0.75rem 0.42rem 2rem;
          border-radius: 0.5rem; border: 1px solid #27272a;
          background: #0d0d0d; color: #a1a1aa; font-size: 0.78rem; outline: none;
          cursor: pointer; transition: border-color 150ms;
        }

        /* ── Table panel ─────────────────────────────────────── */
        .rh-table-panel { border-radius: 0.75rem; border: 1px solid #1f1f23; background: #101010; overflow: hidden; }
        .rh-table-bar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.65rem 1rem; border-bottom: 1px solid #1a1a1e;
        }
        .rh-count-text { font-size: 0.78rem; color: #71717a; }
        .rh-sort-btn {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.35rem 0.7rem; border-radius: 0.45rem;
          border: 1px solid #27272a; background: #0d0d0d; color: #a1a1aa;
          font-size: 0.75rem; cursor: pointer; transition: border-color 150ms;
        }
        .rh-sort-btn:hover { border-color: #4b391d; color: #d8aa4a; }

        /* table */
        .rh-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
        .rh-table thead tr { background: #0b0b0b; border-bottom: 1px solid #1a1a1e; }
        .rh-table th { padding: 0.6rem 0.9rem; text-align: left; font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #52525b; white-space: nowrap; }
        .rh-table tbody tr { border-bottom: 1px solid #131316; transition: background 120ms; cursor: pointer; }
        .rh-table tbody tr:hover { background: #131316; }
        .rh-table td { padding: 0.65rem 0.9rem; color: #a1a1aa; vertical-align: middle; white-space: nowrap; }
        .rh-receipt-id { color: #d8aa4a; font-weight: 600; font-size: 0.78rem; }
        .rh-date-cell { line-height: 1.3; }
        .rh-date-main { color: #d4d4d8; font-size: 0.78rem; }
        .rh-date-sub { color: #52525b; font-size: 0.7rem; }
        .rh-customer { color: #e4e4e7; font-weight: 500; }
        .rh-nak-badge {
          display: inline-flex; align-items: center; gap: 0.25rem;
          padding: 0.12rem 0.4rem; border-radius: 99px;
          border: 1px solid #3a2e12; background: #1a1509;
          color: #c9993a; font-size: 0.67rem; font-weight: 500;
        }
        .rh-amount { color: #e4e4e7; font-weight: 600; }
        .rh-badge-cash { display: inline-block; padding: 0.15rem 0.55rem; border-radius: 99px; border: 1px solid #14532d; background: #052e16; color: #4ade80; font-size: 0.7rem; font-weight: 600; }
        .rh-badge-upi  { display: inline-block; padding: 0.15rem 0.55rem; border-radius: 99px; border: 1px solid #312e81; background: #1e1b4b; color: #818cf8; font-size: 0.7rem; font-weight: 600; }
        .rh-badge-card { display: inline-block; padding: 0.15rem 0.55rem; border-radius: 99px; border: 1px solid #1e3a5f; background: #0c1a2e; color: #60a5fa; font-size: 0.7rem; font-weight: 600; }
        .rh-actions-cell { display: flex; align-items: center; gap: 0.3rem; }
        .rh-icon-btn {
          display: grid; place-items: center; width: 1.7rem; height: 1.7rem;
          border-radius: 0.35rem; border: 1px solid transparent; background: transparent;
          color: #52525b; cursor: pointer; transition: all 130ms;
        }
        .rh-icon-btn:hover { background: #17130c; color: #d8aa4a; border-color: #4b391d; }

        /* ── Pagination ──────────────────────────────────────── */
        .rh-pagination {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.6rem 1rem; border-top: 1px solid #1a1a1e; font-size: 0.75rem; color: #52525b;
        }
        .rh-page-btns { display: flex; align-items: center; gap: 0.3rem; }
        .rh-page-btn {
          display: grid; place-items: center; min-width: 1.7rem; height: 1.7rem; padding: 0 0.25rem;
          border-radius: 0.35rem; border: 1px solid #27272a; background: #0d0d0d;
          color: #a1a1aa; font-size: 0.75rem; cursor: pointer; transition: all 130ms;
        }
        .rh-page-btn:hover { border-color: #4b391d; color: #d8aa4a; }
        .rh-page-btn-active { border-color: #d8aa4a; background: #1e1609; color: #d8aa4a; font-weight: 700; }
        .rh-page-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .rh-perpage-select {
          padding: 0.3rem 1.5rem 0.3rem 0.5rem;
          border-radius: 0.4rem; border: 1px solid #27272a; background: #0d0d0d;
          color: #a1a1aa; font-size: 0.73rem; outline: none; cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 0.35rem center;
        }

        /* ── Sidebar ─────────────────────────────────────────── */
        .rh-sidebar { display: flex; flex-direction: column; gap: 0.85rem; position: sticky; top: 100px; }
        .rh-sidebar-card { border-radius: 0.75rem; border: 1px solid #1f1f23; background: #101010; overflow: hidden; }
        .rh-sidebar-header { display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 0.9rem; border-bottom: 1px solid #1a1a1e; }
        .rh-sidebar-title { font-size: 0.85rem; font-weight: 600; color: #e4e4e7; }
        .rh-sidebar-icon-btn { display: grid; place-items: center; width: 1.5rem; height: 1.5rem; border-radius: 0.3rem; border: 1px solid #27272a; background: transparent; color: #71717a; cursor: pointer; transition: all 130ms; }
        .rh-sidebar-icon-btn:hover { background: #17130c; color: #d8aa4a; border-color: #4b391d; }

        .rh-summary-grid { display: grid; grid-template-columns: 1fr 1fr; }
        .rh-summary-cell { padding: 0.7rem 0.9rem; border-right: 1px solid #1a1a1e; border-bottom: 1px solid #1a1a1e; }
        .rh-summary-cell:nth-child(2n) { border-right: none; }
        .rh-summary-cell:nth-child(3), .rh-summary-cell:nth-child(4) { border-bottom: none; }
        .rh-summary-label { font-size: 0.67rem; color: #52525b; display: flex; align-items: center; gap: 0.3rem; }
        .rh-summary-value { font-size: 1.05rem; font-weight: 700; color: #e4e4e7; margin-top: 0.25rem; letter-spacing: -0.01em; }

        /* donut */
        .rh-donut-wrap { display: flex; align-items: center; gap: 0.75rem; padding: 0.9rem; }
        .rh-donut-legend { display: flex; flex-direction: column; gap: 0.45rem; flex: 1; min-width: 0; }
        .rh-legend-row { display: flex; align-items: center; gap: 0.35rem; }
        .rh-legend-dot { width: 0.5rem; height: 0.5rem; border-radius: 50%; flex-shrink: 0; }
        .rh-legend-label { font-size: 0.72rem; color: #a1a1aa; min-width: 28px; }
        .rh-legend-amt { font-size: 0.67rem; color: #71717a; }

        /* top offerings */
        .rh-offerings-list { padding: 0.5rem 0.9rem 0.75rem; display: flex; flex-direction: column; gap: 0; }
        .rh-offering-row { display: flex; align-items: center; justify-content: space-between; padding: 0.45rem 0; border-bottom: 1px solid #141418; gap: 0.5rem; }
        .rh-offering-row:last-child { border-bottom: none; }
        .rh-offering-icon { display: grid; place-items: center; width: 1.5rem; height: 1.5rem; border-radius: 0.35rem; border: 1px solid #4b391d; background: #17130c; color: #d8aa4a; flex-shrink: 0; }
        .rh-offering-name { font-size: 0.75rem; color: #d4d4d8; flex: 1; min-width: 0; }
        .rh-offering-amt { font-size: 0.75rem; font-weight: 600; color: #e4e4e7; flex-shrink: 0; }

        @media (max-width: 1100px) {
          .rh-root { grid-template-columns: 1fr; }
          .rh-sidebar { position: static; }
          .rh-filters { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="rh-root">
        {/* ── Main ─────────────────────────────────────────── */}
        <div className="rh-main">
          {/* Header */}
          <div className="rh-header">
            <div>
              <h1 className="rh-title">Receipt History</h1>
              <p className="rh-subtitle">View and manage all temple receipts.</p>
            </div>
            <div className="rh-header-actions">
              <button className="rh-date-btn">
                <CalendarDays size={13} />
                01 May 2025 – 25 May 2025
                <ChevronDown size={12} />
              </button>
              <button className="rh-export-btn">
                <FileDown size={14} /> Export
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="rh-filters">
            <div>
              <p className="rh-filter-label">Search</p>
              <div className="rh-search-wrap">
                <Search size={13} className="rh-search-ico" />
                <input
                  className="rh-input"
                  placeholder="Search by receipt no., name, phone..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                />
              </div>
            </div>
            <div>
              <p className="rh-filter-label">Date Range</p>
              <div className="rh-date-range-wrap">
                <CalendarDays size={13} className="rh-date-ico" />
                <input className="rh-date-input" defaultValue="01 May 2025 – 25 May 2025" readOnly />
              </div>
            </div>
            <div>
              <p className="rh-filter-label">Payment Mode</p>
              <select
                className="rh-select"
                value={mode}
                onChange={(e) => { setMode(e.target.value); setPage(1); }}
              >
                {["All Modes", "Cash", "UPI", "Card"].map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <p className="rh-filter-label">Nakshatra</p>
              <select
                className="rh-select"
                value={nakshatra}
                onChange={(e) => { setNakshatra(e.target.value); setPage(1); }}
              >
                {NAKSHATRAS.map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <p className="rh-filter-label">Amount Range</p>
              <div className="rh-amt-row">
                <input className="rh-amt-input" placeholder="Min" value={minAmt} onChange={(e) => { setMinAmt(e.target.value); setPage(1); }} inputMode="numeric" />
                <span className="rh-amt-sep">–</span>
                <input className="rh-amt-input" placeholder="Max" value={maxAmt} onChange={(e) => { setMaxAmt(e.target.value); setPage(1); }} inputMode="numeric" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="rh-table-panel">
            <div className="rh-table-bar">
              <span className="rh-count-text">Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, filtered.length)} of {filtered.length} receipts</span>
              <button className="rh-sort-btn">
                Sort by: Date (Newest) <ChevronDown size={11} />
              </button>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table className="rh-table">
                <thead>
                  <tr>
                    <th>Receipt No.</th>
                    <th>Date &amp; Time</th>
                    <th>Customer Name</th>
                    <th>Nakshatra</th>
                    <th>Mobile</th>
                    <th>Amount</th>
                    <th>Payment Mode</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((r) => (
                    <tr key={r.id}>
                      <td><span className="rh-receipt-id">{r.id}</span></td>
                      <td>
                        <div className="rh-date-cell">
                          <div className="rh-date-main">{r.date}</div>
                          <div className="rh-date-sub">{r.time}</div>
                        </div>
                      </td>
                      <td><span className="rh-customer">{r.customer}</span></td>
                      <td>
                        <span className="rh-nak-badge">
                          <Star size={9} />
                          {r.nakshatra}
                        </span>
                      </td>
                      <td>{r.mobile}</td>
                      <td><span className="rh-amount">{fmt(r.amount)}</span></td>
                      <td><span className={modeStyle[r.mode]}>{r.mode}</span></td>
                      <td>
                        <div className="rh-actions-cell">
                          <button className="rh-icon-btn" aria-label="View"><Eye size={13} /></button>
                          <button className="rh-icon-btn" aria-label="Print"><Printer size={13} /></button>
                          <button className="rh-icon-btn" aria-label="Download"><Download size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginated.length === 0 && (
                    <tr>
                      <td colSpan={8} style={{ textAlign: "center", color: "#52525b", padding: "2.5rem" }}>
                        No receipts found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="rh-pagination">
              <div className="rh-page-btns">
                <button className="rh-page-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} aria-label="Previous">
                  <ChevronLeft size={12} />
                </button>
                {visiblePages().map((p, i) =>
                  p === "..." ? (
                    <span key={`ellipsis-${i}`} style={{ color: "#52525b", padding: "0 0.15rem" }}>…</span>
                  ) : (
                    <button
                      key={p}
                      className={`rh-page-btn ${page === p ? "rh-page-btn-active" : ""}`}
                      onClick={() => setPage(Number(p))}
                    >
                      {p}
                    </button>
                  )
                )}
                <button className="rh-page-btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} aria-label="Next">
                  <ChevronRight size={12} />
                </button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <select
                  className="rh-perpage-select"
                  value={perPage}
                  onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
                >
                  {PER_PAGE_OPTIONS.map((n) => <option key={n} value={n}>{n} / page</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ── Sidebar ───────────────────────────────────────── */}
        <aside className="rh-sidebar">
          {/* Summary */}
          <div className="rh-sidebar-card">
            <div className="rh-sidebar-header">
              <span className="rh-sidebar-title">Receipt Summary</span>
              <button className="rh-sidebar-icon-btn"><BarChart3 size={13} /></button>
            </div>
            <div className="rh-summary-grid">
              <div className="rh-summary-cell">
                <p className="rh-summary-label"><span>Total Receipts</span> <Copy size={10} /></p>
                <p className="rh-summary-value">2,342</p>
              </div>
              <div className="rh-summary-cell">
                <p className="rh-summary-label"><span>Total Amount</span> <Copy size={10} /></p>
                <p className="rh-summary-value" style={{ fontSize: "0.88rem" }}>₹ 12,45,680</p>
              </div>
              <div className="rh-summary-cell">
                <p className="rh-summary-label"><span>Average Amount</span> <BarChart3 size={10} /></p>
                <p className="rh-summary-value">₹ 531</p>
              </div>
              <div className="rh-summary-cell">
                <p className="rh-summary-label"><span>Refunds</span> <AlertCircle size={10} /></p>
                <p className="rh-summary-value">₹ 0</p>
              </div>
            </div>
          </div>

          {/* Donut */}
          <div className="rh-sidebar-card">
            <div className="rh-sidebar-header">
              <span className="rh-sidebar-title">Payment Mode Distribution</span>
            </div>
            <DonutChart />
          </div>

          {/* Top offerings */}
          <div className="rh-sidebar-card">
            <div className="rh-sidebar-header">
              <span className="rh-sidebar-title">Top Offerings (By Amount)</span>
              <button className="rh-sidebar-icon-btn"><Filter size={12} /></button>
            </div>
            <div className="rh-offerings-list">
              {[
                { name: "Archana",             amount: "₹ 4,25,000" },
                { name: "Abhishekam",          amount: "₹ 2,85,000" },
                { name: "Nitya Pooja",         amount: "₹ 1,75,000" },
                { name: "Sahasranama Archana", amount: "₹ 1,60,000" },
                { name: "Others",              amount: "₹ 2,00,660" },
              ].map((o) => (
                <div key={o.name} className="rh-offering-row">
                  <div className="rh-offering-icon"><Star size={11} /></div>
                  <span className="rh-offering-name">{o.name}</span>
                  <span className="rh-offering-amt">{o.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
