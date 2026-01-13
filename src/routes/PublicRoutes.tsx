import PublicLayout from '@/layouts/public/PublicLayout'
import AuthPage from '@/pages/public/AuthPage'
import FlightsPage from '@/pages/public/FlightsPage'
import SearchPage from '@/pages/public/SearchPage'
import StaysPage from '@/pages/public/StaysPage'
import { Route, Routes } from 'react-router-dom'

export default function PublicRoutes() {
  return (
    <Routes>
        <Route element={<PublicLayout />} >
            <Route index element={<StaysPage />} />
            <Route path="flights" element={<FlightsPage />} />
            <Route path="search" element={<SearchPage />} />
        </Route>
        <Route path="auth/:role/:mode" element={<AuthPage />} />
    </Routes>
  )
}
