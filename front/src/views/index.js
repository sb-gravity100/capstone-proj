import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import FrontCard from '../components/FrontCard';

function index() {
   return (
      <>
         <div
            className="position-absolute"
            style={{
               background: "url('/assets/capstone/IMG_0367.jpg')",
               top: 0,
               left: 0,
               height: '100vh',
               width: '100%',
               backgroundPosition: 'center',
               backgroundSize: 'cover',
               zIndex: -1,
               mixBlendMode: 'overlay',
            }}
         ></div>
         <div
            className="position-absolute"
            style={{
               background: '#222',
               top: 0,
               left: 0,
               height: '100vh',
               width: '100%',
               backgroundPosition: 'center',
               backgroundSize: 'cover',
               zIndex: -10,
            }}
         ></div>
         <Container>
            <Row>
               <Col>
                  <h1 className="text-light text-center mt-5 display-3">
                     Welcome to MDNHS
                  </h1>
               </Col>
            </Row>
         </Container>
      </>
   );
}

export default index;
