import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NewAppointment from '../pages/appointments/newAppointment';
import UpcomingAppointments from '../pages/appointments/upcomingAppointments';
import AppointmentHistory from '../pages/appointments/appointmentHistory';

const AppointmentsLayout = () => {
  return (
    <Routes>
      <Route path="new" element={<NewAppointment />} />
      <Route path="upcoming" element={<UpcomingAppointments />} />
      <Route path="history" element={<AppointmentHistory />} />
    </Routes>
  );
};

export default AppointmentsLayout;