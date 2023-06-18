import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavBarTopProcess } from '../NavBarTopProcess.jsx';
import { Row, Col, Table } from 'react-bootstrap';
import './ChallengesConcerns.css';

export const ChallengesConcerns = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [selectedCourseID, setSelectedCourseID] = useState('');



  useEffect(() => {
    const checkRole = () => {
      const url = 'http://127.0.0.1:8000/getRoleAndData/';
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setRole(data.role);
        })
        .catch(error => console.error(error));
    };

    checkRole();
  }, []);



  // To get the Course ID selected in the first page
  useEffect(() => {
    fetch('http://127.0.0.1:8000/get_selected_course_id/')
      .then(response => response.json())
      .then(data => {
        setSelectedCourseID(data.selected_course_id);
      })
      .catch(error => {
        console.error('Error fetching selected course ID:', error);
      });
  }, []);













  const initialConcernsData = [
    { id: 1, challengerConcern: '' },
    { id: 2, challengerConcern: '' },
    { id: 3, challengerConcern: '' }
  ];
  const [concernsData, setConcernsData] = useState(initialConcernsData);




  const handleInputChange = (id, column, value) => {
    setConcernsData(prevData =>
      prevData.map(item => {
        if (item.id === id) {
          return { ...item, [column]: value };
        }
        return item;
      })
    );
  };



  const saveData = () => {
    const jsonData = JSON.stringify(concernsData);
    // console.log(jsonData);

    fetch(`/ChallengesAndConcerns/?Cid=${selectedCourseID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData
    })
      .then(response => response.json())
      .then(data => {
        alert(data.success);
      })
      .catch(error => {
        console.error('Error saving data:', error);
      });

    navigate("/ReviewersFeedback");
  };










  const resetForm = () => {
    setConcernsData(initialConcernsData);
  };





  return (
    <div>
      <Box sx={{ height: '100vh' }}>
        <NavBarTopProcess />
        <Container fixed>
          <Row className="fs-4 fw-bold d-flex justify-content-center">Challenges & Concerns</Row>
          <Row>
            <b className="oneandhalf oneandhalfmargin">
              Please share any challenges or concerns you had during the semester related to students' background and attitude, facilities, or other relevant services and provide preferred solutions.
            </b>
          </Row>
          <Row>
            <Table className="challenges-table" bordered>
              <thead>
                <tr>
                  <td></td>
                  <td className="header-cell" colSpan={1}>
                    <b className="table-header">Challenges and concerns to be discussed<br /><br />with the Course Team, Chairs, and the VPAA</b>
                  </td>
                </tr>
                <tr>
                  <td className="number-cell"><b>#</b></td>
                  <td className="concerns-cell"><b>Challenges & Concerns</b></td>
                </tr>
              </thead>
              <tbody>
                {concernsData.map(item => (
                  <tr key={item.id}>
                    <td className="number-cell"><b>{item.id}</b></td>
                    <td className="concerns-cell">
                      <textarea
                        value={item.challengerConcern}
                        onChange={e => handleInputChange(item.id, 'challengerConcern', e.target.value)}
                        className="textarea-field"
                        disabled={role === 'Reviewer'}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
          <Row>
            <Col>
              <Button style={{ background: '#253B63' }} component={Link} to="/CourseImprovementPlan" variant="contained">
                Previous
              </Button>
            </Col>
            <Col>
              <Button
                style={{ background: '#253B63', float: 'right' }}
                onClick={saveData}
                variant="contained"
              >
                Save and Next
              </Button>
              <Button
                style={{ background: '#253B63', float: 'right', marginRight: '10px' }}
                onClick={resetForm}
                variant="contained"
                disabled={role === 'Reviewer'}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </Container>
      </Box>
    </div>
  );
};
