import { useState } from "react";
import {
  Download,
  ChevronDown,
  BadgeIndianRupee,
  ReceiptText,
  Star,
} from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────── */

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const TREND_DATA = [28000,32000,45000,38000,55000,62000,58000,74000,69000,88000,92000,78000,
  95000,102000,88000,115000,124000,108000,132000,118000,142000,128000,138000,150000,135000,145000,128000,139000,125000,142000,130000];

const OFFERING_PIE = [
  { label: "Archana",             pct: 34.1, color: "#d8aa4a" },
  { label: "Abhishekam",          pct: 22.9, color: "#22c55e" },
  { label: "Nithya Pooja",        pct: 14.0, color: "#3b82f6" },
  { label: "Sahasranama Archana", pct: 12.8, color: "#8b5cf6" },
  { label: "Others",              pct: 16.2, color: "#71717a" },
];

const OFFERINGS = [
  { name: "Archana",                receipts: 845, amount: 425000, pct: 34.12 },
  { name: "Abhishekam",             receipts: 532, amount: 285000, pct: 22.86 },
  { name: "Nithya Pooja",           receipts: 328, amount: 175000, pct: 14.04 },
  { name: "Sahasranama Archana",    receipts: 261, amount: 160000, pct: 12.84 },
  { name: "Deepam",                 receipts: 182, amount:  95000, pct:  7.63 },
  { name: "Annadanam",              receipts: 145, amount:  90000, pct:  7.22 },
  { name: "Kumkumarchana",          receipts: 102, amount:  65000, pct:  5.22 },
  { name: "Lalitha Sahasranama",    receipts:  95, amount:  55000, pct:  4.41 },
  { name: "Vastram",                receipts:  78, amount:  45000, pct:  3.61 },
  { name: "Vahanam Seva",           receipts:  68, amount:  40000, pct:  3.21 },
  { name: "Thomala Seva",           receipts:  64, amount:  35000, pct:  2.81 },
  { name: "Suprabhatam",            receipts:  58, amount:  30000, pct:  2.41 },
  { name: "Nitya Archana",          receipts:  52, amount:  28000, pct:  2.25 },
  { name: "Ashtottara Archana",     receipts:  49, amount:  25000, pct:  2.01 },
  { name: "Archana (Family)",       receipts:  41, amount:  22000, pct:  1.77 },
  { name: "Ashtottara Abhishekam",  receipts:  36, amount:  18000, pct:  1.45 },
  { name: "Navagraha Pooja",        receipts:  33, amount:  16000, pct:  1.28 },
  { name: "Satyanarayana Pooja",    receipts:  30, amount:  15000, pct:  1.20 },
  { name: "Ganapathi Homam",        receipts:  27, amount:  14000, pct:  1.12 },
  { name: "Kalyanоtsavam",          receipts:  24, amount:  12000, pct:  0.96 },
  { name: "Homam",                  receipts:  21, amount:  10000, pct:  0.80 },
];

const fmt = (n: number) =>
  "₹ " + n.toLocaleString("en-IN");

/* ─── Line chart ─────────────────────────────────────────────── */
function TrendChart() {
  const W = 520, H = 200;
  const PAD = { top: 10, right: 10, bottom: 40, left: 64 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const maxVal = 160000;
  const yLabels = [0, 30000, 60000, 90000, 120000, 150000];
  const xLabels = ["01 May","06 May","11 May","16 May","21 May","25 May","31 May"];
  const xIndices = [0, 5, 10, 15, 20, 24, 30];

  const pts = TREND_DATA.map((v, i) => {
    const x = PAD.left + (i / (TREND_DATA.length - 1)) * chartW;
    const y = PAD.top + chartH - (v / maxVal) * chartH;
    return { x, y };
  });

  const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPath = `M${pts[0].x},${PAD.top + chartH} ` +
    pts.map((p) => `L${p.x},${p.y}`).join(" ") +
    ` L${pts[pts.length - 1].x},${PAD.top + chartH} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d8aa4a" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#d8aa4a" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* grid lines */}
      {yLabels.map((v) => {
        const y = PAD.top + chartH - (v / maxVal) * chartH;
        return (
          <g key={v}>
            <line x1={PAD.left} y1={y} x2={PAD.left + chartW} y2={y}
              stroke="#1f1f23" strokeWidth="1" strokeDasharray="4 5" />
            <text x={PAD.left - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#52525b">
              {v === 0 ? "₹0" : `₹${v / 1000 >= 100 ? (v / 100000).toFixed(0) + "L" : (v / 1000).toFixed(0) + "K"}`}
            </text>
          </g>
        );
      })}

      {/* x labels */}
      {xLabels.map((label, i) => {
        const x = PAD.left + (xIndices[i] / (TREND_DATA.length - 1)) * chartW;
        return (
          <text key={label} x={x} y={H - 6} textAnchor="middle" fontSize="9" fill="#52525b">
            {label}
          </text>
        );
      })}

      {/* area fill */}
      <path d={areaPath} fill="url(#trendGrad)" />

      {/* line */}
      <polyline points={polyline} fill="none" stroke="#d8aa4a" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />

      {/* dots at x-label positions */}
      {xIndices.map((idx, i) => (
        <circle key={i} cx={pts[idx].x} cy={pts[idx].y} r="3.5"
          fill="#0d0d0d" stroke="#d8aa4a" strokeWidth="2" />
      ))}
    </svg>
  );
}

/* ─── Donut chart ────────────────────────────────────────────── */
function OfferingDonut() {
  const r = 68, cx = 90, cy = 90, strokeW = 26;
  const circ = 2 * Math.PI * r;
  let cumulative = 0;

  const slices = OFFERING_PIE.map((s) => {
    const dashLen = (s.pct / 100) * circ;
    const dashOff = circ - dashLen;
    const rotate = cumulative * 3.6 - 90;
    cumulative += s.pct;
    return { ...s, dashLen, dashOff, rotate };
  });

  return (
    <div className="rp-donut-wrap">
      <div className="rp-donut-svg-wrap">
        <svg viewBox="0 0 180 180" style={{ width: "100%", height: "100%" }}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1a1a1e" strokeWidth={strokeW} />
          {slices.map((s) => (
            <circle key={s.label} cx={cx} cy={cy} r={r}
              fill="none" stroke={s.color} strokeWidth={strokeW}
              strokeDasharray={`${s.dashLen} ${circ - s.dashLen}`}
              strokeDashoffset={s.dashOff}
              transform={`rotate(${s.rotate} ${cx} ${cy})`}
              strokeLinecap="butt"
            />
          ))}
        </svg>
        <div className="rp-donut-center">
          <p className="rp-donut-amt">₹ 12,45,680</p>
          <p className="rp-donut-sub">Total Collection</p>
        </div>
      </div>
      <div className="rp-donut-legend">
        {OFFERING_PIE.map((s) => (
          <div key={s.label} className="rp-legend-row">
            <span className="rp-legend-dot" style={{ background: s.color }} />
            <span className="rp-legend-name">{s.label}</span>
            <span className="rp-legend-pct">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────── */
export default function Reports() {
  const [month, setMonth] = useState("May 2025");

  const left  = OFFERINGS.slice(0, 11);
  const right = OFFERINGS.slice(11);

  return (
    <>
      <style>{`
        /* ── Root ──────────────────────────────────────────── */
        .rp-main { display: flex; flex-direction: column; gap: 1rem; min-width: 0; }



        /* ── Page header ───────────────────────────────────── */
        .rp-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
        .rp-title { font-size: 1.5rem; font-weight: 700; color: #fff; letter-spacing: -0.02em; }
        .rp-subtitle { margin-top: 0.2rem; font-size: 0.8rem; color: #71717a; }

        /* ── Controls bar ──────────────────────────────────── */
        .rp-controls {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.7rem 1rem; border-radius: 0.75rem;
          border: 1px solid #1f1f23; background: #101010;
        }
        .rp-control-label { font-size: 0.72rem; color: #52525b; margin-right: 0.2rem; }
        .rp-select {
          padding: 0.38rem 1.8rem 0.38rem 0.65rem;
          border-radius: 0.5rem; border: 1px solid #27272a;
          background: #0d0d0d; color: #d4d4d8; font-size: 0.78rem;
          outline: none; cursor: pointer; appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 0.5rem center;
          transition: border-color 150ms;
        }
        .rp-select:focus { border-color: #4b391d; }
        .rp-control-sep { width: 1px; height: 1.4rem; background: #27272a; flex-shrink: 0; }
        .rp-export-btn {
          margin-left: auto; display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.38rem 0.85rem; border-radius: 0.55rem;
          border: 1px solid #d8aa4a; background: transparent;
          color: #d8aa4a; font-size: 0.78rem; font-weight: 600;
          cursor: pointer; transition: background 150ms;
        }
        .rp-export-btn:hover { background: #17130c; }

        /* ── Chart row ─────────────────────────────────────── */
        .rp-chart-row { display: grid; grid-template-columns: 1fr auto auto; gap: 0.85rem; }

        /* trend card */
        .rp-card {
          border-radius: 0.75rem; border: 1px solid #1f1f23;
          background: #101010; overflow: hidden;
        }
        .rp-card-header { display: flex; align-items: flex-start; justify-content: space-between; padding: 0.85rem 1rem 0.5rem; }
        .rp-card-title { font-size: 0.88rem; font-weight: 600; color: #d8aa4a; }
        .rp-card-sub { font-size: 0.72rem; color: #52525b; margin-top: 0.1rem; }
        .rp-chart-body { padding: 0.25rem 1rem 0.9rem; height: 200px; }

        .rp-trend-legend { display: flex; align-items: center; justify-content: center; gap: 0.4rem; padding-bottom: 0.5rem; }
        .rp-trend-dot { width: 0.5rem; height: 0.5rem; border-radius: 50%; background: #d8aa4a; }
        .rp-trend-legend-label { font-size: 0.7rem; color: #71717a; }

        /* donut card */
        .rp-donut-card { width: 310px; flex-shrink: 0; }
        .rp-donut-wrap { padding: 0.5rem 0.85rem 1rem; }
        .rp-donut-svg-wrap { position: relative; width: 180px; height: 180px; margin: 0 auto; }
        .rp-donut-center {
          position: absolute; inset: 0; display: flex; flex-direction: column;
          align-items: center; justify-content: center; text-align: center;
        }
        .rp-donut-amt { font-size: 0.8rem; font-weight: 700; color: #e4e4e7; }
        .rp-donut-sub { font-size: 0.62rem; color: #52525b; margin-top: 0.1rem; }
        .rp-donut-legend { margin-top: 0.75rem; display: flex; flex-direction: column; gap: 0.4rem; }
        .rp-legend-row { display: flex; align-items: center; gap: 0.5rem; }
        .rp-legend-dot { width: 0.55rem; height: 0.55rem; border-radius: 50%; flex-shrink: 0; }
        .rp-legend-name { font-size: 0.73rem; color: #a1a1aa; flex: 1; }
        .rp-legend-pct { font-size: 0.73rem; font-weight: 600; color: #d4d4d8; }

        /* summary card */
        .rp-summary-card { width: 200px; flex-shrink: 0; }
        .rp-summary-items { padding: 0.25rem 0 0.75rem; display: flex; flex-direction: column; }
        .rp-summary-item { display: flex; align-items: flex-start; gap: 0.6rem; padding: 0.65rem 1rem; border-bottom: 1px solid #141418; }
        .rp-summary-item:last-child { border-bottom: none; }
        .rp-summary-icon { display: grid; place-items: center; width: 1.8rem; height: 1.8rem; border-radius: 50%; border: 1px solid #4b391d; background: #17130c; color: #d8aa4a; flex-shrink: 0; }
        .rp-summary-label { font-size: 0.67rem; color: #52525b; }
        .rp-summary-value { font-size: 0.88rem; font-weight: 700; color: #e4e4e7; margin-top: 0.15rem; line-height: 1.2; }

        /* ── Offering table ─────────────────────────────────── */
        .rp-table-card { border-radius: 0.75rem; border: 1px solid #1f1f23; background: #101010; overflow: hidden; }
        .rp-table-header { padding: 0.85rem 1rem 0.5rem; border-bottom: 1px solid #1a1a1e; }
        .rp-table-wrap { display: grid; grid-template-columns: 1fr 1fr; }
        .rp-table-col { overflow-x: auto; }
        .rp-table-col:first-child { border-right: 1px solid #1a1a1e; }
        .rp-table {
          width: 100%; border-collapse: collapse; font-size: 0.78rem;
        }
        .rp-table thead tr { background: #0b0b0b; }
        .rp-table th {
          padding: 0.55rem 0.8rem; text-align: left; font-size: 0.67rem;
          font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #52525b;
          white-space: nowrap;
        }
        .rp-table tbody tr { border-bottom: 1px solid #131316; transition: background 120ms; }
        .rp-table tbody tr:hover { background: #131316; }
        .rp-table td { padding: 0.5rem 0.8rem; color: #a1a1aa; vertical-align: middle; }
        .rp-row-num { color: #52525b; font-size: 0.72rem; }
        .rp-offering-icon-cell { display: flex; align-items: center; gap: 0.45rem; }
        .rp-offering-icon-sm { display: grid; place-items: center; width: 1.3rem; height: 1.3rem; border-radius: 0.3rem; border: 1px solid #4b391d; background: #17130c; color: #d8aa4a; flex-shrink: 0; }
        .rp-offering-nm { color: #d4d4d8; font-size: 0.76rem; }
        .rp-amt-cell { color: #e4e4e7; font-weight: 600; white-space: nowrap; }
        .rp-pct-cell { color: #71717a; white-space: nowrap; }

        .rp-table-total {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.6rem 1rem; border-top: 1px solid #1f1f23;
          background: #0b0b0b; font-size: 0.8rem;
        }
        .rp-total-label { font-weight: 700; color: #e4e4e7; }
        .rp-total-right { display: flex; gap: 3rem; }
        .rp-total-receipts { font-weight: 700; color: #d4d4d8; }
        .rp-total-amount { font-weight: 700; color: #d8aa4a; }
        .rp-total-pct { font-weight: 700; color: #71717a; }

        @media (max-width: 1100px) {
          .rp-chart-row { grid-template-columns: 1fr; }
          .rp-donut-card, .rp-summary-card { width: 100%; }
          .rp-table-wrap { grid-template-columns: 1fr; }
          .rp-table-col:first-child { border-right: none; border-bottom: 1px solid #1a1a1e; }
        }
      `}</style>

      <div className="rp-main">
          {/* Header */}
          <div>
            <h1 className="rp-title">Reports</h1>
            <p className="rp-subtitle">View temple collection reports and offering summary.</p>
          </div>

          {/* Controls */}
          <div className="rp-controls">
            <span className="rp-control-label">Report Type</span>
            <select className="rp-select" defaultValue="Monthly">
              <option>Monthly</option>
              <option>Yearly</option>
            </select>

            <div className="rp-control-sep" />

            <span className="rp-control-label">Select Month</span>
            <select
              className="rp-select"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              {MONTHS.map((m) => (
                <option key={m} value={`${m} 2025`}>{m} 2025</option>
              ))}
            </select>

            <button className="rp-export-btn">
              <Download size={13} /> Export PDF
            </button>
          </div>

          {/* Chart row */}
          <div className="rp-chart-row">
            {/* Trend */}
            <div className="rp-card">
              <div className="rp-card-header">
                <div>
                  <p className="rp-card-title">Collection Trend</p>
                  <p className="rp-card-sub">Total collection trend for {month}</p>
                </div>
                <button className="rp-select" style={{ width: "auto" }}>Monthly <ChevronDown size={11} /></button>
              </div>
              <div className="rp-chart-body">
                <TrendChart />
              </div>
              <div className="rp-trend-legend">
                <span className="rp-trend-dot" />
                <span className="rp-trend-legend-label">Collection (₹)</span>
              </div>
            </div>

            {/* Donut */}
            <div className="rp-card rp-donut-card">
              <div className="rp-card-header">
                <div>
                  <p className="rp-card-title">Collection by Offering</p>
                  <p className="rp-card-sub">Distribution of total collection</p>
                </div>
              </div>
              <OfferingDonut />
            </div>

            {/* Summary */}
            <div className="rp-card rp-summary-card">
              <div className="rp-card-header">
                <div>
                  <p className="rp-card-title">Summary</p>
                </div>
              </div>
              <div className="rp-summary-items">
                <div className="rp-summary-item">
                  <div className="rp-summary-icon"><BadgeIndianRupee size={13} /></div>
                  <div>
                    <p className="rp-summary-label">Total Collection</p>
                    <p className="rp-summary-value">₹ 12,45,680</p>
                  </div>
                </div>
                <div className="rp-summary-item">
                  <div className="rp-summary-icon"><ReceiptText size={13} /></div>
                  <div>
                    <p className="rp-summary-label">Total Receipts</p>
                    <p className="rp-summary-value">2,342</p>
                  </div>
                </div>
                <div className="rp-summary-item">
                  <div className="rp-summary-icon"><Star size={13} /></div>
                  <div>
                    <p className="rp-summary-label">Most Popular Offering</p>
                    <p className="rp-summary-value">Archana</p>
                  </div>
                </div>
                <div className="rp-summary-item">
                  <div className="rp-summary-icon"><BadgeIndianRupee size={13} /></div>
                  <div>
                    <p className="rp-summary-label">Average Receipt Amount</p>
                    <p className="rp-summary-value">₹ 531</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Offering-wise table */}
          <div className="rp-table-card">
            <div className="rp-table-header">
              <p className="rp-card-title">Offering Wise Collection</p>
              <p className="rp-card-sub">Detailed collection for each offering</p>
            </div>

            <div className="rp-table-wrap">
              {/* Left column: items 1–11 */}
              <div className="rp-table-col">
                <table className="rp-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Offering Name</th>
                      <th>Receipts</th>
                      <th>Amount (₹)</th>
                      <th>% of Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {left.map((o, i) => (
                      <tr key={o.name}>
                        <td><span className="rp-row-num">{i + 1}</span></td>
                        <td>
                          <div className="rp-offering-icon-cell">
                            <div className="rp-offering-icon-sm"><Star size={9} /></div>
                            <span className="rp-offering-nm">{o.name}</span>
                          </div>
                        </td>
                        <td>{o.receipts}</td>
                        <td><span className="rp-amt-cell">{fmt(o.amount)}</span></td>
                        <td><span className="rp-pct-cell">{o.pct.toFixed(2)}%</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Right column: items 12–21 */}
              <div className="rp-table-col">
                <table className="rp-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Offering Name</th>
                      <th>Receipts</th>
                      <th>Amount (₹)</th>
                      <th>% of Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {right.map((o, i) => (
                      <tr key={o.name}>
                        <td><span className="rp-row-num">{i + 12}</span></td>
                        <td>
                          <div className="rp-offering-icon-cell">
                            <div className="rp-offering-icon-sm"><Star size={9} /></div>
                            <span className="rp-offering-nm">{o.name}</span>
                          </div>
                        </td>
                        <td>{o.receipts}</td>
                        <td><span className="rp-amt-cell">{fmt(o.amount)}</span></td>
                        <td><span className="rp-pct-cell">{o.pct.toFixed(2)}%</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Total row */}
            <div className="rp-table-total">
              <span className="rp-total-label">Total</span>
              <div className="rp-total-right">
                <span className="rp-total-receipts">2,342</span>
                <span className="rp-total-amount">₹ 12,45,680</span>
                <span className="rp-total-pct">100%</span>
              </div>
            </div>
          </div>
      </div>
    </>
  );
}