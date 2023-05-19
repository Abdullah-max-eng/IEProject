import {React, useState} from 'react'
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
import { Select, MenuItem, InputLabel } from '@mui/material';




export const CourseKeyIndicaters = () => {
  const [selectedCourse, setSelectedCourse] = useState('');


  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };


  return (
    <div>
      <Box sx={{  height: '100vh' }}>
      <NavBarTopProcess/>
      <Container fixed>
        <Row className="fs-4 fw-bold d-flex justify-content-center">Course Key Indicators</Row>
        
        

        
        <Row>
          <Col>
          <Alert style={{background: 'rgba(255,255,255,0.67)'}}  variant="dark">
          <div style={{ display: 'flex', alignItems: 'center', lineHeight: '35px' }}>
            <span>Enter Course Code here:</span>
            <img src={arrow} height="13px" alt="logo" style={{ marginLeft: '5px', marginRight: '5px' }} />
            <InputLabel id="course-select-label">Course</InputLabel>
            <Select
              labelId="course-select-label"
              id="course-select"
              value={selectedCourse}
              onChange={handleCourseChange}
              autoWidth
              variant="filled"
              size="small"
              style={{ minWidth: '100px', maxWidth: '300px' }}
            >
              <MenuItem value="course1">Course 1</MenuItem>
              <MenuItem value="course2">Course 2</MenuItem>
              <MenuItem value="course3">Course 3</MenuItem>
              {/* Add more MenuItem components for additional courses */}
            </Select>
          </div>



              <p class="oneandhalf oneandhalfmargin">
              Course Title here 
              </p>
              <p class="oneandhalf oneandhalfmargin">
              Professor name here 
              </p>
              <p class="oneandhalf oneandhalfmargin">
              Academic year here 
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
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td><b>Fail rate</b></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td><b>Drop/withdrow</b></td>
                  <td></td>
                  <td></td>
                  <td></td>
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
