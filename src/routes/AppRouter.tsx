import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PartnerRoutes from "./PartnerRoutes";
import AppBootstrapGate from "@/AppBootstrapGate";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { selectCountryDictionary } from "@/store/dictionaries/dictionary.selector";
import { getCountryDictionaryStart } from "@/store/dictionaries/dictionarySlice";

export default function AppRouter() {
  const dispatch = useDispatch();
  const countryDictionary = useAppSelector(selectCountryDictionary);

  useEffect(() => {
    if (!countryDictionary || countryDictionary.length == 0)
      dispatch(getCountryDictionaryStart());
  }, [dispatch])

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
