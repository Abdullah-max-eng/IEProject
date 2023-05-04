import React from 'react'
import Button from '@mui/material/Button';
import {
  Link
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavBarTopProcess } from '../NavBarTopProcess.jsx'
import { Row, Col, Table} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import  './CourseReflectionForm.css'
export const CourseReflectionForm = () => {
  return (
    <div>
      <Box sx={{  height: '100vh' }}>
      <NavBarTopProcess/>
      <Container fixed>
        <Row className="fs-4 fw-bold d-flex justify-content-center">Course Reflection Form</Row>
        <Row>
            <b class="oneandhalf oneandhalfmargin">
              Please refer to your course syllabus to fill the Student Learning Outcomes (SLOs) and Course Learning Outcomes (CLOs)  in this table:  
            </b>
        </Row>
        <Row>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" style={{background: '#ffffff',color:'#000000'}}>
            Assessment 1
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Assessment 1</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Assessment 2</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Assessment 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </Row>
        <Row>
        <Table style={{background: 'rgba(255,255,255,0.67)'}} bordered>
              <thead>
                <tr>
                  <td><b>Student & Course Learning Outcome</b></td>
                  <td><b>Achievment status</b></td>
                  <td><b>Assessment</b></td>
                  <td><b>Fanculaty Comments</b></td>
                  <td><b>Reviewer comment</b></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Program related learing outcome (SLOs)</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td><b>(Enter each SLO below)</b></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                  <form class="oneandhalf">
                      <input type="radio" id="MeetTheCriteria" name="criteria" value="meet"/>
                      <label for="html">Achieved</label>
                      <input type="radio" id="partialMeetTheCriteria" name="criteria" value="pMeet"/>
                      <label for="css">partially Achieved</label>
                      <input type="radio" id="notMeetTheCriteria" name="criteria" value="notMeet"/>
                      <label for="javascript">not Achieved</label>
                    </form>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <form class="oneandhalf">
                      <input type="radio" id="MeetTheCriteria" name="criteria" value="meet"/>
                      <label for="html">Achieved</label>
                      <input type="radio" id="partialMeetTheCriteria" name="criteria" value="pMeet"/>
                      <label for="css">partially Achieved</label>
                      <input type="radio" id="notMeetTheCriteria" name="criteria" value="notMeet"/>
                      <label for="javascript">not Achieved</label>
                    </form>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                  <form class="oneandhalf">
                      <input type="radio" id="MeetTheCriteria" name="criteria" value="meet"/>
                      <label for="html">Achieved</label>
                      <input type="radio" id="partialMeetTheCriteria" name="criteria" value="pMeet"/>
                      <label for="css">partially Achieved</label>
                      <input type="radio" id="notMeetTheCriteria" name="criteria" value="notMeet"/>
                      <label for="javascript">not Achieved</label>
                    </form>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                  <form class="oneandhalf">
                      <input type="radio" id="MeetTheCriteria" name="criteria" value="meet"/>
                      <label for="html">Achieved</label>
                      <input type="radio" id="partialMeetTheCriteria" name="criteria" value="pMeet"/>
                      <label for="css">partially Achieved</label>
                      <input type="radio" id="notMeetTheCriteria" name="criteria" value="notMeet"/>
                      <label for="javascript">not Achieved</label>
                    </form>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td><b>(Enter each CLO below)</b></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                  <form class="oneandhalf">
                      <input type="radio" id="MeetTheCriteria" name="criteria" value="meet"/>
                      <label for="html">Achieved</label>
                      <input type="radio" id="partialMeetTheCriteria" name="criteria" value="pMeet"/>
                      <label for="css">partially Achieved</label>
                      <input type="radio" id="notMeetTheCriteria" name="criteria" value="notMeet"/>
                      <label for="javascript">not Achieved</label>
                    </form>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                  <form class="oneandhalf">
                      <input type="radio" id="MeetTheCriteria" name="criteria" value="meet"/>
                      <label for="html">Achieved</label>
                      <input type="radio" id="partialMeetTheCriteria" name="criteria" value="pMeet"/>
                      <label for="css">partially Achieved</label>
                      <input type="radio" id="notMeetTheCriteria" name="criteria" value="notMeet"/>
                      <label for="javascript">not Achieved</label>
                    </form>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                  <form class="oneandhalf">
                      <input type="radio" id="MeetTheCriteria" name="criteria" value="meet"/>
                      <label for="html">Achieved</label>
                      <input type="radio" id="partialMeetTheCriteria" name="criteria" value="pMeet"/>
                      <label for="css">partially Achieved</label>
                      <input type="radio" id="notMeetTheCriteria" name="criteria" value="notMeet"/>
                      <label for="javascript">not Achieved</label>
                    </form>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                  <form class="oneandhalf">
                      <input type="radio" id="MeetTheCriteria" name="criteria" value="meet"/>
                      <label for="html">Achieved</label>
                      <input type="radio" id="partialMeetTheCriteria" name="criteria" value="pMeet"/>
                      <label for="css">partially Achieved</label>
                      <input type="radio" id="notMeetTheCriteria" name="criteria" value="notMeet"/>
                      <label for="javascript">not Achieved</label>
                    </form>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
        </Row>
        <Row>
          <Col>
            <Button style={{background: '#253B63'}} component={Link} to="/Weektoweekactivity" variant="contained"> Previous </Button>
          </Col>
          <Col>
            <Button style={{background: '#253B63', float: 'right'}} component={Link} to="/CourseImprovementPlan" variant="contained"> Next </Button>
          </Col>
        </Row>
        
      </Container>
      </Box>
    </div>
  )
}
