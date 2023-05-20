import React, {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import {
  Link,  
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavBarTopProcess } from '../NavBarTopProcess.jsx'
import { Row, Col } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import '../style.css';
import reviewCritria from '../reviewCritria.png';
import arrow from '../arrow.svg';



export const Instructions = () => {
    
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
    console.log(role);


    

  return (
    <div><Box sx={{  height: '100vh' }}>
        <NavBarTopProcess/>
        <Container fixed>
        <div className="d-flex align-items-center justify-content-center">
            
            
        <Col>
            
        <Row className="fs-4 fw-bold d-flex justify-content-center">Instruction</Row>
            
            
            <Row>
                  <Alert style={{background: 'rgba(255,255,255,0.5)'}} className="fw-bold"  variant="dark">
                      <p class="oneandhalf oneandhalfmargin">The purpose of this review is to evaluate and improve our assessment practices, more specifically, to compare our assessments against the Course Learning Outcomes on each course curriculum. The goal of this assessment review
                      is to ensure curricula, assessments and rubrics are linked together. This process provides an opportunity to reflect on your assessment practices and identify areas for improvement. Our goal is to develop a systematic assessment
                      plan that would provide continuous improvement in the curriculum while supporting faculty development and student learning outcomes. Please provide honest and forthright answers in all tables in this document.
                      </p>
                      <p class="oneandhalf oneandhalfmargin">
                      The instructors teaching a reviewed course in the 2022-2023 academic year will serve as the point persons for their respective courses.  This responsibility should not be an onerous one.  The job is to be in charge of data collection,
                      including relevant materials such as quizzes and exams, as well as scanning and cataloguing examples of student work.  Ideally, instead of a mad dash at the end of a semester, data collection should be incremental and ought not
                      to require too much effort.
                      </p>
                      <p class="oneandhalf">
                      NOTES:
                      </p>
                    
                      <p class="oneandhalf">
                      (1) All instructors who taught this course this year should assist the point person to make this task as stress-free as possible.
                      </p>
                      <p class="oneandhalf oneandhalfmargin">
                          (2) This process of data collection needs to span BOTH fall and spring semester, which will allow a review process that can track any improvement or significant changes that
                          occur from one semester to the next.
                      </p>
                      <p class="oneandhalf">
                          The list below shows the steps to provide the necessary information and feedback:
                      </p>
                </Alert>
          </Row>



          <Row >


              <Col md='auto'>
                    <Row className="p-1"><Button style={{background: '#253B63', borderRadius: '12px',textTransform: 'none',minWidth:'286px',maxWidth:'286px'}} className="p-0 fw-bold" component={Link} to="/CourseKeyIndicaters" variant="contained"> Course Key Indicators </Button></Row>
                    <Row className="p-1"><Button style={{background: '#253B63', borderRadius: '12px',textTransform: 'none',minWidth:'286px',maxWidth:'286px'}} className="p-0 fw-bold" component={Link} to="/CourseFolder" variant="contained"> Course Folder </Button></Row>
                    <Row className="p-1"><Button style={{background: '#253B63', borderRadius: '12px',textTransform: 'none',minWidth:'286px',maxWidth:'286px'}} className="p-0 fw-bold" component={Link} to="/Weektoweekactivity" variant="contained"> Week to week activity </Button></Row>
                    <Row className="p-1"><Button style={{background: '#253B63', borderRadius: '12px',textTransform: 'none',minWidth:'286px',maxWidth:'286px'}} className="p-0 fw-bold" component={Link} to="/CourseReflectionForm" variant="contained"> Course Reflection Form </Button></Row>
                    <Row className="p-1"><Button style={{background: '#253B63', borderRadius: '12px',textTransform: 'none',minWidth:'286px',maxWidth:'286px'}} className="p-0 fw-bold" component={Link} to="/CourseImprovementPlan" variant="contained"> Course Improvement Plan (CIP) </Button></Row>
                    <Row className="p-1"><Button style={{background: '#253B63', borderRadius: '12px',textTransform: 'none',minWidth:'286px',maxWidth:'286px'}} className="p-0 fw-bold" component={Link} to="/ChallengesConcerns" variant="contained"> Challenges & Concerns </Button></Row>
                    <Row className="p-1"><Button style={{background: '#253B63', borderRadius: '12px',textTransform: 'none',minWidth:'286px',maxWidth:'286px'}} className="p-0 fw-bold" component={Link} to="/ReviewersFeedback" variant="contained"> Reviewers Feedback </Button></Row>
              </Col>



              <Col md='auto'>
                    <img
                    src={arrow}
                    alt="logo"
                    style={{marginTop:'35px'}}
                    />
              </Col>





              <Col>
                    <Alert style={{background: 'rgba(255,255,255,0.5)'}}  variant="dark">
                        <p class="oneandhalf">
                        Please upload this Excel file to your course folder 
                        </p>
                        <p class="oneandhalf">
                        or Teacher Portfolio in the shared Google drive .
                        </p>
                        <b class="oneandhalf">
                        Please add the link to your course folder here: 
                        </b>
                        <p class="oneandhalf">
                        ---{'>'} <a href="http://google.com">Shared Google Drive </a> 
                        </p>
                    </Alert>
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
              <Button style={{maxWidth: '100px', float: 'right', background: '#253B63',marginTop:'5px'}} component={Link} to="/CourseKeyIndicaters" variant="contained"> Next </Button>
          </Row>



        </Col>
        </div>
        </Container>
      
      
      <Container fixed>
    
       
      </Container>
      
       
      </Box>
    </div>
  )
}
