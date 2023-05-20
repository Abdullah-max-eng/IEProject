import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavBarTopProcess } from '../NavBarTopProcess.jsx';
import { Row, Col } from 'react-bootstrap';
import TextField from '@mui/material/TextField';

export const Weektoweekactivity = () => {



  const navigate = useNavigate();
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [feedback, setFeedback] = useState('');






  const handleSaveAndNext = () => {
    if (!selectedWeek) {
      alert('Please select a week.');
      return;
    }

    // Perform saving logic here
    console.log(selectedWeek, feedback);

    navigate('/CourseReflectionForm');
  };











  
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
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((week) => (
                    <tr key={week}>
                      <td>
                        <Button
                          style={{
                            background: selectedWeek === week ? '#253B63' : 'rgba(255,255,255,0.68)',
                            borderRadius: '0px',
                            textTransform: 'none',
                            minWidth: '100px',
                            maxWidth: '100px',
                            color: selectedWeek === week ? 'white' : 'black',
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
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                style={{ background: 'rgba(255,255,255,0.67)' }}
                disabled={!selectedWeek}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <Button style={{ background: '#253B63' }} component={Link} to="/CourseKeyIndicatorsSecond" variant="contained">
                Previous
              </Button>
            </Col>
            <Col>
              <Button
                style={{ background: '#253B63', float: 'right' }}
                variant="contained"
                onClick={handleSaveAndNext}
              >
                Save and Next
              </Button>
            </Col>
          </Row>
        </Container>
      </Box>
    </div>
  );
};
