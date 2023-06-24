import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Navbar from 'react-bootstrap/Navbar';
import reactLogo from './barLogo.png'
export const NavBarTop = () => {
    return (
        <div>
            <Navbar>
                <Container>
                    <Navbar.Brand ><img
                        src={reactLogo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                        alt="logo"
                        style={{ borderRadius: '12px' }}
                    />
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text class="fs-3 fw-bold">
                            Institutional Effectiveness Dashboard
                        </Navbar.Text>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Alert variant="success" style={{ marginBottom: '0', padding: '8px 8px' }}><span class="fs-6 fw-bold">username</span></Alert>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
