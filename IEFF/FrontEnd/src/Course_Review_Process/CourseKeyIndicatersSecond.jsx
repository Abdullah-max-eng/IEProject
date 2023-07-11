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
import { getCookie } from '../assets/getCoookies.js';
import { Bar } from 'react-chartjs-2';






export const CourseKeyIndicatersSecond = () => {
  const [selectedCourseID, setSelectedCourseID] = useState('');
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState([]);
  const [saveStatus, setSaveStatus] = useState('');
  const navigate = useNavigate();
  const [chartData, setChartData] = useState(null);



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
      const url = `${process.env.REACT_APP_SERVER_IP}/getRoleAndData/`;
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
    fetch(`${process.env.REACT_APP_SERVER_IP}/get_selected_course_id/`)
      .then(response => response.json())
      .then(data => {
        setSelectedCourseID(data.selected_course_id);
      })
      .catch(error => {
        console.error('Error fetching selected course ID:', error);
      });
  }, []);




  // To get the Course ID selected in the first page
  useEffect(() => {
    console.log(formData)
  }, [formData]);





  // To get the existing data
  useEffect(() => {
    if (selectedCourseID !== '') {
      fetch(`${process.env.REACT_APP_SERVER_IP}/AddorGetDataSecondKeyIndicators/?Cid=${selectedCourseID}`, {
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
          // Prepare data for chart
          const chartLabels = data.map(item => `CLO ${item.cloIndex}`);
          const chartMarks = data.map(item => item.marks);
          const chartWeight = data.map(item => item.weight)
          setChartData({
            labels: chartLabels,
            datasets: [
              {
                label: 'Marks',
                data: chartMarks,
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1
              },
              {
                label: 'Weight',
                data: chartWeight,
                backgroundColor: 'orange',
                borderColor: 'orange',
                borderWidth: 1
              }
            ]
          });




        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [selectedCourseID]);





  // To save data to the database
  const saveDataToDB = () => {

    const csrftoken = getCookie('csrftoken');

    fetch(`${process.env.REACT_APP_SERVER_IP}/AddorGetDataSecondKeyIndicators/?Cid=${selectedCourseID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,

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
    let { value } = event.target;
    value = value.replace(/\D/g, '');
    const numericValue = parseInt(value, 10);
    const limitedValue = isNaN(numericValue) ? 0 : Math.min(numericValue, 100);

    const updatedData = formData.map(item => {
      if (item.cloIndex === cloIndex) {
        return { ...item, marks: limitedValue };
      } else {
        return item;
      }
    });

    setFormData(updatedData);
  };




  const handleWeightChange = (event, cloIndex) => {
    let { value } = event.target;
    // Remove any non-digit characters from the entered value
    value = value.replace(/\D/g, '');
    // Convert the value to a number
    const numericValue = parseInt(value, 10);

    const limitedValue = isNaN(numericValue) ? 0 : Math.min(numericValue, 100);
    const updatedData = formData.map(item => {
      if (item.cloIndex === cloIndex) {
        return { ...item, weight: limitedValue };
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
              max={100}
              pattern="[0-9]*"
            />
          </td>
          <td>
            <input
              type="number"
              className="weight-input"
              value={weight}
              onChange={event => handleWeightChange(event, index + 1)}
              disabled={role === 'Reviewer'}
              max={100}
              pattern="[0-9]*"
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


              <div style={{ background: 'white' }}>
                {chartData && (
                  <div style={{ height: '400px', marginTop: '20px' }}>
                    <Bar
                      data={chartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 100
                          }
                        },
                        plugins: {
                          legend: {
                            labels: {
                              color: '#000000' // Set legend label color to black
                            }
                          }
                        }
                      }}
                    />
                  </div>
                )}
              </div>



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
                to="/CourseFolder"
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