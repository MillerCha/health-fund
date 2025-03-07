import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Prescriptions from '../pages/medical/prescriptions';
import Approvals from '../pages/medical/approvals';
import TestResults from '../pages/medical/testResults';

const MedicalLayout = () => {
  return (
    <Routes>
      <Route path="prescriptions" element={<Prescriptions />} />
      <Route path="approvals" element={<Approvals />} />
      <Route path="test-results" element={<TestResults />} />
    </Routes>
  );
};

export default MedicalLayout;