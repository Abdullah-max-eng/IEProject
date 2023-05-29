import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavBarTopProcess } from '../NavBarTopProcess.jsx';
import { Row, Col, Table } from 'react-bootstrap';
import CLOs from '../CLOs.png';
import Select from 'react-select';

export const CourseKeyIndicatersSecond = () => {
  const [selectedCourseID, setSelectedCourseID] = useState('');
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();




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








  useEffect(() => {
    const checkRole = () => {
      const url = 'http://127.0.0.1:8000/getRoleAndData/';
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setRole(data.role);

        })
        .catch(error => console.error(error));
    };

    checkRole();
  }, []);






  useEffect(() => {
    fetch('/get_selected_course_id/')
      .then(response => response.json())
      .then(data => {
        setSelectedCourseID(data.selected_course_id);

      })
      .catch(error => {
        console.error('Error fetching selected course ID:', error);
      });
  }, []);





  const handleComponentsChange = (cloIndex, selectedOptions) => {
    const updatedComponents = [...selectedComponents];
    updatedComponents[cloIndex - 1] = selectedOptions;
    setSelectedComponents(updatedComponents);

    const updatedFormData = formData.map((data, index) => {
      if (data.cloIndex === cloIndex) {
        return {
          ...data,
          assignments: selectedOptions.map(option => option.label),
        };
      }
      return data;
    });
    setFormData(updatedFormData);
  };






  const handleMarksChange = (e, cloIndex) => {
    const updatedFormData = formData.map(data => {
      if (data.cloIndex === cloIndex) {
        return {
          ...data,
          marks: e.target.value,
        };
      }
      return data;
    });
    setFormData(updatedFormData);
  };





  const handleWeightChange = (e, cloIndex) => {
    const updatedFormData = formData.map(data => {
      if (data.cloIndex === cloIndex) {
        return {
          ...data,
          weight: e.target.value,
        };
      }
      return data;
    });
    setFormData(updatedFormData);
  };







  const handleSaveAndNext = () => {
    const updatedFormData = formData.map((data, index) => ({
      ...data,
      assignments: selectedComponents[index]?.map(option => option.label) || [],
    }));
    setFormData(updatedFormData);
    console.log(formData);

    // Navigate to the specified page
    navigate('/Weektoweekactivity');
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
              value={selectedComponents[i - 1] || []}
              placeholder="Select components"
              menuPlacement="auto"
              closeMenuOnSelect={false}
              isDisabled={role === 'Reviewer'}
            />
            {selectedComponents[i - 1] && selectedComponents[i - 1].length > 0 && (
              <div>
                Selected: {selectedComponents[i - 1].map((option) => option.label).join(', ')}
              </div>
            )}
          </td>
          <td>
            <input
              style={{ width: '100%' }}
              className="inputSmall inputNoBorder"
              placeholder="Marks"
              disabled={role === 'Reviewer'}
              onChange={(e) => handleMarksChange(e, i)}
            />
          </td>
          <td>
            <input
              style={{ width: '100%' }}
              className="inputSmall inputNoBorder"
              placeholder="Weight"
              disabled={role === 'Reviewer'}
              onChange={(e) => handleWeightChange(e, i)}
            />
          </td>
        </tr>
      );
    }
    return rows;
  };





  useEffect(() => {
    const initialFormData = [];
    for (let i = 1; i <= 10; i++) {
      initialFormData.push({ cloIndex: i, marks: '', weight: '', assignments: [] });
    }
    setFormData(initialFormData);
  }, []);







  // useEffect(() => {
  //   console.log(role);
  // }, [role]);

  // useEffect(() => {
  //   console.log(selectedCourseID);
  // }, [selectedCourseID]);









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
              <Button style={{ background: '#253B63', float: 'right' }} onClick={handleSaveAndNext} variant="contained">
                Save and Next
              </Button>
            </Col>
          </Row>
        </Container>
      </Box>
    </div>
  );
};
