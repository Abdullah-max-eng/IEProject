import React, { useState, useEffect } from 'react';
import { createBrowserHistory } from 'history';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavBarTop } from './NavBarTop.jsx';
import Form from 'react-bootstrap/Form';
import { Row } from 'react-bootstrap';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from 'react-loading';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Reviewer');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const url = 'http://127.0.0.1:8000/loginHandler/';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        role: role,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          navigate('/Dashboard', { state: { role: role } });
          toast.success(data.success);
        } else {
          toast.error(data.error);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setIsLoading(false);
        toast.error('Server is down. Please try again later.');
      });
  };

  return (
    <div>
      <Box sx={{ height: '100vh' }}>
        <NavBarTop />
        <Container fixed>
          <Row className="fs-3 fw-bold d-flex justify-content-center">Login</Row>
          <Row className="fs-4 fw-bold d-flex justify-content-center">Have an account?</Row>
          <Row className="d-flex justify-content-center">
            <Box sx={{ width: '40vh' }}>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <FormControl sx={{ minWidth: 120 }} className="mb-3">
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <MenuItem value="Reviewer">Reviewer</MenuItem>
                    <MenuItem value="Professor">Professor</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  style={{ background: '#253B63' }}
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loading type="spin" color="#FFF" height={20} width={20} />
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </Form>
              <a href="http://google.com" style={{ color: '#000000' }} className="fw-bold">
                Forget Password
              </a>
            </Box>
          </Row>
        </Container>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} />
    </div>
  );
};
