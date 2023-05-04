import React from 'react'
import Button from '@mui/material/Button';
import {
  Link
} from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavBarTopProcess } from '../NavBarTopProcess.jsx'
import { Row, Col,Table} from 'react-bootstrap';
import  './CourseImprovementPlan.css'

export const CourseImprovementPlan = () => {
  return (
    <div>
      <Box sx={{  height: '100vh' }}>
      <NavBarTopProcess/>
      <Container fixed>
        <Row className="fs-4 fw-bold d-flex justify-content-center">Course Improvement Plan (CIP)</Row>
        <Row>
            <b class="oneandhalf oneandhalfmargin">
            Please list all issues related to the course that might affect student learning such as issues related to the CLOs, the alignment between class activities and CLOs,
            pedagogical approach, teaching methods, variety of assessment, etc. ) 
            </b>
        </Row>
        <Row>
        <Table style={{background: 'rgba(255,255,255,0.67)'}} bordered>
              <thead>
                <tr style={{background: '#BDD7EE'}}>
                  <td className="py-3" style={{maxWidth:'120px'}}><b>Possible Issue (barriers to student success)</b></td>
                  <td className="py-3"><b>Improvment Plan</b></td>
                  <td className="py-3"><b>Success indicators</b></td>
                  <td className="py-3"><b>Tha actual outcome of the action</b></td>
                  <td className="py-3"><b>End of semester outcomes</b></td>
                  <td className="py-3"><b>What further action is needed</b></td>
                  <td className="py-3"><b>Reviewer's feedback</b></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Issue 1</b></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td><b>Issue 2</b></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td><b>Issue 3</b></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
        </Row>
        <Row>
          <Col>
            <Button style={{background: '#253B63'}} component={Link} to="/CourseReflectionForm" variant="contained"> Previous </Button>
          </Col>
          <Col>
            <Button style={{background: '#253B63', float: 'right'}} component={Link} to="/ChallengesConcerns" variant="contained"> Next </Button>
          </Col>
        </Row>
      </Container> 
      </Box>
    </div>
  )
}
