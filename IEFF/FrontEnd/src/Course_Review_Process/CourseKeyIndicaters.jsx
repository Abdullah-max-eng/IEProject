import React, { useState, useEffect, useRef } from 'react';
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
import Chart from 'chart.js/auto';


export const CourseKeyIndicaters = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const [Allcourses, setAllCourses] = useState([]);
  const [selectetTerm, setselectetTerm] = useState('');
  const [selectedCourseBasedOnTerm, setSelectedCourseBasedOnTerm] = useState({});
  const [GradeRates, setGradeRates] = useState({});


  const getAllCourses = (academicYear) => {
    const url = `${process.env.REACT_APP_SERVER_IP}/getRoleAndData/?academicYear=${academicYear}`;
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




  const getSelectedCourseBasedOnTerm = (selectedCourseID) => {
    const url = `${process.env.REACT_APP_SERVER_IP}/get_SelectedCourseBasedOnTerm/?courseID=${selectedCourseID}&academicYear=${selectedAcademicYear}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSelectedCourseBasedOnTerm(data.coursesBasedOnTerm_data);
      })
      .catch((error) => console.error(error));
  };



  const handleCourseChange = (event) => {
    const selectedCourseID = event.target.value;
    setSelectedCourse(selectedCourseID);
    getSelectedCourseBasedOnTerm(selectedCourseID);
    getGradesRate(selectedCourseID)
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






  const getGradesRate = (courseID) => {
    const url = `${process.env.REACT_APP_SERVER_IP}/grade_rates?courseID=${courseID}&academicYear=${selectedAcademicYear}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setGradeRates(data);
        console.log(data); // Log the updated data
      })
      .catch((error) => console.error(error));
  }





  const GradeRateGraph = ({ gradeRates }) => {
    const chartRef = useRef(null);

    useEffect(() => {
      const grades = Object.keys(gradeRates.Spring || gradeRates.Fall || {});

      const fallRates = Object.values(gradeRates.Fall || {}).map(rate => rate || 0);
      const springRates = Object.values(gradeRates.Spring || {}).map(rate => rate || 0);

      const ctx = chartRef.current.getContext('2d');



      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: grades,
          datasets: [
            {
              label: 'Fall',
              data: fallRates,
              backgroundColor: '#FF5733',
              borderColor: '#FF5733',
              borderWidth: 2, // Increase the bar border width
              barPercentage: 0.6, // Increase the bar width
              borderRadius: 6, // Add border radius to the bars
            },
            {
              label: 'Spring',
              data: springRates,
              backgroundColor: '#3369FF',
              borderColor: '#3369FF',
              borderWidth: 2, // Increase the bar border width
              barPercentage: 0.6, // Increase the bar width
              borderRadius: 6, // Add border radius to the bars
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: 'Percentage',
                font: {
                  size: 14,
                  weight: 'bold',
                },
              },
              grid: {
                color: '#DDDDDD', // Customize the grid line color
              },
            },
            x: {
              title: {
                display: true,
                text: 'Grades',
                font: {
                  size: 14,
                  weight: 'bold',
                },
              },
              grid: {
                display: false, // Hide the vertical grid lines
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                boxWidth: 12, // Adjust the width of the legend color box
                font: {
                  size: 14,
                },
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const dataset = context.dataset.label;
                  const value = context.parsed.y;
                  return `${dataset}: ${value}%`;
                },
              },
              backgroundColor: '#333333', // Customize the tooltip background color
              titleAlign: 'center',
              bodyAlign: 'center',
              titleFont: {
                size: 14,
                weight: 'bold',
              },
              bodyFont: {
                size: 14,
              },
            },
          },
        },
      });
    }, [gradeRates]);



    return (
      <div style={{ margin: '20px', padding: '20px', border: '1px solid #DDDDDD', borderRadius: '8px' }}>
        <canvas ref={chartRef} height="250px" style={{ background: '#f2f2f2' }} />
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
          {gradeRates.Fall && (
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
              <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: '#FF5733', marginRight: '6px' }}></span>
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Fall</span>
            </div>
          )}
          {gradeRates.Spring && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: '#3369FF', marginRight: '6px' }}></span>
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Spring</span>
            </div>
          )}
        </div>
      </div>
    );
  };









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



                      {/* <p style={{ marginBottom: '15px', marginTop: '15px' }}>
                        <label style={{ fontWeight: 'bold' }}>Course Title:&nbsp;&nbsp;&nbsp;</label>
                        {selectedCourseBasedOnTerm.courseTitle ? selectedCourseBasedOnTerm.courseTitle : 'N/A'}
                      </p>
                      <p style={{ marginBottom: '15px' }}>
                        <label style={{ fontWeight: 'bold' }}>Instructor Name:&nbsp;&nbsp;&nbsp;</label>
                        {selectedCourseBasedOnTerm.professorName ? selectedCourseBasedOnTerm.professorName : 'N/A'}
                      </p> */}


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




              {/* Graph Here */}
              <Col>
                {/* <img src={gradeDist} height="200px" alt="img" style={{ marginTop: '35px' }} /> */}
                <GradeRateGraph gradeRates={GradeRates} />
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
