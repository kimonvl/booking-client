import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PartnerRoutes from "./PartnerRoutes";
import AppBootstrapGate from "@/AppBootstrapGate";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { selectCountryDictionary, selectRoleDictionary } from "@/store/dictionaries/dictionary.selector";
import { getCountryDictionaryStart, getRoleDictionaryStart } from "@/store/dictionaries/dictionarySlice";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

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

          <Route path="/*" element={
            <Elements stripe={stripePromise}>
              <PublicRoutes />
            </Elements>
          } />

          <Route path="/partner/*" element={<PartnerRoutes />} />
          <Route path="/guest/*" element={<div>Guest routes</div>} />
        </Routes>
      </AppBootstrapGate>
    </BrowserRouter>
  );
}
