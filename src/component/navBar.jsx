import React, { useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Sun, Moon, User, Calendar, FileText, Building2, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { MemberContext } from '../context/MemberContext';

const AppNavbar = () => {
  const { theme, toggleTheme } = useTheme();

  const {member} = useContext(MemberContext);

  return (
    <Navbar expand="lg" className={`bg-${theme === 'light' ? 'light' : 'dark'} navbar-${theme}`}>
        <Navbar.Brand as={Link} to="/">קופת חולים</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="text-end align-items-center">
            <Nav.Link as={Link} to="/family-selection" className="d-flex align-items-center">
              <User className="ms-1" size={18} />
              <span>בחירת בן משפחה</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/branches" className="d-flex align-items-center">
              <User className="ms-1" size={18} />
              <span>סניפים</span>
            </Nav.Link>
            <NavDropdown 
              title={
                <div className="d-inline-flex align-items-center">
                  <Calendar className="ms-1" size={18} />
                  <span>תורים</span>
                </div>
              } 
              id="appointments-dropdown"
            >
              <NavDropdown.Item as={Link} to="/appointments/new">קביעת תור</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/appointments/upcoming">תורים קרובים</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/appointments/history">היסטורית ביקורים</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/new-request" className="d-flex align-items-center">
              <span>פניה חדשה</span>
            </Nav.Link>

            <NavDropdown 
              title={
                <div className="d-inline-flex align-items-center">
                  <FileText className="ms-1" size={18} />
                  <span>תיק רפואי</span>
                </div>
              } 
              id="medical-file-dropdown"
            >
              <NavDropdown.Item as={Link} to="/medical/prescriptions">מרשמים</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/medical/approvals">אישורים</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/medical/test-results">תוצאות בדיקות</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown 
              title={
                <div className="d-inline-flex align-items-center">
                  <Building2 className="ms-1" size={18} />
                  <span>מנהלה</span>
                </div>
              } 
              id="admin-dropdown"
            >
              <NavDropdown.Item as={Link} to="/admin/update-details">עידכון פרטים</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/refunds">החזרים כספיים</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/monthly-account">החשבון החודשי</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/commitments" className="d-flex align-items-center">
              <ClipboardList className="ms-1" size={18} />
              <span>התחייבויות</span>
            </Nav.Link>

            <Nav.Link onClick={toggleTheme} className="d-flex align-items-center">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </Nav.Link>
            <Nav.Link>{member? `שלום ${member?.firstName}` : ''}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;