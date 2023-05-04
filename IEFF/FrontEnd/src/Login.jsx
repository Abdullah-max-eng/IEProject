import React from 'react'
import Button from '@mui/material/Button';
import {
  Link
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavBarTop } from './NavBarTop.jsx'
import Form from 'react-bootstrap/Form';
import { Row } from 'react-bootstrap';
export const Login = () => {
  return (
    <div>
        <Box sx={{  height: '100vh' }}>
        <NavBarTop/>
        <Container fixed>
            <Row className="fs-3 fw-bold d-flex justify-content-center">Login</Row>
            <Row className="fs-4 fw-bold d-flex justify-content-center">Have an account?</Row>
            <Row className="d-flex justify-content-center">
                <Box sx={{  width: '40vh' }}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button style={{background: '#253B63'}} component={Link} to="/Dashboard" variant="contained"> Sign In </Button>
                </Form>
                <a href="http://google.com" style={{color: '#000000'}} className="fw-bold">Forget Password </a> 
                </Box>
            </Row>
            
        </Container>
        </Box>
    </div>
  )
}
