import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';
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
  const [role, setRole] = useState('');


  
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
    setFormData(initialData);
  }, [initialData]);




  const handleSaveAndNext = () => {
    const sloRows = Array.from(document.querySelectorAll('#sloTable tbody tr'));
    const cloRows = Array.from(document.querySelectorAll('#cloTable tbody tr'));
    const sloData = sloRows.map((row, index) => {
      const cells = Array.from(row.querySelectorAll('td'));
      return {
        slo: cells[0].textContent.trim(),
        achievementStatus: document.querySelector(`input[name="slo-criteria-${index}"]:checked`)?.value || '',
        assessment: cells[2].textContent.trim(),
        facultyComments: cells[3].textContent.trim(),
        reviewerComments: cells[4].textContent.trim(),
      };
    });

    const cloData = cloRows.map((row, index) => {
      const cells = Array.from(row.querySelectorAll('td'));
      return {
        clo: cells[0].textContent.trim(),
        achievementStatus: document.querySelector(`input[name="clo-criteria-${index}"]:checked`)?.value || '',
        assessment: cells[2].textContent.trim(),
        facultyComments: cells[3].textContent.trim(),
        reviewerComments: cells[4].textContent.trim(),
      };
    });




    const updatedData = {
      sloData,
      cloData,
    };



    setFormData(updatedData);
    console.log(JSON.stringify(updatedData));
    navigate('/CourseImprovementPlan');
    // TODO: Send updatedData to Django server using an HTTP request
  };






  const isProfessor = role === 'Professor';
  const isReviewer = role === 'Reviewer';
  const disableField = isProfessor ? {} : { disabled: true };
  const disableReviewerComments = isProfessor ? { disabled: true, title: 'You cannot edit this field' } : {};
  const disableNonEditableFields = isReviewer ? { disabled: true, title: 'You cannot edit this field' } : {};





  const makeEditableForProfessor = (isProfessor, defaultValue) => {
    if (isProfessor) {
      return { contentEditable: 'true', defaultValue };
    }
    return { contentEditable: 'false', value: defaultValue };
  };






  const makeEditableForReviewer = (isReviewer, defaultValue) => {
    if (isReviewer) {
      return { contentEditable: 'true', defaultValue };
    }
    return { contentEditable: 'false', value: defaultValue };
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
              <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ background: '#ffffff', color: '#000000' }}>
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
                          name={`slo-criteria-${index}`}
                          value="meet"
                          defaultChecked={formData?.sloData?.[index]?.achievementStatus === 'meet'}
                          {...disableField}
                        />
                        <label htmlFor={`MeetTheCriteria-${index}`}>Achieved</label>
                        <input
                          type="radio"
                          id={`partialMeetTheCriteria-${index}`}
                          name={`slo-criteria-${index}`}
                          value="pMeet"
                          defaultChecked={formData?.sloData?.[index]?.achievementStatus === 'pMeet'}
                          {...disableField}
                        />
                        <label htmlFor={`partialMeetTheCriteria-${index}`}>Partially Achieved</label>
                        <input
                          type="radio"
                          id={`notMeetTheCriteria-${index}`}
                          name={`slo-criteria-${index}`}
                          value="notMeet"
                          defaultChecked={formData?.sloData?.[index]?.achievementStatus === 'notMeet'}
                          {...disableField}
                        />
                        <label htmlFor={`notMeetTheCriteria-${index}`}>Not Achieved</label>
                      </form>
                    </td>
                    <td {...makeEditableForProfessor(isProfessor, formData?.sloData?.[index]?.assessment)} {...disableField}></td>
                    <td {...makeEditableForProfessor(isProfessor, formData?.sloData?.[index]?.facultyComments)} {...disableNonEditableFields}></td>
                    <td {...makeEditableForReviewer(isReviewer, formData?.sloData?.[index]?.reviewerComments)} {...disableReviewerComments}></td>
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
                          name={`clo-criteria-${index}`}
                          value="meet"
                          defaultChecked={formData?.cloData?.[index]?.achievementStatus === 'meet'}
                          {...disableField}
                        />
                        <label htmlFor={`MeetTheCriteria-${index}`}>Achieved</label>
                        <input
                          type="radio"
                          id={`partialMeetTheCriteria-${index}`}
                          name={`clo-criteria-${index}`}
                          value="pMeet"
                          defaultChecked={formData?.cloData?.[index]?.achievementStatus === 'pMeet'}
                          {...disableField}
                        />
                        <label htmlFor={`partialMeetTheCriteria-${index}`}>Partially Achieved</label>
                        <input
                          type="radio"
                          id={`notMeetTheCriteria-${index}`}
                          name={`clo-criteria-${index}`}
                          value="notMeet"
                          defaultChecked={formData?.cloData?.[index]?.achievementStatus === 'notMeet'}
                          {...disableField}
                        />
                        <label htmlFor={`notMeetTheCriteria-${index}`}>Not Achieved</label>
                      </form>
                    </td>
                    <td {...makeEditableForProfessor(isProfessor, formData?.cloData?.[index]?.assessment)} {...disableField}></td>
                    <td {...makeEditableForProfessor(isProfessor, formData?.cloData?.[index]?.facultyComments)} {...disableNonEditableFields}></td>
                    <td {...makeEditableForReviewer(isReviewer, formData?.cloData?.[index]?.reviewerComments)} {...disableReviewerComments}></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>

          <Row>
            <Button variant="contained" color="primary" onClick={handleSaveAndNext}>
              Save and Next
            </Button>
            <Button variant="contained" color="secondary" component={Link} to="/CourseImprovementPlan">
              Back
            </Button>
          </Row>
        </Container>
      </Box>
    </div>
  );
};
