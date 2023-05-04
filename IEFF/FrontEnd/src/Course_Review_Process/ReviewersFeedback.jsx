import React from 'react'
import Button from '@mui/material/Button';
import {
  Link
} from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavBarTopProcess } from '../NavBarTopProcess.jsx'
import { Row, Col, Alert} from 'react-bootstrap';
import '../style.css';
import './ReviewersFeedback.css';
import TextField from '@mui/material/TextField';
export const ReviewersFeedback = () => {
  return (
    <div>
      <Box sx={{  height: '100vh' }}>
      <NavBarTopProcess/>
      <Container fixed>
        <Row className="fs-4 fw-bold d-flex justify-content-center">Reviewers Feedback</Row>
        <Row>
            <Alert style={{background: 'rgba(255,255,255,0.2)', borderRadius: '16px' }} className="fw-bold" variant="dark">
                <p class="oneandhalf">Instructions:
                1) In addition to this form, reviewers to examine course materials, student work, syllabi, course curriculum, course reflections.
                The course assessment review criteria to Assess/Review each course’s activities are:
                <br/>- Activities are tied to the curriculum and mission of the program
                <br/>- Activities are effective  (students are able to demonstrate progress towards Student Learning Outcomes) 
                <br/>- Activities have rubrics (as needed)
                </p>
                <p class="oneandhalf">
                  2) Please add comments to the Course Reflection Form.
                </p>
                <p class="oneandhalf oneandhalfmargin">
                  3) Complete box below using the Course Assessemnt Review Criteria:
                </p>
                <p class="oneandhalf">
                  Course appears to: 
                </p> 
                <form class="oneandhalf oneandhalfmargin">
                  <input type="radio" id="MeetTheCriteria" name="criteria" value="meet"/>
                  <label for="html">Meet the criteria</label><br/>
                  <input type="radio" id="partialMeetTheCriteria" name="criteria" value="pMeet"/>
                  <label for="css">partial meet the criteria</label><br/>
                  <input type="radio" id="notMeetTheCriteria" name="criteria" value="notMeet"/>
                  <label for="javascript">not meet the criteria</label>
                </form>
            </Alert>
        </Row>
        <Row><b class="oneandhalf">Rationale:</b></Row>
        <Row >
            <TextField
                hiddenLabel
                fullWidth
                id="filled-hidden-label-small"
                placeholder='enter here...'
                variant="outlined"
                multiline
                rows={3}
                style={{background: 'rgba(255,255,255,0.2)', marginBottom:'5px'}}
              />
        </Row>
        <Row><b class="oneandhalf">Other Comments:</b></Row>
        <Row>
            <TextField
                hiddenLabel
                fullWidth
                id="filled-hidden-label-small"
                placeholder='enter here...'
                variant="outlined"
                multiline
                rows={3}
                style={{background: 'rgba(255,255,255,0.2)', marginBottom:'5px'}}
              />
        </Row>
        <Row>
          <Col>
            <Button style={{background: '#253B63'}} component={Link} to="/ChallengesConcerns" variant="contained"> Previous </Button>
          </Col>
          <Col>
            <Button style={{background: '#253B63', float: 'right'}} component={Link} to="/Dashboard" variant="contained"> Submit </Button>
          </Col>
        </Row>
      </Container>
    </Box>
  </div>
  )
}
