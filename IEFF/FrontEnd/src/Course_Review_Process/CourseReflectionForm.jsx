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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getCookie } from '../assets/getCoookies.js';






export const CourseReflectionForm = ({ initialData }) => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [selectedCourseID, setSelectedCourseID] = useState('');
  const [assessments, setAssessments] = useState({});
  const [selectedAssessment, setSelectedAssessment] = useState({});
  const [showCLOTable, setShowCLOTable] = useState(false);
  const [showSLOTable, setShowSLOTable] = useState(false);

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
  const [SLODATA, setSLOData] = useState([])
  const [CLODATA, setCLODATA] = useState([])





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


  const getAssignments = () => {
    fetch(`${process.env.REACT_APP_SERVER_IP}/getAssignments/?Cid=${selectedCourseID}`)
      .then(response => response.json())
      .then(data => {
        setAssessments(data.assessmentComponents);
      })
      .catch(error => {
        console.error('Error fetching assignments:', error);
      });
  };




  useEffect(() => {
    if (selectedCourseID) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_SERVER_IP}/SaveOrGetCloAndCLO/?Cid=${selectedCourseID}`);
          if (response.ok) {
            const data = await response.json();
            setCLODATA(data.CLOsData)
            setSLOData(data.SLOData)

          }
        } catch (error) {
          console.error('Error fetching existing data:', error);
        }
      };
      fetchData();
    }
  }, [selectedCourseID]);






  useEffect(() => {
    console.log("SLODDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD", SLODATA)
  }, [SLODATA]);


  useEffect(() => {
    console.log("CCCCCLOOOOOOOOOOOOOOOOOOOOOOO", CLODATA)
  }, [CLODATA]);




  useEffect(() => {
    if (selectedCourseID) {
      getAssignments();
    }
  }, [selectedCourseID]);





  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);





  const handleAssessmentSelect = (selected, index) => {
    setSelectedAssessment(prevSelected => {
      const updatedSelected = { ...prevSelected };
      updatedSelected[index] = selected;
      return updatedSelected;
    });
  };





  const handleSaveAndNext = () => {
    // Data for SLOs
    const sloData = [...Array(10)].map((_, index) => ({
      slo: index + 1,
      achievementStatus: document.querySelector(`input[name="slo-criteria-${index}"]:checked`)?.value || '',
      assessments: selectedAssessment[index] || [],
      facultyComments: document.querySelector(`#faculty-comments-${index}`)?.value || '',
      reviewerComments: document.querySelector(`#reviewer-comments-${index}`)?.value || '',
    }));

    // Data for CLOs
    const cloData = [...Array(10)].map((_, index) => ({
      clo: index + 1,
      achievementStatus: document.querySelector(`input[name="clo-criteria-${index}"]:checked`)?.value || '',
      facultyComments: document.querySelector(`#clo-faculty-comments-${index}`)?.value || '',
      reviewerComments: document.querySelector(`#clo-reviewer-comments-${index}`)?.value || '',
    }));


    const dataToBeSent = {
      SLOD: sloData,
      CLOD: cloData
    }


    const csrftoken = getCookie('csrftoken');
    fetch(`${process.env.REACT_APP_SERVER_IP}/SaveOrGetCloAndCLO/?Cid=${selectedCourseID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(dataToBeSent)
    })

    navigate('/CourseImprovementPlan');

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

  const handleShowCLOTable = () => {
    setShowCLOTable(true);
  };

  const handleHideCLOTable = () => {
    setShowCLOTable(false);
  };

  const handleShowSLOTable = () => {
    setShowSLOTable(true);
  };

  const handleHideSLOTable = () => {
    setShowSLOTable(false);
  };


  const handleShowCurrentData = () => {
    // Function to handle "Show Current Data" button click
    // We'll set the SLODATA and CLODATA in the state so they can be displayed in tables

    // For SLO data
    const sloData = SLODATA || [];
    setSLOData(sloData);

    // For CLO data
    const cloData = CLODATA || [];
    setCLODATA(cloData);
  };








  return (
    <div>
      <Box sx={{ height: '100vh' }}>
        <NavBarTopProcess />
        <Container fixed>
          <Row className="fs-4 fw-bold d-flex justify-content-center">
            Course Reflection Form
          </Row>
          <Row>
            <b className="oneandhalf oneandhalfmargin">
              Please refer to your course syllabus to fill the Student Learning Outcomes (SLOs) and Course Learning
              Outcomes (CLOs) in these tables:
            </b>
          </Row>

          {/* Table to display SLO data */}
          {showSLOTable ? (
            <>
              <Row>
                <h3>SLO Data</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>SLO</th>
                      <th>Achievement Status</th>
                      <th>Assessment</th>
                      <th>Faculty Comments</th>
                      <th>Reviewer Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SLODATA.map((item) => (
                      <tr key={item.index}>
                        <td>SLO{item.index}</td>
                        <td>{item.achievementStatus}</td>
                        <td>{item.assessments}</td>
                        <td>{item.facultyComment}</td>
                        <td>{item.reviewerComment}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>
              <Row>
                <Button variant="contained" color="primary" onClick={handleHideSLOTable}>
                  Hide SLOs
                </Button>
              </Row>
            </>
          ) : (
            <Row>
              <Button variant="contained" color="primary" onClick={handleShowSLOTable}>
                Edit SLOs
              </Button>
            </Row>
          )}

          {/* Change table for SLO */}
          {showSLOTable && (
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
                      <td>
                        <Select
                          multiple
                          value={selectedAssessment[index] || []}
                          onChange={(e) => handleAssessmentSelect(e.target.value, index)}
                          disabled={isReviewer}
                        >
                          <MenuItem value="">
                            <em>Select Assessment</em>
                          </MenuItem>
                          {assessmentComponentOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </td>
                      <td>
                        <textarea
                          id={`faculty-comments-${index}`}
                          className="form-control"
                          rows="1"
                          {...makeEditableForProfessor(isProfessor, formData?.sloData?.[index]?.facultyComments)}
                          {...disableNonEditableFields}
                        />
                      </td>
                      <td>
                        <textarea
                          id={`reviewer-comments-${index}`}
                          className="form-control"
                          rows="1"
                          {...makeEditableForReviewer(isReviewer, formData?.sloData?.[index]?.reviewerComments)}
                          {...disableReviewerComments}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button variant="contained" color="secondary" onClick={handleHideSLOTable}>
                Hide SLOs
              </Button>
            </Row>
          )}

          {/* Table to display CLO data */}
          {showCLOTable ? (
            <>
              <Row>
                <h3>CLO Data</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>CLO</th>
                      <th>Achievement Status</th>
                      <th>Assessment</th>
                      <th>Faculty Comments</th>
                      <th>Reviewer Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CLODATA.map((item) => (
                      <tr key={item.index}>
                        <td>CLO{item.index}</td>
                        <td>{item.achievementStatus}</td>
                        <td>{item.assessment}</td>
                        <td>{item.facultyComment}</td>
                        <td>{item.reviewerComment}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>
              <Row>
                <Button variant="contained" color="primary" onClick={handleHideCLOTable}>
                  Hide CLOs
                </Button>
              </Row>
            </>
          ) : (
            <Row>
              <Button variant="contained" color="primary" onClick={handleShowCLOTable}>
                Edit CLOs
              </Button>
            </Row>
          )}

          {/* Change table for CLO */}
          {showCLOTable && (
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
                      <td>
                        {assessments[index + 1] &&
                          assessments[index + 1].map((assessment) => (
                            <div key={assessment.id}>{assessment.assessmentType}</div>
                          ))}
                      </td>
                      <td>
                        <textarea
                          id={`clo-faculty-comments-${index}`}
                          className="form-control"
                          rows="1"
                          {...makeEditableForProfessor(isProfessor, formData?.cloData?.[index]?.facultyComments)}
                          {...disableNonEditableFields}
                        />
                      </td>
                      <td>
                        <textarea
                          id={`clo-reviewer-comments-${index}`}
                          className="form-control"
                          rows="1"
                          {...makeEditableForReviewer(isReviewer, formData?.cloData?.[index]?.reviewerComments)}
                          {...disableReviewerComments}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button variant="contained" color="secondary" onClick={handleHideCLOTable}>
                Hide CLOs
              </Button>
            </Row>
          )}

          {/* New section to show current data */}
          <Row>
            <Button variant="contained" color="primary" onClick={handleShowCurrentData}>
              Show Current Data
            </Button>
          </Row>
          <Row>
            <Button variant="contained" color="primary" onClick={handleSaveAndNext}>
              Save and Next
            </Button>
            <Button variant="contained" color="secondary" component={Link} to="/Weektoweekactivity">
              Back
            </Button>
          </Row>
        </Container>
      </Box>
    </div>
  );



};
