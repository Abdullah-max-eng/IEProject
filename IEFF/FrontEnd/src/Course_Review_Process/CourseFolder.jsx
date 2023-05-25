import React, { useState } from 'react';
import { Button, Form, Row, Alert } from 'react-bootstrap';

export const CourseFolder = () => {


  
  const [sharedDriveLink, setSharedDriveLink] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLinkSaved, setIsLinkSaved] = useState(false);





  const handleLinkChange = (event) => {
    setSharedDriveLink(event.target.value);
  };






  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the entered shared drive link
    // saveLinkToDatabase(sharedDriveLink);
    setShowConfirmation(true); // Display the confirmation message without performing the database operation
    setIsLinkSaved(true); // Indicate a successful save without performing the database operation
  };

  // Uncomment the following code to perform the database operation
  // const saveLinkToDatabase = (link) => {
  //   // Simulate the database operation
  //   setTimeout(() => {
  //     // Simulating a successful save
  //     setIsLinkSaved(true);
  //     setShowConfirmation(true);
  //     setSharedDriveLink('');
  //   }, 1500);
  // };






  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Row className="p-1">
        <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Form.Group controlId="sharedDriveLink">
            <Form.Label className="fw-bold">Enter your shared drive link:</Form.Label>
            <Form.Control
              type="text"
              placeholder="https://drive.google.com/..."
              value={sharedDriveLink}
              onChange={handleLinkChange}
              style={{
                width: '500px',
                height: '40px',
                borderRadius: '12px',
              }}
            />
          </Form.Group>
          <Button
            type="submit"
            style={{
              background: '#253B63',
              borderRadius: '12px',
              textTransform: 'none',
              minWidth: '286px',
              maxWidth: '286px',
              marginTop: '10px',
            }}
            className="p-0 fw-bold"
            variant="contained"
          >
            Submit
          </Button>
          {showConfirmation && (
            <Alert variant={isLinkSaved ? 'success' : 'danger'} style={{ marginTop: '10px', width: '300px' }}>
              {isLinkSaved ? 'Link saved successfully!' : 'Failed to save link.'}
            </Alert>
          )}
        </Form>
      </Row>
    </div>
  );
};
