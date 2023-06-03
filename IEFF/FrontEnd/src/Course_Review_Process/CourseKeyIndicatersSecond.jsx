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
  const [saveStatus, setSaveStatus] = useState('');
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
    // Add other possible assessment components here
  ];





  // To get Role
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





  // To get the Course ID selected in the first page
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





  // To get the existing data
  useEffect(() => {
    if (selectedCourseID !== '') {
      fetch(`/AddorGetDataSecondKeyIndicators/?Cid=${selectedCourseID}`, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          setFormData(data);

          // Extract existing assessment components
          const existingComponents = data.flatMap(item => item.assignments);

          // Create new options array by combining existing and default options
          const updatedOptions = assessmentComponentOptions.map(option => {
            // Check if the existing component already exists in the default options
            if (existingComponents.includes(option.value)) {
              return option; // Keep the existing option as is
            } else {
              return { value: option.value, label: option.value }; // Create a new option
            }
          });

          // Update the assessment component options state
          setSelectedComponents(updatedOptions);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [selectedCourseID]);





  // To save data to the database
  const saveDataToDB = () => {
    console.log(formData);
    fetch(`/AddorGetDataSecondKeyIndicators/?Cid=${selectedCourseID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        alert(data.success)
        setSaveStatus(data.success);
      })
      .catch(error => {
        console.error('Error saving data:', error);
      });
  };







  const handleComponentsChange = (cloIndex, selectedOptions) => {
    const updatedData = formData.map(item => {
      if (item.cloIndex === cloIndex) {
        return { ...item, assignments: selectedOptions.map(option => option.value) };
      } else {
        return item;
      }
    });
  
    // Create a new object if the CLO doesn't have initial data
    const foundCLO = updatedData.find(item => item.cloIndex === cloIndex);
    if (!foundCLO) {
      updatedData.push({
        cloIndex,
        marks: '',
        weight: '',
        assignments: selectedOptions.map(option => option.value)
      });
    }
  
    setFormData(updatedData);
  };
  





  
  const handleMarksChange = (event, cloIndex) => {
    const { value } = event.target;
    const updatedData = formData.map(item => {
      if (item.cloIndex === cloIndex) {
        return { ...item, marks: value };
      } else {
        return item;
      }
    });

    setFormData(updatedData);
  };




  const handleWeightChange = (event, cloIndex) => {
    const { value } = event.target;
    const updatedData = formData.map(item => {
      if (item.cloIndex === cloIndex) {
        return { ...item, weight: value };
      } else {
        return item;
      }
    });

    setFormData(updatedData);
  };





  const renderCLORows = () => {
    const initialFormData = Array.from({ length: 10 }, (_, index) => ({
      cloIndex: index + 1,
      marks: '',
      weight: '',
      assignments: []
    }));
    

    const combinedData = [...formData, ...initialFormData];

    return combinedData.map((data, index) => {
      const marks = data.marks;
      const weight = data.weight;
      const assignments = data.assignments;

      // Create options for the Select component based on assessmentComponentOptions
      const options = assessmentComponentOptions.map(option => ({
        value: option.value,
        label: option.label
      }));

      // Get the selected options based on assignments
      const selectedOptions = options.filter(option =>
        assignments.includes(option.value)
      );

      return (
        <tr key={`clo-${index + 1}`}>
          <td>CLO {index + 1}</td>
          <td className="select-cell">
            <Select
              className="select-input"
              options={options}
              isMulti
              onChange={selectedOptions => handleComponentsChange(index + 1, selectedOptions)}
              value={selectedOptions}
              placeholder="Select components"
              menuPlacement="auto"
              closeMenuOnSelect={false}
              isDisabled={role === 'Reviewer'}
            />
            {selectedOptions.length > 0 && (
              <div>
                Selected: {selectedOptions.map(option => option.label).join(', ')}
              </div>
            )}
          </td>
          <td>
            <input
              type="number"
              className="marks-input"
              value={marks}
              onChange={event => handleMarksChange(event, index + 1)}
              disabled={role === 'Reviewer'}
            />
          </td>
          <td>
            <input
              type="number"
              className="weight-input"
              value={weight}
              onChange={event => handleWeightChange(event, index + 1)}
              disabled={role === 'Reviewer'}
            />
          </td>
        </tr>
      );
    });
  };



  
  return (
    <div>
      <NavBarTopProcess step={2} />
      <Container>
        <Box sx={{ mt: 5 }}>
          <Row>
            <Col xs={12} md={4} lg={6} className="mt-2 text-center">
              <h3 className="text-primary fw-bold">Course Key Indicators</h3>
              <img src={CLOs} alt="CLOs" className="img-fluid" />
            </Col>

          </Row>
          <Row className="mt-3">
            <Col xs={12}>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>CLO</th>
                    <th>Components</th>
                    <th>Marks</th>
                    <th>Weight (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {renderCLORows()}
                </tbody>
              </Table>
            </Col>



            <Col xs={12} md={4} lg={3} className="mt-2">
              <Link
                to="/CourseKeyIndicaters"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  Back
                </Button>
              </Link>
            </Col>
            <Col xs={12} md={4} lg={3} className="mt-2">
              <Link
                to="/Weektoweekactivity"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  Next
                </Button>
              </Link>
            </Col>
            <Col xs={12} md={4} lg={3} className="mt-2">
              {role !== 'Reviewer' && (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={saveDataToDB}
                >
                  Save
                </Button>
              )}
              {saveStatus && <div className="mt-2 text-success">{saveStatus}</div>}
            </Col>

          </Row>
        </Box>
      </Container>
    </div>
  );
};