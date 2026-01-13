import ListingPropertyLayout from '@/layouts/listing-property/ListingPropertyLayout'
import PartnerLayout from '@/layouts/partner/PartnerLayout'
import PartnerDashboardPage from '@/pages/partner/group-home-page/PartnerGroupHomePage'
import AddApartmentLoaderPage from '@/pages/partner/listing-property-page/add-apartment/AddApartmentLoaderPage'
import AddAppartmentPage from '@/pages/partner/listing-property-page/add-apartment/AddAppartmentPage'
import SelectPropertyTypePage from '@/pages/partner/listing-property-page/SelectPropertyTypePage'
import { Route, Routes } from 'react-router-dom'
import RequireAuth from './guards/RequireAuth'
import RequireRole from './guards/RequireRole'

export default function PartnerRoutes() {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route element={<RequireRole role='PARTNER' />}>
          <Route element={<PartnerLayout />} >
            <Route index element={<PartnerDashboardPage />} />
          </Route>
          <Route element={<ListingPropertyLayout />} >
            <Route path="select-property-type" element={<SelectPropertyTypePage />} />
            <Route path="add-property/apartment" element={<AddAppartmentPage />} />
          </Route>
          <Route path='add-apartment-loader' element={<AddApartmentLoaderPage />} />
        </Route>
      </Route>

    </Routes>
  )
}
