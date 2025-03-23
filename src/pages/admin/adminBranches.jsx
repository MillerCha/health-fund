import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form, Button, Container, Row, Col } from "react-bootstrap";

const AdminBranches = () => {
  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filter, setFilter] = useState({ name: "", city: "", phone: "" });
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const VITE_API_BASE_URL = 'https://hook.eu2.make.com/94piqbb3uags8yiqwttrvp8gunmcdbza';
        const response = await axios.get(`${VITE_API_BASE_URL}?q=branches`);
        setBranches(response.data);
        setFilteredBranches(response.data);

        // יצירת רשימת ערים ייחודיות
        const uniqueCities = [...new Set(response.data.map(b => b.city))];
        setCities(uniqueCities);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBranches();
  }, []);

  // עדכון נתון בשדה
  const handleInputChange = (id, field, value) => {
    setBranches(prev =>
      prev.map(branch => (branch.id === id ? { ...branch, [field]: value } : branch))
    );
  };

  // עדכון הפילטרים
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  // סינון הרשימה
  useEffect(() => {
    setFilteredBranches(
      branches.filter(branch =>
        branch.name.toLowerCase().includes(filter.name.toLowerCase()) &&
        branch.phone.includes(filter.phone) &&
        (filter.city === "" || branch.city === filter.city)
      )
    );
  }, [filter, branches]);

  // מיון הרשימה
  const handleSort = (field,type) => {
    const order = sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(field);
    setSortOrder(order);

    setFilteredBranches(prev =>
      [...prev].sort((a, b) => {

        let aValue = a[field];
        let bValue = b[field];

        
        switch(type){
          case "number":
            return order === "asc" ? aValue - bValue : bValue - aValue;
          case "date":
            return order === "asc"
            ? new Date(aValue).getTime() - new Date(bValue).getTime()
            : new Date(bValue).getTime() - new Date(aValue).getTime();
          default:
            return order === "asc" ? aValue.toString().localeCompare(bValue.toString())
        : bValue.toString().localeCompare(aValue.toString());
        }
      })
    );
  };

  // שמירת השינויים לשרת
  const saveChanges = async () => {
    try {
      const VITE_API_BASE_URL = 'https://hook.eu2.make.com/94piqbb3uags8yiqwttrvp8gunmcdbza';
      await axios.put(`${VITE_API_BASE_URL}/branches`, branches);
      alert("השינויים נשמרו בהצלחה!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("אירעה שגיאה בשמירת הנתונים");
    }
  };

  return (
    <Container>
      <h2 className="my-3">ניהול סניפים</h2>

      {/* שורת חיפוש */}
      <Row className="mb-3">
        <Col>
          <Form.Control
            type="text"
            placeholder="חפש לפי שם"
            name="name"
            value={filter.name}
            onChange={handleFilterChange}
          />
        </Col>
        <Col>
          <Form.Control
            type="text"
            placeholder="חפש לפי טלפון"
            name="phone"
            value={filter.phone}
            onChange={handleFilterChange}
          />
        </Col>
        <Col>
          <Form.Select name="city" value={filter.city} onChange={handleFilterChange}>
            <option value="">כל הערים</option>
            {cities.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* טבלת סניפים */}
      <Table striped bordered hover responsive="xl">
        <thead>
          <tr>
            <th onClick={() => handleSort("id", "number")}>מספר סניף</th>
            <th onClick={() => handleSort("name", "text")}>שם סניף</th>
            <th onClick={() => handleSort("address", "text")}>כתובת</th>
            <th onClick={() => handleSort("city", "text")}>
              עיר
            </th>
            <th onClick={() => handleSort("phone")}>טלפון</th>
          </tr>
        </thead>
        <tbody>
          {filteredBranches.map(branch => (
            <tr key={branch.id}>
              <td>
                <Form.Control
                  type="text"
                  value={branch.id}
                  onChange={(e) => handleInputChange(branch.id, "id", e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={branch.name}
                  onChange={(e) => handleInputChange(branch.id, "name", e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={branch.address}
                  onChange={(e) => handleInputChange(branch.id, "address", e.target.value)}
                />
              </td>
              <td>
                <Form.Select
                  value={branch.city}
                  onChange={(e) => handleInputChange(branch.id, "city", e.target.value)}
                >
                  {cities.map(city => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </Form.Select>
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={branch.phone}
                  onChange={(e) => handleInputChange(branch.id, "phone", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* כפתור שמירת שינויים */}
      <Button variant="primary" onClick={saveChanges}>שמור שינויים</Button>
    </Container>
  );
};

export default AdminBranches;