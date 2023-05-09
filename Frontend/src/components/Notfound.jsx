import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container className="text-center" style={{marginTop: '1rem'}}>
      <Row>
        <Col>
          <h1>404 - Page Not Found</h1>
          <p>The requested page does not exist.</p>
          <Button href="/login" variant="primary">Go back to Login</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
