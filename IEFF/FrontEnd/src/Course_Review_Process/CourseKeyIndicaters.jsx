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
  const [Allcourses, setAllCourses] = useState([]);
  const [selectetTerm, setselectetTerm] = useState('');
  const [selectedCourseBasedOnTerm, setSelectedCourseBasedOnTerm] = useState({});

  const getAllCourses = (academicYear) => {
    const url = `http://127.0.0.1:8000/getRoleAndData/?academicYear=${academicYear}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAllCourses(data.courses);
      })
      .catch((error) => console.error(error));
  };



  const handleAcademicYearChange = (event) => {
    const selectedYear = event.target.value;
    setSelectedAcademicYear(selectedYear);
    getAllCourses(selectedYear);
  };

  const getSelectedCourseBasedOnTerm = (selectedCourse) => {
    const url = `http://127.0.0.1:8000/get_SelectedCourseBasedOnTerm/?courseID=${selectedCourse}&academicYear=${selectedAcademicYear}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSelectedCourseBasedOnTerm(data.coursesBasedOnTerm_data);
      })
      .catch((error) => console.error(error));
  };

  const handleCourseChange = (event) => {
    const selectedCourse = event.target.value;
    setSelectedCourse(selectedCourse);
    getSelectedCourseBasedOnTerm(selectedCourse);
  };

  // useEffect(() => {
  //   console.log(selectedCourseBasedOnTerm);
  // }, [selectedCourse]);

  const academicYears = [
    { value: '2021-2022', label: '2021-2022' },
    { value: '2022-2023', label: '2022-2023' },
    { value: '2023-2024', label: '2023-2024' },
    { value: '2024-2025', label: '2024-2025' },
    { value: '2025-2026', label: '2025-2026' },
    { value: '2026-2027', label: '2026-2027' },
    { value: '2027-2028', label: '2027-2028' },
    { value: '2028-2029', label: '2028-2029' },
    { value: '2029-2030', label: '2029-2030' },
  ];

  return (
    <div>
      <Box sx={{ height: '100vh' }}>
        <NavBarTopProcess />
        <Container fixed>
          <Row className="fs-4 fw-bold d-flex justify-content-center" style={{ marginTop: '20px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Select an Academic Year:</div>
            <Select
              labelId="academic-year-select-label"
              id="academic-year-select"
              value={selectedAcademicYear}
              onChange={handleAcademicYearChange}
              autoWidth
              variant="outlined"
              size="large"
              style={{ minWidth: '150px', marginBottom: '20px' }}
            >
              {academicYears.map((year) => (
                <MenuItem key={year.value} value={year.value}>
                  {year.label}
                </MenuItem>
              ))}
            </Select>
          </Row>

          {selectedAcademicYear && (
            <Row>
              <Col>
                <Alert style={{ background: 'rgba(255,255,255,0.67)' }} variant="dark">
                  <div style={{ display: 'flex', alignItems: 'center', lineHeight: '35px' }}>
                    <span>Enter Course Code here:</span>
                    <img src={arrow} height="13px" alt="logo" style={{ marginLeft: '5px', marginRight: '5px' }} />
                    <InputLabel id="course-select-label" style={{ fontSize: '18px' }}>
                      Course
                    </InputLabel>
                    <Select
                      labelId="course-select-label"
                      id="course-select"
                      value={selectedCourse}
                      onChange={handleCourseChange}
                      autoWidth
                      variant="outlined"
                      size="large"
                      style={{ minWidth: '100px', maxWidth: '300px' }}
                    >
                      {Allcourses.map((course) => (
                        <MenuItem key={course.pk} value={course.pk}>
                          {course.fields.courseCode} {course.fields.term}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>





                  <div style={{ backgroundColor: '#f2f2f2', padding: '20px', borderRadius: '4px' }}>
                    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                      <p style={{ marginBottom: '15px', marginTop: '15px' }}>
                        <label style={{ fontWeight: 'bold' }}>Course Title:&nbsp;&nbsp;&nbsp;</label>
                        {selectedCourseBasedOnTerm.courseTitle}
                      </p>
                      <p style={{ marginBottom: '15px' }}>
                        <label style={{ fontWeight: 'bold' }}>Instructor Name:&nbsp;&nbsp;&nbsp;</label>
                        {selectedCourseBasedOnTerm.professorName}
                      </p>
                    </div>
                  </div>


                </Alert>
              </Col>
              <Col></Col>
            </Row>
          )}

          {selectedCourse && (
            <Row>
              <Col>
                <Table style={{ background: 'rgba(255,255,255,0.67)', marginTop: '20px' }} bordered>
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
                      <td>Fall {parseInt(selectedAcademicYear.split('-')[0]) - 1}-{parseInt(selectedAcademicYear.split('-')[1]) - 1}</td>
                      <td>Spring {selectedAcademicYear}</td>
                      <td>Fall {selectedAcademicYear}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Number of students</b>
                      </td>
                      <td>{selectedCourseBasedOnTerm.students_fall_prev_year}</td>
                      <td>{selectedCourseBasedOnTerm.students_spring_selected_year}</td>
                      <td>{selectedCourseBasedOnTerm.students_fall_selected_year}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Fail rate</b>
                      </td>
                      <td>{selectedCourseBasedOnTerm.fail_rate_fall_prev_year}</td>
                      <td>{selectedCourseBasedOnTerm.fail_rate_spring_selected_year}</td>
                      <td>{selectedCourseBasedOnTerm.fail_rate_fall_selected_year}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Drop/withdraw</b>
                      </td>
                      <td>{selectedCourseBasedOnTerm.drop_withdraw_fall_prev_year}</td>
                      <td>{selectedCourseBasedOnTerm.drop_withdraw_spring_selected_year}</td>
                      <td>{selectedCourseBasedOnTerm.drop_withdraw_fall_selected_year}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Student satisfaction score</b>
                      </td>
                      <td>{selectedCourseBasedOnTerm.satisfaction_score_fall_prev_year}</td>
                      <td>{selectedCourseBasedOnTerm.satisfaction_score_spring_selected_year}</td>
                      <td>{selectedCourseBasedOnTerm.satisfaction_score_fall_selected_year}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Teaching quality score</b>
                      </td>
                      <td>{selectedCourseBasedOnTerm.teaching_quality_fall_prev_year}</td>
                      <td>{selectedCourseBasedOnTerm.teaching_quality_spring_selected_year}</td>
                      <td>{selectedCourseBasedOnTerm.teaching_quality_fall_selected_year}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col>
                <img src={gradeDist} height="200px" alt="img" style={{ marginTop: '35px' }} />
              </Col>
            </Row>
          )}

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
                to="/CourseFolder"
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
