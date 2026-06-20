import { useMemo, useState } from "react";
import {
  BadgeIndianRupee,
  CalendarDays,
  Gift,
  Maximize2,
  Minus,
  Phone,
  Plus,
  Printer,
  ReceiptText,
  Save,
  Search,
  Star,
  UserRound,
} from "lucide-react";

type Offering = {
  id: string;
  code: string;
  name: string;
  price: number | null;
  note?: string;
};

const offerings: Offering[] = [
  { id: "pushpanjali", code: "01", name: "Pushpanjali", price: 7 },
  { id: "dhara", code: "02", name: "Dhara", price: 7 },
  { id: "neyyvilaku", code: "03", name: "Neyyvilaku", price: 20 },
  { id: "shreerudhra-dhara", code: "04", name: "Shreerudhra Dhara", price: 10 },
  { id: "vilakkumaala", code: "05", name: "Vilakkumaala", price: 15 },
  { id: "sukhatha-pushpanjali", code: "06", name: "Sukhatha Pushpanjali", price: 20 },
  { id: "kuuvala-maala", code: "07", name: "Kuuvala Maala", price: 20 },
  { id: "pinnvilakku", code: "08", name: "Pinnvilakku", price: 30 },
  { id: "ganapathi-homam", code: "09", name: "Ganapathi Homam", price: 60 },
  { id: "palum-podiyum", code: "10", name: "Palum Podiyum", price: 50 },
  { id: "chandhanam-charthal", code: "11", name: "Chandhanam Charthal", price: null, note: "Nil" },
  { id: "vedi-vazhipadu", code: "12", name: "Vedi Vazhipadu", price: 20 },
  { id: "otta", code: "13", name: "Otta", price: 70 },
  { id: "karuka-homam", code: "14", name: "Karuka Homam", price: 80 },
  { id: "mrithyunjaya-homam", code: "15", name: "Mrithyunjaya Homam", price: 200 },
  { id: "nithya-pooja", code: "16", name: "Nithya Pooja", price: 125 },
  { id: "maasavari", code: "17", name: "Maasavari", price: null, note: "Custom" },
  { id: "niramala", code: "18", name: "Niramala", price: null, note: "Custom" },
  { id: "donation", code: "19", name: "Donation", price: null, note: "Custom" },
  { id: "general", code: "20", name: "General", price: null, note: "Custom" },
  { id: "bhannaram", code: "21", name: "Bhannaram", price: null, note: "Custom" },
];

const nakshatras = [
  "Rohini",
  "Ashwini",
  "Bharani",
  "Karthika",
  "Makayiram",
  "Thiruvathira",
  "Punartham",
  "Pooyam",
  "Ayilyam",
  "Magham",
];

function formatAmount(amount: number) {
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}

export default function Receipts() {
  const [customerName, setCustomerName] = useState("Ramesh Kumar");
  const [nakshatra, setNakshatra] = useState("Rohini");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({
    pushpanjali: 1,
  });
  const [customPrices, setCustomPrices] = useState<Record<string, string>>({});

  const filteredOfferings = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return offerings;
    }

    return offerings.filter((offering) =>
      offering.name.toLowerCase().includes(query),
    );
  }, [searchTerm]);

  const selectedOfferings = offerings.filter(
    (offering) => (quantities[offering.id] ?? 0) > 0,
  );

  const totalItems = selectedOfferings.reduce(
    (total, offering) => total + (quantities[offering.id] ?? 0),
    0,
  );

  const getOfferingPrice = (offering: Offering) => {
    if (offering.price !== null) {
      return offering.price;
    }

    return Number(customPrices[offering.id]) || 0;
  };

  const totalAmount = selectedOfferings.reduce((total, offering) => {
    return total + getOfferingPrice(offering) * (quantities[offering.id] ?? 0);
  }, 0);

  const updateQuantity = (id: string, direction: 1 | -1) => {
    setQuantities((current) => {
      const nextQuantity = Math.max(0, (current[id] ?? 0) + direction);
      return { ...current, [id]: nextQuantity };
    });
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_470px]">
      <section className="space-y-5">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            New Receipt
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Create a new receipt for offerings.
          </p>
        </div>

        <section className="rounded-xl border border-zinc-800 bg-[#101010]/90 p-5">
          <div className="mb-5 flex items-center gap-2 text-[#f3c344]">
            <UserRound size={19} />
            <h2 className="text-base font-semibold">Customer Information</h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            <label>
              <span className="text-sm text-zinc-300">
                Name <span className="text-[#f3c344]">*</span>
              </span>
              <div className="mt-2 flex items-center gap-3 rounded-lg border border-zinc-800 bg-[#0b0b0b] px-3 py-3 text-zinc-400 focus-within:border-[#5a421e]">
                <UserRound size={17} />
                <input
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  className="w-full bg-transparent text-sm text-zinc-100 outline-none"
                  placeholder="Enter name"
                />
              </div>
            </label>

            <label>
              <span className="text-sm text-zinc-300">
                Nakshatra <span className="text-[#f3c344]">*</span>
              </span>
              <div className="mt-2 flex items-center gap-3 rounded-lg border border-zinc-800 bg-[#0b0b0b] px-3 py-3 text-zinc-400 focus-within:border-[#5a421e]">
                <Star size={17} className="text-[#f3c344]" />
                <select
                  value={nakshatra}
                  onChange={(event) => setNakshatra(event.target.value)}
                  className="w-full bg-transparent text-sm text-zinc-100 outline-none"
                >
                  {nakshatras.map((item) => (
                    <option key={item} value={item} className="bg-[#101010]">
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </label>

            <label>
              <span className="text-sm text-zinc-300">
                Phone Number <span className="text-zinc-500">(Optional)</span>
              </span>
              <div className="mt-2 flex items-center gap-3 rounded-lg border border-zinc-800 bg-[#0b0b0b] px-3 py-3 text-zinc-400 focus-within:border-[#5a421e]">
                <Phone size={17} />
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
                  placeholder="Enter phone number"
                />
              </div>
            </label>

            <label>
              <span className="text-sm text-zinc-300">
                Address <span className="text-zinc-500">(Optional)</span>
              </span>
              <div className="mt-2 flex items-center gap-3 rounded-lg border border-zinc-800 bg-[#0b0b0b] px-3 py-3 text-zinc-400 focus-within:border-[#5a421e]">
                <CalendarDays size={17} />
                <input
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className="w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
                  placeholder="Enter address"
                />
              </div>
            </label>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-xl border border-zinc-800 bg-[#101010]/90">
          <div className="flex items-center justify-between border-b border-zinc-800 p-5">
            <div className="flex items-center gap-2 text-[#f3c344]">
              <Gift size={19} />
              <h2 className="text-base font-semibold">Select Offerings</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden w-64 items-center gap-2 rounded-lg border border-zinc-800 bg-[#0b0b0b] px-3 py-2 text-zinc-500 2xl:flex">
                <Search size={16} />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
                  placeholder="Search offering"
                />
              </div>
              <span className="rounded-full border border-[#4b391d] bg-[#17130c] px-3 py-1 text-xs font-medium text-[#f3c344]">
                21 Offerings
              </span>
            </div>
          </div>

          <div className="grid gap-3 p-4 md:grid-cols-2 2xl:grid-cols-5">
            {filteredOfferings.map((offering) => {
              const quantity = quantities[offering.id] ?? 0;
              const price = getOfferingPrice(offering);

              return (
                <div
                  key={offering.id}
                  className="rounded-xl border border-zinc-800 bg-[#0b0b0b] p-4"
                >
                  <div className="mb-3 flex items-start gap-3">
                    <div className="min-w-7 text-sm text-zinc-300">
                      {offering.code}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-zinc-100">
                        {offering.name}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-sm text-zinc-300">
                        <BadgeIndianRupee size={15} className="text-[#f3c344]" />
                        {offering.price === null ? (
                          offering.note === "Nil" ? (
                            <span>Nil</span>
                          ) : (
                            <input
                              value={customPrices[offering.id] ?? ""}
                              onChange={(event) =>
                                setCustomPrices((current) => ({
                                  ...current,
                                  [offering.id]: event.target.value,
                                }))
                              }
                              className="h-7 w-24 rounded-md border border-zinc-800 bg-[#111] px-2 text-sm text-zinc-100 outline-none focus:border-[#5a421e]"
                              inputMode="numeric"
                              placeholder="Amount"
                            />
                          )
                        ) : (
                          <span>{formatAmount(price)}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`grid h-8 grid-cols-3 items-center rounded-full border text-sm ${
                      quantity > 0
                        ? "border-[#5a421e] bg-[#17130c] text-[#f3c344]"
                        : "border-zinc-800 bg-[#090909] text-zinc-300"
                    }`}
                  >
                    <button
                      onClick={() => updateQuantity(offering.id, -1)}
                      className="grid h-full place-items-center rounded-full transition hover:text-[#f3c344]"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(offering.id, 1)}
                      className="grid h-full place-items-center rounded-full transition hover:text-[#f3c344]"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="sticky bottom-0 mx-4 mb-3 rounded-xl border border-[#4b391d] bg-[#19140c]/95 p-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full border border-zinc-700">
                  <ReceiptText size={21} className="text-zinc-300" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Total Items</p>
                  <p className="text-2xl font-semibold text-[#f3c344]">
                    {totalItems}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-400">Total Amount</p>
                <p className="text-3xl font-semibold text-[#f3c344]">
                  {formatAmount(totalAmount)}
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>

      <aside className="rounded-xl border border-zinc-800 bg-[#101010]/90 p-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#f3c344]">
            Receipt Preview
          </h2>
          <button className="flex items-center gap-2 rounded-lg border border-zinc-800 px-3 py-2 text-sm font-medium text-zinc-200 transition hover:border-[#4b391d] hover:text-[#f3c344]">
            <Maximize2 size={15} />
            Preview Full
          </button>
        </div>

        <div className="rounded-xl border border-[#4b391d] bg-[#0b0b0b] p-5">
          <div className="border-b border-dashed border-zinc-700 pb-5 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-xl border border-[#4b391d] bg-[#17130c] overflow-hidden">
              <img
                src="/logo.jpg"
                alt="Sannidhi Temple Logo"
                className="h-full w-full object-cover"
                style={{ objectPosition: "center top" }}
              />
            </div>
            <h3 className="mt-3 text-xl font-bold tracking-wide text-[#f3c344]">
              SANNIDHI TEMPLE
            </h3>
            <p className="mt-2 text-sm text-zinc-300">Temple Road, Karnataka</p>
            <p className="mt-1 text-sm text-zinc-300">Ph: 080-12345678</p>
          </div>

          <div className="space-y-3 border-b border-dashed border-zinc-700 py-5 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-zinc-400">Receipt No.</span>
              <span className="text-zinc-100">R-2026-2343</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-zinc-400">Date</span>
              <span className="text-zinc-100">20 Jun 2026 | 10:30 AM</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-zinc-400">Name</span>
              <span className="text-zinc-100">{customerName || "-"}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-zinc-400">Nakshatra</span>
              <span className="text-zinc-100">{nakshatra || "-"}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-zinc-400">Phone</span>
              <span className="text-zinc-100">{phone || "-"}</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-zinc-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#111] text-zinc-100">
                <tr>
                  <th className="px-4 py-3 font-semibold">Offering</th>
                  <th className="px-4 py-3 text-center font-semibold">Qty</th>
                  <th className="px-4 py-3 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {selectedOfferings.length === 0 ? (
                  <tr>
                    <td className="px-4 py-4 text-zinc-500" colSpan={3}>
                      No offerings selected
                    </td>
                  </tr>
                ) : (
                  selectedOfferings.map((offering) => (
                    <tr key={offering.id}>
                      <td className="px-4 py-3 text-zinc-100">{offering.name}</td>
                      <td className="px-4 py-3 text-center text-zinc-100">
                        {quantities[offering.id]}
                      </td>
                      <td className="px-4 py-3 text-right text-zinc-100">
                        {formatAmount(
                          getOfferingPrice(offering) *
                            (quantities[offering.id] ?? 0),
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="space-y-4 border-b border-dashed border-zinc-700 py-5">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Total Items</span>
              <span className="text-zinc-100">{totalItems}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-zinc-100">Total Amount</span>
              <span className="text-xl font-semibold text-[#f3c344]">
                {formatAmount(totalAmount)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Payment Mode</span>
              <span className="font-medium text-[#f3c344]">Cash</span>
            </div>
          </div>

          <div className="py-5 text-center text-sm leading-6 text-zinc-400">
            <p>Thank you for your contribution.</p>
            <p>May God Bless You!</p>
          </div>

          <div className="space-y-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#f3c344] px-4 py-3 font-bold text-black transition hover:bg-[#ffd65a]">
              <Printer size={18} />
              Print Receipt
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 px-4 py-3 font-semibold text-zinc-100 transition hover:border-[#4b391d] hover:text-[#f3c344]">
              <Save size={18} />
              Save & Print Later
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
