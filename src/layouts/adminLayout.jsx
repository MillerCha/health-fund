import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UpdateDetails from '../pages/admin/updateDetails';
import Refunds from '../pages/admin/refunds';
import MonthlyAccount from '../pages/admin/monthlyAccount';

const AdminLayout = () => {
  return (
    <Routes>
      <Route path="update-details" element={<UpdateDetails />} />
      <Route path="refunds" element={<Refunds />} />
      <Route path="monthly-account" element={<MonthlyAccount />} />
    </Routes>
  );
};

export default AdminLayout;