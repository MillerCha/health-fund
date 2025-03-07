import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react'
import './index.css'
import NavBar from './component/navBar';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import FamilySelection from './pages/familySelection';
import Commitments from './pages/commitments';
import Branches from './pages/branches';
import AppointmentsLayout from './layouts/appointmentsLayout';
import MedicalLayout from './layouts/medicalLayout';
import AdminLayout from './layouts/adminLayout';
import NewRequest from './pages/newRequest';
import { ThemeProvider } from './context/ThemeContext';
import { Container } from 'react-bootstrap';
import {MemberProvider} from './context/MemberContext';


function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <ThemeProvider>
        <MemberProvider>
          <BrowserRouter>
            <NavBar></NavBar>
            <Container className="mt-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/family-selection" element={<FamilySelection />} />
                <Route path="/appointments/*" element={<AppointmentsLayout />} />
                <Route path="/new-request" element={<NewRequest />} />
                <Route path="/medical/*" element={<MedicalLayout />} />
                <Route path="/admin/*" element={<AdminLayout />} />
                <Route path="/commitments" element={<Commitments />} />
                <Route path="/branches" element={<Branches />} />
              </Routes>
            </Container>
          </BrowserRouter>
        </MemberProvider>
      </ThemeProvider>
    </>
  )
}

export default App
