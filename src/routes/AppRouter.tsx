import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PartnerRoutes from "./PartnerRoutes";
import AppBootstrapGate from "@/AppBootstrapGate";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { selectCountryDictionary, selectRoleDictionary } from "@/store/dictionaries/dictionary.selector";
import { getCountryDictionaryStart, getRoleDictionaryStart } from "@/store/dictionaries/dictionarySlice";

export default function AppRouter() {
  const dispatch = useDispatch();
  const countryDictionary = useAppSelector(selectCountryDictionary);
  const roleDictionary = useAppSelector(selectRoleDictionary);

  useEffect(() => {
    if (!countryDictionary || countryDictionary.length == 0)
      dispatch(getCountryDictionaryStart());
  }, [dispatch]);

  useEffect(() => {
    if (!roleDictionary || roleDictionary.length == 0)
      dispatch(getRoleDictionaryStart());
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
