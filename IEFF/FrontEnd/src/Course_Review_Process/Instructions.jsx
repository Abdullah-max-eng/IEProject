import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavBarTopProcess } from '../NavBarTopProcess.jsx';
import { Row, Col } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import '../style.css';
import reviewCritria from '../reviewCritria.png';
import arrow from '../arrow.svg';
import { getCookie } from '../assets/getCoookies.js';


export const Instructions = () => {





  const handleLogout = () => {
    const csrftoken = getCookie('csrftoken');
    fetch('/Logout/', {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrftoken,
      },
      credentials: 'include'  // Include this line if you need to send cookies along with the request
    })
      .then(response => {
        if (response.ok) {
          // Logout successful, redirect to the login page
          window.location.href = '/Login';
        } else {
          // Handle logout error
          console.log('Logout failed');
        }
      })
      .catch(error => {
        // Handle any network or server error
        console.error('Error occurred during logout:', error);
      });
  };

  return (
    <div>
      <Box sx={{ height: '100vh' }}>
        <NavBarTopProcess />
        <Container fixed>
          <div className="d-flex align-items-center justify-content-center">


            <Col>


              <Row className="fs-4 fw-bold d-flex justify-content-center">
                Instruction
              </Row>




              <Row>

                <Alert
                  style={{ background: 'rgba(255,255,255)' }}
                  className="fw-bold"
                  variant="dark"
                >
                  <p className="oneandhalf oneandhalfmargin">
                    The purpose of this review is to evaluate and improve our assessment practices, more specifically, to compare our assessments against the Course Learning Outcomes on each course curriculum. The goal of this assessment review
                    is to ensure curricula, assessments and rubrics are linked together. This process provides an opportunity to reflect on your assessment practices and identify areas for improvement. Our goal is to develop a systematic assessment
                    plan that would provide continuous improvement in the curriculum while supporting faculty development and student learning outcomes. Please provide honest and forthright answers in all tables in this document.
                  </p>
                  <p className="oneandhalf oneandhalfmargin">
                    The instructors teaching a reviewed course in the 2022-2023 academic year will serve as the point persons for their respective courses. This responsibility should not be an onerous one. The job is to be in charge of data collection,
                    including relevant materials such as quizzes and exams, as well as scanning and cataloguing examples of student work. Ideally, instead of a mad dash at the end of a semester, data collection should be incremental and ought not
                    to require too much effort.
                  </p>
                  <p className="oneandhalf">
                    NOTES:
                  </p>
                  <p className="oneandhalf">
                    (1) All instructors who taught this course this year should assist the point person to make this task as stress-free as possible.
                  </p>
                  <p className="oneandhalf oneandhalfmargin">
                    (2) This process of data collection needs to span BOTH fall and spring semester, which will allow a review process that can track any improvement or significant changes that occur from one semester to the next.
                  </p>
                  <p className="oneandhalf">
                    The list below shows the steps to provide the necessary information and feedback:
                  </p>
                </Alert>


              </Row>




              <Row style={{ background: 'rgba(255,255,255)' }}>
                <Col md="auto">
                  <Row className="p-1">
                    <Button
                      className="custom-button"
                      component={Link}
                      to="/CourseKeyIndicaters"
                      variant="contained"
                    >
                      Course Key Indicators
                    </Button>
                  </Row>
                  <Row className="p-1">
                    <Button
                      className="custom-button"
                      component={Link}
                      to="/CourseFolder"
                      variant="contained"
                      disabled={true}
                    >
                      Course Folder
                    </Button>
                  </Row>
                  <Row className="p-1">
                    <Button
                      className="custom-button"
                      component={Link}
                      to="/Weektoweekactivity"
                      variant="contained"
                      disabled={true}
                    >
                      Week to Week Activity
                    </Button>
                  </Row>
                  <Row className="p-1">
                    <Button
                      className="custom-button"
                      component={Link}
                      to="/CourseReflectionForm"
                      variant="contained"
                      disabled={true}
                    >
                      Course Reflection Form
                    </Button>
                  </Row>
                  <Row className="p-1">
                    <Button
                      className="custom-button"
                      component={Link}
                      to="/CourseImprovementPlan"
                      variant="contained"
                      disabled={true}
                    >
                      Course Improvement Plan (CIP)
                    </Button>
                  </Row>
                  <Row className="p-1">
                    <Button
                      className="custom-button"
                      component={Link}
                      to="/ChallengesConcerns"
                      variant="contained"
                      disabled={true}
                    >
                      Challenges & Concerns
                    </Button>
                  </Row>
                  <Row className="p-1">
                    <Button
                      className="custom-button"
                      component={Link}
                      to="/ReviewersFeedback"
                      variant="contained"
                      disabled={true}
                    >
                      Reviewers Feedback
                    </Button>
                  </Row>
                </Col>

                <Col>
                  <img
                    src={reviewCritria}
                    width="400"
                    alt="logo"
                  />
                </Col>
              </Row>





              <Row className="justify-content-end">
                <Button
                  style={{
                    maxWidth: '100px',
                    float: 'right',
                    background: '#253B63',
                    marginTop: '5px',
                  }}
                  component={Link}
                  to="/CourseKeyIndicaters"
                  variant="contained"
                >
                  Next
                </Button>
                <Button
                  style={{
                    maxWidth: '100px',
                    float: 'right',
                    background: '#253B63',
                    marginTop: '5px',
                  }}
                  onClick={handleLogout}
                  variant="contained"
                >
                  Logout
                </Button>
              </Row>





            </Col>
          </div>
        </Container>
        <Container fixed></Container>
      </Box>
    </div>
  );
};
