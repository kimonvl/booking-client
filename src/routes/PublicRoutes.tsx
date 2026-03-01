import PublicLayout from '@/layouts/public/PublicLayout'
import AuthPage from '@/pages/public/AuthPage'
import FlightsPage from '@/pages/public/FlightsPage'
import GuestCheckoutDetailsPage from '@/pages/public/guest-checkout-details/GuestCheckoutDetailsPage'
import GuestCheckoutConfirmPage from '@/pages/public/guest-checkout-payment/GuestCheckoutConfirmPage'
import GuestCheckoutPaymentPage from '@/pages/public/guest-checkout-payment/GuestCheckoutPaymentPage'
import PropertyDetailsPage from '@/pages/public/property-details/PropertyDetailsPage'
import SearchPage from '@/pages/public/SearchPage'
import StaysPage from '@/pages/public/StaysPage'
import { Route, Routes } from 'react-router-dom'
import GuestCheckoutSuccessPage from '@/pages/public/guest-checkout-success/GuestCheckoutSuccessPage'


export default function PublicRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />} >
        <Route index element={<StaysPage />} />
        <Route path="flights" element={<FlightsPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="property-details/:propertyId" element={<PropertyDetailsPage />} />
        <Route path="checkout/details" element={<GuestCheckoutDetailsPage />} />
        <Route path="checkout/payment" element={<GuestCheckoutPaymentPage />} />
        <Route path="checkout/confirm" element={<GuestCheckoutConfirmPage />} />
        <Route path="checkout/success" element={<GuestCheckoutSuccessPage />} />

      </Route>
      <Route path="auth/:role/:mode" element={<AuthPage />} />
    </Routes>
  )
}
