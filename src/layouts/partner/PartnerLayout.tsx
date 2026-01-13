import { Outlet } from "react-router-dom";
import PartnerHeader from "./PartnerHeader";
import PartnerFooter from "./PartnerFooter";

const PartnerLayout = () => {

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      {/* HEADER */}
      <PartnerHeader />

      {/* PAGE CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <PartnerFooter />
    </div>
  );
};

export default PartnerLayout;
