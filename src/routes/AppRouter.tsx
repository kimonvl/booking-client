import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PartnerRoutes from "./PartnerRoutes";
import AppBootstrapGate from "@/AppBootstrapGate";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AppBootstrapGate>
        <Routes>
          <Route path="/*" element={<PublicRoutes />} />
          <Route path="/partner/*" element={<PartnerRoutes />} />
          <Route path="/guest/*" element={<div>Guest routes</div>} />
        </Routes>
      </AppBootstrapGate>
    </BrowserRouter>
  );
}
