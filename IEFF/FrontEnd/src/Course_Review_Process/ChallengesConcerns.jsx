import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { NavBarTopProcess } from '../NavBarTopProcess.jsx';
import { Row, Col, Table } from 'react-bootstrap';
import './ChallengesConcerns.css';

export const ChallengesConcerns = () => {



  const initialConcernsData = [
    { id: 1, challengerConcern: '', term: '' },
    { id: 2, challengerConcern: '', term: '' },
    { id: 3, challengerConcern: '', term: '' }
  ];




  const [concernsData, setConcernsData] = useState(initialConcernsData);





  const handleInputChange = (id, column, value) => {
    setConcernsData(prevData =>
      prevData.map(item => {
        if (item.id === id) {
          return { ...item, [column]: value };
        }
        return item;
      })
    );
  };






  
  const saveData = () => {
    // Print the data in the console
    console.log(concernsData);
    // Additional logic to send the data to the Django server can be added here
  };







  const resetForm = () => {
    setConcernsData(initialConcernsData);
  };






  return (
    <div>
      <Box sx={{ height: '100vh' }}>
        <NavBarTopProcess />
        <Container fixed>
          <Row className="fs-4 fw-bold d-flex justify-content-center">Challenges & Concerns</Row>
          <Row>
            <b className="oneandhalf oneandhalfmargin">
              Please share any challenges or concerns you had during the semester related to students' background and attitude, facilities, or other relevant services and provide preferred solutions.
            </b>
          </Row>
          <Row>
            <Table className="challenges-table" bordered>
              <thead>
                <tr>
                  <td></td>
                  <td className="header-cell" colSpan={2}>
                    <b className="table-header">Challenges and concerns to be discussed<br /><br />with the Course Team, Chairs, and the VPAA</b>
                  </td>
                </tr>
                <tr>
                  <td className="number-cell"><b>#</b></td>
                  <td className="concerns-cell"><b>Challenges & Concerns</b></td>
                  <td className="term-cell"><b>Term (e.g., Fall 2021)</b></td>
                </tr>
              </thead>
              <tbody>
                {concernsData.map(item => (
                  <tr key={item.id}>
                    <td className="number-cell"><b>{item.id}</b></td>
                    <td className="concerns-cell">
                      <textarea
                        value={item.challengerConcern}
                        onChange={e => handleInputChange(item.id, 'challengerConcern', e.target.value)}
                        className="textarea-field"
                      />
                    </td>
                    <td className="term-cell">
                      <textarea
                        value={item.term}
                        onChange={e => handleInputChange(item.id, 'term', e.target.value)}
                        className="textarea-field"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
          <Row>
            <Col>
              <Button style={{ background: '#253B63' }} component={Link} to="/CourseImprovementPlan" variant="contained">Previous</Button>
            </Col>
            <Col>
              <Button style={{ background: '#253B63', float: 'right' }} onClick={saveData} variant="contained">Save and Next</Button>
              <Button style={{ background: '#253B63', float: 'right', marginRight: '10px' }} onClick={resetForm} variant="contained">Reset</Button>
            </Col>
          </Row>
        </Container>
      </Box>
    </div>
  );
};
