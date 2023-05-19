import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavBarTopProcess } from '../NavBarTopProcess.jsx';
import { Row, Col, Table } from 'react-bootstrap';
import CLOs from '../CLOs.png';
import Select from 'react-select';

export const CourseKeyIndicatersSecond = () => {
  const assessmentComponentOptions = [
    { value: 'Assignment', label: 'Assignment' },
    { value: 'Quiz', label: 'Quiz' },
    { value: 'Presentation', label: 'Presentation' },
    { value: 'Midterm Exam', label: 'Midterm Exam' },
    { value: 'Final Exam', label: 'Final Exam' },
    { value: 'Project', label: 'Project' },
    { value: 'Lab Report', label: 'Lab Report' },
    { value: 'Essay', label: 'Essay' },
    { value: 'Group Work', label: 'Group Work' },
    { value: 'Research Paper', label: 'Research Paper' },
    { value: 'Online Discussion', label: 'Online Discussion' },
    { value: 'Peer Review', label: 'Peer Review' },
    { value: 'Portfolio', label: 'Portfolio' },
    { value: 'Case Study', label: 'Case Study' },
    { value: 'Oral Examination', label: 'Oral Examination' },
    { value: 'Practical Exam', label: 'Practical Exam' },
    { value: 'Simulation', label: 'Simulation' },
    { value: 'Field Work', label: 'Field Work' },
    { value: 'Attendance', label: 'Attendance' },
    { value: 'Participation', label: 'Participation' },
  ];

  const [selectedComponents, setSelectedComponents] = useState({});

  const handleComponentsChange = (cloIndex, selectedOptions) => {
    setSelectedComponents((prevState) => ({
      ...prevState,
      [cloIndex]: selectedOptions,
    }));
  };

  const renderCLORows = () => {
    const rows = [];
    for (let i = 1; i <= 10; i++) {
      rows.push(
        <tr key={`clo-${i}`}>
          <td>CLO {i}</td>
          <td className="select-cell">
            <Select
              className="select-input"
              options={assessmentComponentOptions}
              isMulti
              onChange={(selectedOptions) => handleComponentsChange(i, selectedOptions)}
              value={selectedComponents[i] || []}
              placeholder="Select components"
              menuPlacement="auto"
              closeMenuOnSelect={false}
            />
          </td>
          <td>
               <input style={{ width: '100%' }} className="inputSmall inputNoBorder" placeholder="Marks" />
          </td>
          <td>
               <input style={{ width: '100%' }} className="inputSmall inputNoBorder" placeholder="Weight" />
          </td>
        </tr>
      );
    }
    return rows;
  };

  return (
    <div>
      <Box sx={{ height: '100vh' }}>
        <NavBarTopProcess />
        <Container fixed>
          <Row className="fs-4 fw-bold d-flex justify-content-center">Course Key Indicators</Row>
          <Row>
            <Col md={6}>
              <Table style={{ backgroundColor: '#f2f2f2' }} className="indicators-table" bordered>
                <thead>
                  <tr>
                    <th>Course Learning Outcome(s)</th>
                    <th>Assessment Components</th>
                    <th>Marks</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <b>enter course learning outcome (CLOs) here</b>
                    </td>
                    <td>
                      <b>enter all assessment component per CLO here</b>
                    </td>
                    <td>
                      <b>enter the average mark for each CLO here</b>
                    </td>
                    <td>
                      <b>enter the weight mark for each CLO here</b>
                    </td>
                  </tr>
                  {renderCLORows()}
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
              <img src={CLOs} height="250px" alt="img" style={{ marginTop: '35px' }} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button style={{ background: '#253B63' }} component={Link} to="/CourseKeyIndicaters" variant="contained">
                Previous
              </Button>
            </Col>
            <Col>
              <Button
                style={{ background: '#253B63', float: 'right' }}
                component={Link}
                to="/Weektoweekactivity"
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
