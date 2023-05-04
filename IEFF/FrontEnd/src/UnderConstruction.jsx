import React from 'react'
import Button from '@mui/material/Button';
import {
  Link
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavBarTop } from './NavBarTop.jsx'
import { Row, Col } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
export const UnderConstruction = () => {
  return (
    <div>
        <Box sx={{  height: '100vh' }}>
        <NavBarTop/>
        <Container fixed>
        <div className="d-flex align-items-center justify-content-center">
            <Col>
            <Row style={{height: '10vh'}}></Row>
            <Row style={{height: '40vh'}}>
            <Alert style={{background: 'rgba(255,255,255,0.2)', padding: '15vh 0', borderRadius: '16px' }} className="fs-3 fw-bold text-center" variant="dark">
                <span >Under Construction...</span>
            </Alert>
            </Row>
            <Row style={{maxWidth: '100px'}} className="d-flex justify-content-center">
                <Button style={{background: '#253B63'}} component={Link} to="/Dashboard" variant="contained"> go back</Button>
            </Row>
            </Col>
            </div>
        </Container>
      </Box>
    </div>
  )
}
