import React from 'react'
import Button from '@mui/material/Button';
import {
  Link
} from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavBarTopProcess } from '../NavBarTopProcess.jsx'
import { Row, Col,Table} from 'react-bootstrap';
import  './ChallengesConcerns.css'
export const ChallengesConcerns = () => {
  return (
    <div>
      <Box sx={{  height: '100vh' }}>
      <NavBarTopProcess/>
      <Container fixed>
        <Row className="fs-4 fw-bold d-flex justify-content-center">Challengers & Concerns</Row>
        <Row>
            <b class="oneandhalf oneandhalfmargin">
            Please share any challenges or concerns you had during the semester related to students background and attitude, facilities, or other relevant services and
            provide preferred solutions
            </b>
        </Row>
        <Row>
        <Table style={{background: 'rgba(255,255,255,0.67)'}} bordered>
              <thead>
                <tr>
                  <td></td>
                  <td style={{background: '#002060', color: '#FFFFFF'}}  colSpan={4}>
                    <b className="fs-4 d-flex justify-content-center py-2">Challenges and concerns to be discussed <br/><br/>with the Course Team, Chairs and the VPAA</b>
                  </td>
                </tr>
                <tr>
                  <td style={{lineHeight: '50px'}}><b>#</b></td>
                  <td style={{background: '#BDD7EE', lineHeight: '50px'}}><b className="d-flex justify-content-center">Challengers & Concerns</b></td>
                  <td style={{background: '#BDD7EE', lineHeight: '50px'}}><b className="d-flex justify-content-center">Spring 2021</b></td>
                  <td style={{background: '#BDD7EE', lineHeight: '50px'}}><b className="d-flex justify-content-center">Fall 2022</b></td>
                  <td style={{background: '#BDD7EE', lineHeight: '50px'}}><b className="d-flex justify-content-center">Fall 2022</b></td>
                </tr>
              </thead>
              <tbody>
                
                <tr>
                  <td><b>1</b></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td><b>2</b></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td><b>3</b></td>
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
            <Button style={{background: '#253B63'}} component={Link} to="/CourseImprovementPlan" variant="contained"> Previous </Button>
          </Col>
          <Col>
            <Button style={{background: '#253B63', float: 'right'}} component={Link} to="/ReviewersFeedback" variant="contained"> Next </Button>
          </Col>
        </Row>
      </Container>
      </Box>
    </div>
  )
}
