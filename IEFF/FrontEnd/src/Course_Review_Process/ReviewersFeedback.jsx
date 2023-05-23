import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavBarTopProcess } from '../NavBarTopProcess.jsx';
import { Row, Col, Alert } from 'react-bootstrap';
import '../style.css';
import './ReviewersFeedback.css';
import TextField from '@mui/material/TextField';




export const ReviewersFeedback = () => {
  const [criteria, setCriteria] = useState('');
  const [rationale, setRationale] = useState('');
  const [otherComments, setOtherComments] = useState('');
  const [role, setRole] = useState('');





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





  const handleCriteriaChange = (event) => {
    setCriteria(event.target.value);
  };





  const handleRationaleChange = (event) => {
    setRationale(event.target.value);
  };









  const handleOtherCommentsChange = (event) => {
    setOtherComments(event.target.value);
  };








  const handleSubmit = () => {
    const feedbackData = {
      criteria: criteria,
      rationale: rationale,
      otherComments: otherComments,
    };

    console.log(feedbackData); // Print feedback data in the console (for testing purposes)

    // TODO: Send the feedback data to the Django server to be saved in the database

    // Additional logic for saving data to the server can be added here
  };









  return (
    <div>
      <Box sx={{ height: '100vh' }}>
        <NavBarTopProcess />
        <Container fixed>
          <Row className="fs-4 fw-bold d-flex justify-content-center">Reviewers Feedback</Row>
          <Row>
            <Alert style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '16px' }} className="fw-bold" variant="dark">
              <p className="oneandhalf">Instructions:
                1) In addition to this form, reviewers examine course materials, student work, syllabi, course curriculum, course reflections. The course assessment review criteria to Assess/Review each course’s activities are:
                <br />- Activities are tied to the curriculum and mission of the program
                <br />- Activities are effective (students are able to demonstrate progress towards Student Learning Outcomes)
                <br />- Activities have rubrics (as needed)
              </p>
              <p className="oneandhalf">
                2) Please add comments to the Course Reflection Form.
              </p>
              <p className="oneandhalf oneandhalfmargin">
                3) Complete the box below using the Course Assessment Review Criteria:
              </p>
              <p className="oneandhalf">
                Course appears to:
              </p>
              <form className="oneandhalf oneandhalfmargin">
                <label>
                  <input
                    type="radio"
                    value="meet"
                    checked={criteria === 'meet'}
                    onChange={handleCriteriaChange}
                    disabled={role === 'Professor'}
                  />
                  Meet the criteria
                </label><br />
                <label>
                  <input
                    type="radio"
                    value="pMeet"
                    checked={criteria === 'pMeet'}
                    onChange={handleCriteriaChange}
                    disabled={role === 'Professor'}
                  />
                  Partially meet the criteria
                </label><br />
                <label>
                  <input
                    type="radio"
                    value="notMeet"
                    checked={criteria === 'notMeet'}
                    onChange={handleCriteriaChange}
                    disabled={role === 'Professor'}
                  />
                  Not meet the criteria
                </label>
              </form>
            </Alert>
          </Row>
          <Row>
            <b className="oneandhalf">Rationale:</b>
          </Row>
          <Row>
            <TextField
              hiddenLabel
              fullWidth
              id="filled-hidden-label-small"
              placeholder="Enter here..."
              variant="outlined"
              multiline
              rows={3}
              value={rationale}
              onChange={handleRationaleChange}
              style={{ background: 'rgba(255,255,255,0.2)', marginBottom: '5px' }}
              disabled={role === 'Professor'}
            />
          </Row>
          <Row>
            <b className="oneandhalf">Other Comments:</b>
          </Row>
          <Row>
            <TextField
              hiddenLabel
              fullWidth
              id="filled-hidden-label-small"
              placeholder="Enter here..."
              variant="outlined"
              multiline
              rows={3}
              value={otherComments}
              onChange={handleOtherCommentsChange}
              style={{ background: 'rgba(255,255,255,0.2)', marginBottom: '5px' }}
              disabled={role === 'Professor'}
            />
          </Row>
          <Row>
            <Col>
              <Button style={{ background: '#253B63' }} component={Link} to="/ChallengesConcerns" variant="contained">
                Previous
              </Button>
            </Col>
            <Col>
              <Button
                style={{ background: '#253B63', float: 'right' }}
                onClick={handleSubmit}
                variant="contained"
                
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Container>
      </Box>
    </div>
  );
};
