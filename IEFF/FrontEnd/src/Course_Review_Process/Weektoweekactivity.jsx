import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavBarTopProcess } from '../NavBarTopProcess.jsx';
import { Row, Col } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import { getCookie } from '../assets/getCoookies.js';
export const Weektoweekactivity = () => {
  const navigate = useNavigate();
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedCourseID, setSelectedCourseID] = useState('');
  const [status, setStatus] = useState('');
  const [existingData, setExistingData] = useState([]);
  const [role, setRole] = useState('');

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

  // To get the existing data
  useEffect(() => {
    if (selectedCourseID !== '') {
      fetch(`${process.env.REACT_APP_SERVER_IP}/AddorGetDataWeekToWeek/?Cid=${selectedCourseID}`, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          setExistingData(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [selectedCourseID]);




  // To save data to the database
  const saveDataToDB = () => {
    const updatedData = feedbacks.map((feedback, index) => ({
      weekindex: index + 1,
      feedback: feedback
    }));
    const csrftoken = getCookie('csrftoken');
    const postData = JSON.stringify(updatedData);
    fetch(`${process.env.REACT_APP_SERVER_IP}/AddorGetDataWeekToWeek/?Cid=${selectedCourseID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,

      },
      body: postData
    })
      .then(response => response.json())
      .then(data => {
        alert(data.success);
        setStatus(data.success);
      })
      .catch(error => {
        console.error('Error saving data:', error);
      });
  };






  const handleSaveAndNext = () => {
    if (!selectedWeek) {
      alert('Please select a week.');
      return;
    }

    saveDataToDB();

  };









  // Initialize feedbacks array based on the number of weeks
  useEffect(() => {
    if (existingData.length > 0) {
      const lastWeek = existingData[existingData.length - 1].weekindex;
      const newFeedbacks = Array(lastWeek).fill('');

      existingData.forEach(item => {
        newFeedbacks[item.weekindex - 1] = item.feedback;
      });

      setFeedbacks(newFeedbacks);
    }
  }, [existingData]);





  const handleFeedbackChange = (weekIndex, feedback) => {
    const newFeedbacks = [...feedbacks];

    // Adjust array size if weekIndex is greater than the current length
    if (weekIndex > newFeedbacks.length) {
      newFeedbacks.length = weekIndex;
    }

    // Update the feedback for the selected week
    newFeedbacks[weekIndex - 1] = feedback;
    setFeedbacks(newFeedbacks);
  };



  const goToNextPage = () => {
    navigate('/CourseReflectionForm');
  }


  return (
    <div>
      <Box sx={{ height: '100vh' }}>
        <NavBarTopProcess />
        <Container fixed>
          <Row className="fs-4 fw-bold d-flex justify-content-center">Week to Week Activity</Row>
          <Row>
            <b className="oneandhalf oneandhalfmargin">
              For each week of the semester, please write 2-3 sentences to elaborate and reflect on the weekly calendar in
              terms of activities, student learning, assessment, and the alignment with the course learning outcomes.
            </b>
          </Row>
          <Row>
            <Col md={4}>
              <table>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(week => (
                    <tr key={week}>
                      <td>
                        <Button
                          style={{
                            background: selectedWeek === week ? '#253B63' : 'rgba(255,255,255,0.68)',
                            borderRadius: '0px',
                            textTransform: 'none',
                            minWidth: '100px',
                            maxWidth: '100px',
                            color: selectedWeek === week ? 'white' : 'black'
                          }}
                          className="p-1 fw-bold"
                          variant="contained"
                          onClick={() => setSelectedWeek(week)}
                        >
                          Week {week}
                          {selectedWeek === week && <span style={{ marginLeft: '5px' }}>&#10003;</span>}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!selectedWeek && (
                <div style={{ marginTop: '10px', color: 'red' }}>Please select a week to provide feedback.</div>
              )}
            </Col>
            <Col>
              <TextField
                hiddenLabel
                fullWidth
                id="filled-hidden-label-small"
                placeholder={selectedWeek ? `Write here about Week ${selectedWeek}...` : 'Select a week'}
                variant="outlined"
                multiline
                rows={17}
                value={feedbacks[selectedWeek - 1] || ''}
                onChange={e => handleFeedbackChange(selectedWeek, e.target.value)}
                style={{ background: 'rgba(255,255,255,0.67)' }}
                disabled={!selectedWeek || role === 'Reviewer'}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <Button style={{ background: '#253B63' }} component={Link} to="/CourseKeyIndicatersSecond" variant="contained">
                Previous
              </Button>
            </Col>
            <Col>
              <Button
                style={{ background: '#253B63', float: 'right' }}
                variant="contained"
                onClick={goToNextPage}
              >
                Next
              </Button>



              <Button
                style={{ background: '#253B63', float: 'right', marginRight: '10px' }}
                variant="contained"
                onClick={saveDataToDB}
                disabled={role === 'Reviewer'}
              >
                Save Data
              </Button>



            </Col>
          </Row>
        </Container>
      </Box>
    </div>
  );
};
