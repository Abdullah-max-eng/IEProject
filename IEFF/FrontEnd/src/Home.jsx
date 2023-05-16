import React from 'react';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { NavBarTop } from './NavBarTop.jsx';
import Stack from 'react-bootstrap/Stack';
import { Row } from 'react-bootstrap';

export const Home = () => {

  return (
    <div>
      <Box sx={{ height: '100vh' }}>
        <NavBarTop />
        <Container className="mh-100">
          <Row />
          <div style={{ height: '30vh' }}></div>
          <Row>
            <Stack
              direction="horizontal"
              className="d-flex align-items-center  justify-content-center text-center"
              gap={3}
            >
              <Button
                sx={{ textTransform: 'none' }}
                className="p-3 opacity-75 fs-4 fw-bold"
                component={Link}
                to={{
                  pathname: '/Instructions'
                }}
                variant="contained"
              >
                Course Review Template
              </Button>
              <Button
                sx={{ textTransform: 'none' }}
                className="p-3 opacity-75 fs-4 fw-bold"
                component={Link}
                to="/UnderConstruction"
                variant="contained"
              >
                Strategic Planning KPIs
              </Button>
              <Button
                sx={{ textTransform: 'none' }}
                className="p-3 opacity-75 fs-4 fw-bold"
                component={Link}
                to="/UnderConstruction"
                variant="contained"
              >
                Academic Program Review
              </Button>
            </Stack>
          </Row>
     
        </Container>
      </Box>
    </div>
  );
};
