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
import gradeDist from '../gradeDist.png'
import Alert from 'react-bootstrap/Alert';
import '../style.css';
import arrow from '../arrow.svg';
import TextField from '@mui/material/TextField';
export const CourseKeyIndicaters = () => {
  return (
    <div>
      <Box sx={{  height: '100vh' }}>
      <NavBarTopProcess/>
      <Container fixed>
        <Row className="fs-4 fw-bold d-flex justify-content-center">Course Key Indicators</Row>
        <Row>
          <Col>
          <Alert style={{background: 'rgba(255,255,255,0.67)'}}  variant="dark">
              <p  style={{lineHeight:'35px'}} class="oneandhalf oneandhalfmargin">
              Enter Course Code here:  <img
                    src={arrow}
                    height="16px"
                    alt="logo"
                    />
                    <TextField
                      hiddenLabel
                      id="filled-hidden-label-small"
                      placeholder='course'
                      variant="filled"
                      size="small"
                      style={{minWidth:'100px',maxWidth:'100px'}}
                    />
              </p>
              <p class="oneandhalf oneandhalfmargin">
              Course Title:  Concurrent and Parallel Programming
              </p>
              <p class="oneandhalf oneandhalfmargin">
              Professor name: Yad Tahir  
              </p>
              <p class="oneandhalf oneandhalfmargin">
              Academic year: 2022/2023
              </p>
          </Alert>
          </Col>
          <Col>
          
          </Col>
        </Row>
        <Row>
          <Col>
            <Table style={{background: 'rgba(255,255,255,0.67)'}} bordered>
              <thead>
                <tr>
                  <td colSpan={4}><b>Course Key Indicators From Previous Academic Year</b></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Semester</b></td>
                  <td>Fall 2021</td>
                  <td>Spring 2021</td>
                  <td>Fall 2022</td>
                </tr>
                <tr>
                  <td><b>Number of students</b></td>
                  <td>12</td>
                  <td>16</td>
                  <td>19</td>
                </tr>
                <tr>
                  <td><b>Fail rate</b></td>
                  <td>20%</td>
                  <td>26%</td>
                  <td>30%</td>
                </tr>
                <tr>
                  <td><b>Drop/withdrow</b></td>
                  <td>10%</td>
                  <td>16%</td>
                  <td>20%</td>
                </tr>
                <tr>
                  <td><b>Student satisfaction score</b></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td><b>Teaching quality score</b></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col>
          <img
            src={gradeDist}
            height="200px"
            alt="img"
            style={{marginTop:'35px'}}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button style={{background: '#253B63'}} component={Link} to="/Instructions" variant="contained"> Previous </Button>
          </Col>
          <Col>
            <Button style={{background: '#253B63', float: 'right'}} component={Link} to="/CourseKeyIndicatersSecond" variant="contained"> Next </Button>
          </Col>
        </Row>
      </Container> 
      </Box>
    </div>
  )
}
