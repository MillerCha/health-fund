import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

function Branches() {
  const [branches, setBranches] = useState([]);
  const [selectedBranchHours, setSelectedBranchHours] = useState(null);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get('https://hook.eu2.make.com/94piqbb3uags8yiqwttrvp8gunmcdbza?q=branches');
        setBranches(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBranches();
  }, []);

  const handleBranchClick = (branchHours) => {
    setSelectedBranchHours(selectedBranchHours === branchHours ? null : branchHours);
  };

  return (<>
    <h2>רשימת סניפים</h2>
    <Accordion defaultActiveKey="0">
      {branches.map((branch) => {
        return (
          <Accordion.Item eventKey={branch.id} key={branch.id} >
            <Accordion.Header >
            <div className="d-flex justify-content-between w-100"> 
              <p className="floating mb-0"> 
                <strong className="m-2 text-primary">{`${branch.name}`}</strong>
                {`${branch.address}, ${branch.city}, טלפון: ${branch.phone}`}
              </p>
            </div>
          </Accordion.Header>
            <Accordion.Body>
              {branch.hours.map((dayHours) => (
                <ListGroup.Item key={dayHours.day}>
                  <strong>{dayHours.day}:</strong>
                  {dayHours.open.map((time, index) => (
                    <div key={index}>
                      {time.start} - {time.end}
                    </div>
                  ))}
                </ListGroup.Item>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        )
      })
      }
    </Accordion>
  </>
  );
}

export default Branches;