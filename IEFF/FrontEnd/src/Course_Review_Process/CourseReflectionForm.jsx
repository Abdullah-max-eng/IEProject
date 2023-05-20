import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate ,Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavBarTopProcess } from '../NavBarTopProcess.jsx';
import { Row, Table } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import './CourseReflectionForm.css';

export const CourseReflectionForm = ({ initialData }) => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();





  
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);
















  const handleSaveAndNext = () => {
    const sloRows = Array.from(document.querySelectorAll('#sloTable tbody tr'));
    const cloRows = Array.from(document.querySelectorAll('#cloTable tbody tr'));

    const sloData = sloRows.map((row, index) => {
      const cells = Array.from(row.querySelectorAll('td'));
      return {
        slo: cells[0].textContent.trim(),
        achievementStatus: document.querySelector(`input[name="criteria-${index}"]:checked`)?.value || '',
        assessment: cells[2].textContent.trim(),
        facultyComments: cells[3].textContent.trim(),
        reviewerComments: cells[4].textContent.trim(),
      };
    });

    const cloData = cloRows.map((row, index) => {
      const cells = Array.from(row.querySelectorAll('td'));
      return {
        clo: cells[0].textContent.trim(),
        achievementStatus: document.querySelector(`input[name="criteria-${index}"]:checked`)?.value || '',
        assessment: cells[2].textContent.trim(),
        facultyComments: cells[3].textContent.trim(),
        reviewerComments: cells[4].textContent.trim(),
      };
    });

    const updatedData = {
      sloData,
      cloData,
    };

    // Update the formData state with the edited data
    setFormData(updatedData);
    console.log(JSON.stringify(updatedData)); // Print data in the console
    navigate('/CourseImprovementPlan');
    // TODO: Send updatedData to Django server using an HTTP request
  };











  return (
    <div>
      <Box sx={{ height: '100vh' }}>
        <NavBarTopProcess />
        <Container fixed>
          <Row className="fs-4 fw-bold d-flex justify-content-center">Course Reflection Form</Row>
          <Row>
            <b className="oneandhalf oneandhalfmargin">
              Please refer to your course syllabus to fill the Student Learning Outcomes (SLOs) and Course Learning
              Outcomes (CLOs) in these tables:
            </b>
          </Row>
          <Row>
            <Dropdown>
            <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                style={{ background: '#ffffff', color: '#000000' }}
                >
                Assessment 1
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Assessment 1</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Assessment 2</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Assessment 3</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
          </Row>

          <Row>
            <Table id="sloTable" style={{ background: 'rgba(255,255,255,0.67)' }} bordered>
              <thead>
                <tr>
                  <td>
                    <b>SLO</b>
                  </td>
                  <td>
                    <b>Achievement Status</b>
                  </td>
                  <td>
                    <b>Assessment</b>
                  </td>
                  <td>
                    <b>Faculty Comments</b>
                  </td>
                  <td>
                    <b>Reviewer Comments</b>
                  </td>
                </tr>
              </thead>
              <tbody>
                {[...Array(10)].map((_, index) => (
                  <tr key={index}>
                    <td>
                      <b>SLO{index + 1}</b>
                    </td>
                    <td>
                      <form className="oneandhalf">
                        <input
                          type="radio"
                          id={`MeetTheCriteria-${index}`}
                          name={`criteria-${index}`}
                          value="meet"
                          defaultChecked={formData?.sloData?.[index]?.achievementStatus === 'meet'}
                        />
                        <label htmlFor={`MeetTheCriteria-${index}`}>Achieved</label>
                        <input
                          type="radio"
                          id={`partialMeetTheCriteria-${index}`}
                          name={`criteria-${index}`}
                          value="pMeet"
                          defaultChecked={formData?.sloData?.[index]?.achievementStatus === 'pMeet'}
                        />
                        <label htmlFor={`partialMeetTheCriteria-${index}`}>Partially Achieved</label>
                        <input
                          type="radio"
                          id={`notMeetTheCriteria-${index}`}
                          name={`criteria-${index}`}
                          value="notMeet"
                          defaultChecked={formData?.sloData?.[index]?.achievementStatus === 'notMeet'}
                        />
                        <label htmlFor={`notMeetTheCriteria-${index}`}>Not Achieved</label>
                      </form>
                    </td>
                    <td contentEditable="true" defaultValue={formData?.sloData?.[index]?.assessment}></td>
                    <td contentEditable="true" defaultValue={formData?.sloData?.[index]?.facultyComments}></td>
                    <td contentEditable="true" defaultValue={formData?.sloData?.[index]?.reviewerComments}></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>

          <Row>
            <Table id="cloTable" style={{ background: 'rgba(255,255,255,0.67)' }} bordered>
              <thead>
                <tr>
                  <td>
                    <b>CLO</b>
                  </td>
                  <td>
                    <b>Achievement Status</b>
                  </td>
                  <td>
                    <b>Assessment</b>
                  </td>
                  <td>
                    <b>Faculty Comments</b>
                  </td>
                  <td>
                    <b>Reviewer Comments</b>
                  </td>
                </tr>
              </thead>
              <tbody>
                {[...Array(10)].map((_, index) => (
                  <tr key={index}>
                    <td>
                      <b>CLO{index + 1}</b>
                    </td>
                    <td>
                      <form className="oneandhalf">
                        <input
                          type="radio"
                          id={`MeetTheCriteria-${index}`}
                          name={`criteria-${index}`}
                          value="meet"
                          defaultChecked={formData?.cloData?.[index]?.achievementStatus === 'meet'}
                        />
                        <label htmlFor={`MeetTheCriteria-${index}`}>Achieved</label>
                        <input
                          type="radio"
                          id={`partialMeetTheCriteria-${index}`}
                          name={`criteria-${index}`}
                          value="pMeet"
                          defaultChecked={formData?.cloData?.[index]?.achievementStatus === 'pMeet'}
                        />
                        <label htmlFor={`partialMeetTheCriteria-${index}`}>Partially Achieved</label>
                        <input
                          type="radio"
                          id={`notMeetTheCriteria-${index}`}
                          name={`criteria-${index}`}
                          value="notMeet"
                          defaultChecked={formData?.cloData?.[index]?.achievementStatus === 'notMeet'}
                        />
                        <label htmlFor={`notMeetTheCriteria-${index}`}>Not Achieved</label>
                      </form>
                    </td>
                    <td contentEditable="true" defaultValue={formData?.cloData?.[index]?.assessment}></td>
                    <td contentEditable="true" defaultValue={formData?.cloData?.[index]?.facultyComments}></td>
                    <td contentEditable="true" defaultValue={formData?.cloData?.[index]?.reviewerComments}></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>

          <Row className="d-flex justify-content-center">
            <Button variant="contained" onClick={handleSaveAndNext}>
              Save and Next
            </Button>
          </Row>
          <Row className="d-flex justify-content-center mt-2">
            <Button variant="contained">
              <Link to="/Weektoweekactivity" style={{ textDecoration: 'none', color: 'inherit' }}>
                Previouse
              </Link>
            </Button>
          </Row>
        </Container>
      </Box>
    </div>
  );
};

export default CourseReflectionForm;











