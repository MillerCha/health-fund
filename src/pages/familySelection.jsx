

import React, { useState, useEffect, lazy, useContext } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { MemberContext } from '../context/MemberContext';


async function runDynamic(id) {
  try {
    const module = await import(`../lazyScript/LazyScript${id}.js`); 
    if (typeof module.runDynamic === 'function') {
      module.runDynamic();
    } else {
      console.error(`פונקציה runDynamic לא נמצאה ב LazyScript${id}.js`);
    }
  } catch (error) {
    console.error(`שגיאה בטעינת LazyScript${id}.js:`, error);
  }
}


function FamilySelection() {
  const [members, setMembers] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const {updateMember} = useContext(MemberContext);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('https://hook.eu2.make.com/94piqbb3uags8yiqwttrvp8gunmcdbza?q=members');
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMembers();
  }, []);

  const handleMemberClick = (MemberId) => {
    setSelectedMemberId(selectedMemberId === MemberId ? null : MemberId);
    runDynamic(MemberId)
  };

  const handleSelectMemberClick = (member) => {
    updateMember(member);

  }

  return (<>


    
      <h2>בחירת בן משפחה</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {members.map((member) => (
          <Col key={member.id}>
            <Card className="floating">
              <Card.Body>
                <Card.Title>{`${member.firstName} ${member.lastName}`}</Card.Title>
                <Card.Text>
                  ת.ז.: {member.id}
                  <br />
                  תאריך לידה: {member.birthDate}
                </Card.Text>
                <Button variant="primary" onClick={() => handleMemberClick(member.id)}>
                  {selectedMemberId === member.id ? 'הסתר פרטים' : 'הצג  פרטים'}
                </Button>
                <Button variant="primary" onClick={() => handleSelectMemberClick(member)}>
                  'בחר'                
                </Button>
                {selectedMemberId === member.id && (
                  <Card className="mt-3">
                    Hello {`${member.firstName} ${member.lastName}`}
                  </Card>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
  </>
  );
}

export default FamilySelection;