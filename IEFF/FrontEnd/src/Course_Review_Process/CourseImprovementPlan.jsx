import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavBarTopProcess } from '../NavBarTopProcess.jsx';
import { Row, Col, Table } from 'react-bootstrap';
import './CourseImprovementPlan.css';

export const CourseImprovementPlan = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [selectedCourseID, setSelectedCourseID] = useState('');
  const [improvementPlanData, setImprovementPlanData] = useState([
    {
      id: 1,
      issue: '',
      improvementPlan: '',
      successIndicators: '',
      actualOutcome: '',
      endOfSemesterOutcomes: '',
      furtherAction: '',
      feedback: ''
    }
  ]);

  // Get the current data
  useEffect(() => {
    if (selectedCourseID !== '') {
      fetch(`/saveimprovementplan/?selectedCourseID=${selectedCourseID}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            setImprovementPlanData(data);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [selectedCourseID]);

  useEffect(() => {
    fetch('/get_selected_course_id/')
      .then(response => response.json())
      .then(data => {
        setSelectedCourseID(data.selected_course_id);
      })
      .catch(error => {
        console.error('Error fetching selected course ID:', error);
      });
  }, []);

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

  const handleInputChange = (id, column, value) => {
    setImprovementPlanData(prevData =>
      prevData.map(item => {
        if (item.id === id) {
          return { ...item, [column]: value };
        }
        return item;
      })
    );
  };

  const sendDataToServer = async () => {
    // console.log("Selected Course ID===========", selectedCourseID)
    // console.log(improvementPlanData);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ improvementPlanData, selectedCourseID })
    };

    // console.log("Send data from Front end-------", requestOptions)

    fetch('/saveimprovementplan/', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('Data received:', data);
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });

    navigate("/ChallengesConcerns");
  };

  return (
    <div>
      <Box sx={{ height: '100vh' }}>
        <NavBarTopProcess />
        <Container fixed>
          <Row className="fs-4 fw-bold d-flex justify-content-center">Course Improvement Plan (CIP)</Row>
          <Row>
            <b className="oneandhalf oneandhalfmargin">
              Please list all issues related to the course that might affect student learning such as issues related to the CLOs, the alignment between class activities and CLOs,
              pedagogical approach, teaching methods, variety of assessment, etc.
            </b>
          </Row>
          <Row>
            <Table style={{ background: 'rgba(255,255,255,0.67)' }} bordered>
              <thead>
                <tr style={{ background: '#BDD7EE' }}>
                  <td className="py-3" style={{ maxWidth: '120px' }}><b>Possible Issue (barriers to student success)</b></td>
                  <td className="py-3"><b>Improvement Plan</b></td>
                  <td className="py-3"><b>Success Indicators</b></td>
                  <td className="py-3"><b>The Actual Outcome of the Action</b></td>
                  <td className="py-3"><b>End of Semester Outcomes</b></td>
                  <td className="py-3"><b>What Further Action is Needed</b></td>
                  <td className="py-3"><b>Reviewer's Feedback</b></td>
                </tr>
              </thead>
              <tbody>
                {improvementPlanData.map(item => (
                  <tr key={item.id}>
                    <td><input
                      value={item.issue}
                      onChange={e => handleInputChange(item.id, 'issue', e.target.value)}
                      disabled={role === 'Reviewer'}
                    /></td>
                    <td><input
                      value={item.improvementPlan}
                      onChange={e => handleInputChange(item.id, 'improvementPlan', e.target.value)}
                      disabled={role === 'Reviewer'}
                    /></td>
                    <td><input
                      value={item.successIndicators}
                      onChange={e => handleInputChange(item.id, 'successIndicators', e.target.value)}
                      disabled={role === 'Reviewer'}
                    /></td>
                    <td><input
                      value={item.actualOutcome}
                      onChange={e => handleInputChange(item.id, 'actualOutcome', e.target.value)}
                      disabled={role === 'Reviewer'}
                    /></td>
                    <td><input
                      value={item.endOfSemesterOutcomes}
                      onChange={e => handleInputChange(item.id, 'endOfSemesterOutcomes', e.target.value)}
                      disabled={role === 'Reviewer'}
                    /></td>
                    <td><input
                      value={item.furtherAction}
                      onChange={e => handleInputChange(item.id, 'furtherAction', e.target.value)}
                      disabled={role === 'Reviewer'}
                    /></td>
                    <td><input
                      value={item.feedback}
                      onChange={e => handleInputChange(item.id, 'feedback', e.target.value)}
                      disabled={role === 'Professor'}
                    /></td>
                  </tr>
                ))}
                {improvementPlanData.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center' }}>
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Row>
          <Row>
            <Col>
              <Button style={{ background: '#253B63' }} component={Link} to="/CourseReflectionForm" variant="contained">
                Previous
              </Button>
            </Col>
            <Col>
              <Button
                style={{ background: '#253B63', float: 'right' }}
                onClick={sendDataToServer}
                variant="contained"
              >
                Next
              </Button>
            </Col>
          </Row>
        </Container>
      </Box>
    </div>
  );
};
