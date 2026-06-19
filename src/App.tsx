import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import Receipts from "./pages/Receipts";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/receipts" element={<Receipts />} />
          <Route path="/receipt-history" element={<Receipts />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
