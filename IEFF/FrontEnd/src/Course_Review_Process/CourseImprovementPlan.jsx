import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate ,Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavBarTopProcess } from '../NavBarTopProcess.jsx';
import { Row, Col, Table } from 'react-bootstrap';
import './CourseImprovementPlan.css';

export const CourseImprovementPlan = () => {
  const navigate = useNavigate();



  const [improvementPlanData, setImprovementPlanData] = useState([
    { id: 1, issue: 'Issue 1', improvementPlan: '', successIndicators: '', actualOutcome: '', endOfSemesterOutcomes: '', furtherAction: '', feedback: '' },
    { id: 2, issue: 'Issue 2', improvementPlan: '', successIndicators: '', actualOutcome: '', endOfSemesterOutcomes: '', furtherAction: '', feedback: '' },
    { id: 3, issue: 'Issue 3', improvementPlan: '', successIndicators: '', actualOutcome: '', endOfSemesterOutcomes: '', furtherAction: '', feedback: '' }
  ]);







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
    console.log(improvementPlanData);
    navigate("/ChallengesConcerns");
    try {
      const response = await fetch('http://your-django-server-url/api/improvement-plans/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(improvementPlanData),
      });

      if (response.ok) {
        console.log('Data sent to the server successfully!');
        
        // Reset the form or perform any additional actions
      } else {
        console.log('Failed to send data to the server.');
      }
    } catch (error) {
      console.error('An error occurred while sending data to the server:', error);
    }
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
                    <td><b>{item.issue}</b></td>
                    <td><input value={item.improvementPlan} onChange={e => handleInputChange(item.id, 'improvementPlan', e.target.value)} /></td>
                    <td><input value={item.successIndicators} onChange={e => handleInputChange(item.id, 'successIndicators', e.target.value)} /></td>
                    <td><input value={item.actualOutcome} onChange={e => handleInputChange(item.id, 'actualOutcome', e.target.value)} /></td>
                    <td><input value={item.endOfSemesterOutcomes} onChange={e => handleInputChange(item.id, 'endOfSemesterOutcomes', e.target.value)} /></td>
                    <td><input value={item.furtherAction} onChange={e => handleInputChange(item.id, 'furtherAction', e.target.value)} /></td>
                    <td><input value={item.feedback} onChange={e => handleInputChange(item.id, 'feedback', e.target.value)} /></td>
                  </tr>
                ))}
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
