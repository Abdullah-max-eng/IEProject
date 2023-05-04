import React from 'react'
import Button from '@mui/material/Button';
import {
  Link
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavBarTopProcess } from '../NavBarTopProcess.jsx'
import { Row, Col, Table } from 'react-bootstrap';
import CLOs from '../CLOs.png'
import  './CourseKeyIndicatersSecondStyle.css'
export const CourseKeyIndicatersSecond = () => {
  return (
    <div>
      <Box sx={{  height: '100vh' }}>
      <NavBarTopProcess/>
    <Container fixed>
        <Row className="fs-4 fw-bold d-flex justify-content-center">Course Key Indicators</Row>
        <Row>
          <Col md={6}>
            <Table style={{background: 'rgba(255,255,255,1)'}} bordered>
              <thead>
                <tr>
                  <th>enter course learning outcome (CLOs) here</th>
                  <th>enter all assessment component per CLO here</th>
                  <th>enter the average mark for each CLO here</th>
                  <th>enter  the weight mark for each CLO here</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>course learning outcome(s)</b></td>
                  <td><b>assessment component</b></td>
                  <td><b>marks</b></td>
                  <td><b>weight</b></td>
                </tr>
                <tr>
                  <td><input class="inputLarge inputNoBorder" placeholder="CLO 1" /></td>
                  <td><input class="inputLarge inputNoBorder" placeholder="text" /></td>
                  <td><input class="inputSmall inputNoBorder" placeholder="%" /></td>
                  <td><input class="inputSmall inputNoBorder" placeholder="%" /></td>
                </tr>
                <tr>
                  <td>CLO 2</td>
                  <td>20%</td>
                  <td>26%</td>
                  <td>30%</td>
                </tr>
                <tr>
                  <td>CLO 3</td>
                  <td>10%</td>
                  <td>16%</td>
                  <td>20%</td>
                </tr>
                <tr>
                  <td>CLO 4</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>CLO 5</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>CLO 6</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>CLO 7</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>CLO 8</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>CLO 9</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>CLO 10</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>total</td>
                  <td></td>
                  <td>100%</td>
                  <td>100%</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col>
          <img
            src={CLOs}
            height="250px"
            alt="img"
            style={{marginTop:'35px'}}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button style={{background: '#253B63'}} component={Link} to="/CourseKeyIndicaters" variant="contained"> Previous </Button>
          </Col>
          <Col>
            <Button style={{background: '#253B63', float: 'right'}} component={Link} to="/Weektoweekactivity" variant="contained"> Next </Button>
          </Col>
        </Row>
      
    </Container>
    </Box>
  </div>
  )
}
