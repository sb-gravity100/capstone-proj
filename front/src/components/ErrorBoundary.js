import React from 'react';
import { Container, Row, Col } from 'reactstrap';

function ErrorBoundary() {
   return (
      <Container className="h-100 align-items-center">
         <Row>
            <Col>404 Not Found</Col>
         </Row>
      </Container>
   );
}

export default ErrorBoundary;
