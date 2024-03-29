import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie } from '../assets/getCoookies';
export const CourseFolder = () => {
  const navigate = useNavigate();
  const [sharedDriveLink, setSharedDriveLink] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLinkSaved, setIsLinkSaved] = useState(false);
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [selectedCourseID, setSelectedCourseID] = useState('');

  const handleLinkChange = (event) => {
    setSharedDriveLink(event.target.value);
  };

  // To get Role
  useEffect(() => {
    const checkRole = () => {
      const url = `${process.env.REACT_APP_SERVER_IP}/getRoleAndData/`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setRole(data.role);
        })
        .catch(error => console.error(error));
    };
    checkRole();
  }, []);

  // To get the Course ID selected in the first page
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_IP}/get_selected_course_id/`)
      .then(response => response.json())
      .then(data => {
        setSelectedCourseID(data.selected_course_id);
      })
      .catch(error => {
        console.error('Error fetching selected course ID:', error);
      });
  }, []);




  const saveToDB = () => {
    if (selectedCourseID) {
      const postData = JSON.stringify({
        link: sharedDriveLink,
        courseId: selectedCourseID
      });
      const csrftoken = getCookie('csrftoken');

      fetch(`${process.env.REACT_APP_SERVER_IP}/SaveLink/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,

        },
        body: postData
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setIsLinkSaved(true);
          } else {
            setIsLinkSaved(false);
          }
          setShowConfirmation(true);
        })
        .catch(error => {
          console.error('Error saving data:', error);
        });
    }
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    saveToDB();
  };




  // Get the existing Data
  useEffect(() => {
    if (selectedCourseID) {
      const getExistingLink = () => {
        fetch(`${process.env.REACT_APP_SERVER_IP}/SaveLink/?courseId=${selectedCourseID}`)
          .then(response => response.json())
          .then(data => {
            setSharedDriveLink(data.link);
          })
          .catch(error => {
            console.error('Error getting existing link:', error);
          });
      };

      getExistingLink();
    }
  }, [selectedCourseID]);




  const nextPage = () => {
    navigate('/CourseKeyIndicatersSecond');
  };

  const previousePage = () => {
    navigate('/CourseKeyIndicaters');

  }



  const openLink = () => {
    window.open(sharedDriveLink.includes('http') ? sharedDriveLink : `https://${sharedDriveLink}`, '_blank');
  };

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
            disabled={role === 'Reviewer'}
          >
            Submit
          </Button>
          {showConfirmation && (
            <Alert variant={isLinkSaved ? 'success' : 'danger'} style={{ marginTop: '10px', width: '300px' }}>
              {isLinkSaved ? 'Link saved successfully!' : 'Failed to save link.'}
            </Alert>
          )}
          <Button
            onClick={nextPage}
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
            Next
          </Button>
          <Button
            onClick={previousePage}
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
            Previouse
          </Button>
          <Button
            onClick={openLink}
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
            Open URL
          </Button>
        </Form>
      </Row>
    </div>
  );
};
