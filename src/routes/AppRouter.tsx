import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import PartnerRoutes from './PartnerRoutes';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { bootstrapStart } from '@/store/auth/authSlice';

export default function AppRouter() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(bootstrapStart());
  }, [dispatch])

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/*" element={<PublicRoutes />} /> 
            <Route path="/partner/*" element={<PartnerRoutes />} /> 
            <Route path="/guest/*" element={<div>Guest routes</div>} />
        </Routes>
    </BrowserRouter>
  )
}

