import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavBarTopProcess } from '../NavBarTopProcess.jsx';
import { Row, Col, Table } from 'react-bootstrap';
import gradeDist from '../gradeDist.png';
import Alert from 'react-bootstrap/Alert';
import '../style.css';
import arrow from '../arrow.svg';
import { Select, MenuItem, InputLabel } from '@mui/material';

export const CourseKeyIndicaters = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const [courses, setCourses] = useState([]);





  const getCoursesAndData = (academicYear) => {
    const url = `http://127.0.0.1:8000/getRoleAndData/?academicYear=${academicYear}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setCourses(data.courses);
      })
      .catch(error => console.error(error));
  };



  const handleCourseChange = event => {
    setSelectedCourse(event.target.value);
  };





  const handleAcademicYearChange = event => {
    const selectedYear = event.target.value;
    setSelectedAcademicYear(selectedYear);
    getCoursesAndData(selectedYear);
  };




  useEffect(() => {
    console.log(courses);
  }, [courses]);





  const academicYears = [
    { value: '2021-2022', label: '2021-2022' },
    { value: '2022-2023', label: '2022-2023' },
    { value: '2023-2024', label: '2023-2024' },
    { value: '2024-2025', label: '2024-2025' },
    { value: '2025-2026', label: '2025-2026' },
    { value: '2026-2027', label: '2026-2027' },
    { value: '2027-2028', label: '2027-2028' },
    { value: '2028-2029', label: '2028-2029' },
    { value: '2029-2030', label: '2029-2030' }
  ];






  return (
    <div>
      <Box sx={{ height: '100vh' }}>
        <NavBarTopProcess />
        <Container fixed>
          <Row className="fs-4 fw-bold d-flex justify-content-center">
            Course Key Indicators
          </Row>

          <Row>
            <Col>
              <Alert style={{ background: 'rgba(255,255,255,0.67)' }} variant="dark">
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
                    {courses.map(course => (
                      <MenuItem key={course.pk} value={course.pk}>
                        {course.fields.courseCode}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <p className="oneandhalf oneandhalfmargin">Course Title here</p>
                <p className="oneandhalf oneandhalfmargin">Professor name here</p>
                <p className="oneandhalf oneandhalfmargin">
                  <InputLabel id="academic-year-select-label">Academic Year</InputLabel>
                  <Select
                    labelId="academic-year-select-label"
                    id="academic-year-select"
                    value={selectedAcademicYear}
                    onChange={handleAcademicYearChange}
                    autoWidth
                    variant="filled"
                    size="small"
                    style={{ minWidth: '100px', maxWidth: '300px' }}
                  >
                    {academicYears.map(year => (
                      <MenuItem key={year.value} value={year.value}>
                        {year.label}
                      </MenuItem>
                    ))}
                  </Select>
                </p>
              </Alert>
            </Col>
            <Col></Col>
          </Row>

          <Row>
            <Col>
              <Table style={{ background: 'rgba(255,255,255,0.67)' }} bordered>
                <thead>
                  <tr>
                    <td colSpan={4}>
                      <b>Course Key Indicators From Previous Academic Year</b>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <b>Semester</b>
                    </td>
                    <td>Spring {selectedAcademicYear}</td>
                    <td>Fall {selectedAcademicYear}</td>
                    <td>Spring {selectedAcademicYear}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Number of students</b>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <b>Fail rate</b>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <b>Drop/withdraw</b>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <b>Student satisfaction score</b>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <b>Teaching quality score</b>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col>
              <img src={gradeDist} height="200px" alt="img" style={{ marginTop: '35px' }} />
            </Col>
          </Row>

          <Row>
            <Col>
              <Button style={{ background: '#253B63' }} component={Link} to="/Instructions" variant="contained">
                Previous
              </Button>
            </Col>
            <Col>
              <Button
                style={{ background: '#253B63', float: 'right' }}
                component={Link}
                to="/CourseKeyIndicatersSecond"
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
