import React from 'react'
import Button from '@mui/material/Button';
import {
  Link
} from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavBarTopProcess } from '../NavBarTopProcess.jsx'
import { Row, Col} from 'react-bootstrap';
import  './Weektoweekactivity.css'
import TextField from '@mui/material/TextField';
export const Weektoweekactivity = () => {
  return (
    <div>
      <Box sx={{  height: '100vh' }}>
      <NavBarTopProcess/>
      <Container fixed>
          <Row className="fs-4 fw-bold d-flex justify-content-center">Week to Week Activity</Row>
          <Row>
            <b class="oneandhalf oneandhalfmargin">
              For each week of the semester, please write 2-3 sentences to elaborate and reflect on the weekly calendar in your syllabus in
             terms of activities, student learning, assessment, and the alignment with the course learning outcomes.
            </b>
          </Row>
          <Row>
            <Col md={4}>
            <Row>
              <Col>
                <Row className="p-2 my-2" style={{maxWidth:'100px'}}><Button style={{background: 'rgba(255,255,255,0.68)', borderRadius: '0px',textTransform: 'none',minWidth:'100px',maxWidth:'100px',color:'black'}} className="p-1 fw-bold" variant="contained"> Week 1 </Button></Row>
                <Row className="p-2 my-2" style={{maxWidth:'100px'}}><Button style={{background: 'rgba(255,255,255,0.68)', borderRadius: '0px',textTransform: 'none',minWidth:'100px',maxWidth:'100px',color:'black'}} className="p-1 fw-bold" variant="contained"> Week 2 </Button></Row>
                <Row className="p-2 my-2" style={{maxWidth:'100px'}}><Button style={{background: 'rgba(255,255,255,0.68)', borderRadius: '0px',textTransform: 'none',minWidth:'100px',maxWidth:'100px',color:'black'}} className="p-1 fw-bold" variant="contained"> Week 3 </Button></Row>
                <Row className="p-2 my-2" style={{maxWidth:'100px'}}><Button style={{background: 'rgba(255,255,255,0.68)', borderRadius: '0px',textTransform: 'none',minWidth:'100px',maxWidth:'100px',color:'black'}} className="p-1 fw-bold" variant="contained"> Week 4 </Button></Row>
                <Row className="p-2 my-2" style={{maxWidth:'100px'}}><Button style={{background: 'rgba(255,255,255,0.68)', borderRadius: '0px',textTransform: 'none',minWidth:'100px',maxWidth:'100px',color:'black'}} className="p-1 fw-bold" variant="contained"> Week 5 </Button></Row>
                <Row className="p-2 my-2" style={{maxWidth:'100px'}}><Button style={{background: 'rgba(255,255,255,0.68)', borderRadius: '0px',textTransform: 'none',minWidth:'100px',maxWidth:'100px',color:'black'}} className="p-1 fw-bold" variant="contained"> Week 6 </Button></Row>
              </Col>
              <Col>
                <Row className="p-2 my-2" style={{maxWidth:'100px'}}><Button style={{background: 'rgba(255,255,255,0.68)', borderRadius: '0px',textTransform: 'none',minWidth:'100px',maxWidth:'100px',color:'black'}} className="p-1 fw-bold" variant="contained"> Week 7 </Button></Row>
                <Row className="p-2 my-2" style={{maxWidth:'100px'}}><Button style={{background: 'rgba(255,255,255,0.68)', borderRadius: '0px',textTransform: 'none',minWidth:'100px',maxWidth:'100px',color:'black'}} className="p-1 fw-bold" variant="contained"> Week 8 </Button></Row>
                <Row className="p-2 my-2" style={{maxWidth:'100px'}}><Button style={{background: 'rgba(255,255,255,0.68)', borderRadius: '0px',textTransform: 'none',minWidth:'100px',maxWidth:'100px',color:'black'}} className="p-1 fw-bold" variant="contained"> Week 9 </Button></Row>
                <Row className="p-2 my-2" style={{maxWidth:'100px'}}><Button style={{background: 'rgba(255,255,255,0.68)', borderRadius: '0px',textTransform: 'none',minWidth:'100px',maxWidth:'100px',color:'black'}} className="p-1 fw-bold" variant="contained"> Week 11 </Button></Row>
                <Row className="p-2 my-2" style={{maxWidth:'100px'}}><Button style={{background: 'rgba(255,255,255,0.68)', borderRadius: '0px',textTransform: 'none',minWidth:'100px',maxWidth:'100px',color:'black'}} className="p-1 fw-bold" variant="contained"> Week 12 </Button></Row>
                <Row className="p-2 my-2" style={{maxWidth:'100px'}}><Button style={{background: 'rgba(255,255,255,0.68)', borderRadius: '0px',textTransform: 'none',minWidth:'100px',maxWidth:'100px',color:'black'}} className="p-1 fw-bold" variant="contained"> Week 13 </Button></Row>
              </Col>
              <Col>
                <Row className="p-2 my-2" style={{maxWidth:'100px'}}><Button style={{background: 'rgba(255,255,255,0.68)', borderRadius: '0px',textTransform: 'none',minWidth:'100px',maxWidth:'100px',color:'black'}} className="p-1 fw-bold" variant="contained"> Week 14 </Button></Row>
                <Row className="p-2 my-2" style={{maxWidth:'100px'}}><Button style={{background: 'rgba(255,255,255,0.68)', borderRadius: '0px',textTransform: 'none',minWidth:'100px',maxWidth:'100px',color:'black'}} className="p-1 fw-bold" variant="contained"> Week 15 </Button></Row>
                <Row className="p-2 my-2" style={{maxWidth:'100px'}}><Button style={{background: 'rgba(255,255,255,0.68)', borderRadius: '0px',textTransform: 'none',minWidth:'100px',maxWidth:'100px',color:'black'}} className="p-1 fw-bold" variant="contained"> Week 16 </Button></Row>
                <Row></Row>
                <Row></Row>
                <Row></Row>
              </Col>
            </Row>
          </Col>
          <Col>
            <TextField
                hiddenLabel
                fullWidth
                id="filled-hidden-label-small"
                placeholder='Write here...'
                variant="outlined"
                multiline
                rows={17}
                style={{background: 'rgba(255,255,255,0.67)'}}
              />
          </Col>
        </Row>
        <Row className='mt-2'>
          <Col>
            <Button style={{background: '#253B63'}} component={Link} to="/CourseKeyIndicatersSecond" variant="contained"> Previous </Button>
          </Col>
          <Col>
            <Button style={{background: '#253B63', float: 'right'}} component={Link} to="/CourseReflectionForm" variant="contained"> Next </Button>
          </Col>
        </Row>
       
      </Container> 
      </Box>
    </div>
  )
}
