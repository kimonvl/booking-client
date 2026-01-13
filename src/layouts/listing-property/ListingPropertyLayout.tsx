import { Outlet } from "react-router-dom";
import ListingPropertyHeader from "./ListingPropertyHeader";

export default function ListingPropertyLayout() {

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <ListingPropertyHeader />

      {/* PAGE CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

    </div>
  );
};

