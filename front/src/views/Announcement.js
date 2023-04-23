import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ReactTimeago from 'react-timeago';
import { Container, Row, Col } from 'reactstrap';

function Announcement() {
   const { data } = useLoaderData();
   console.log(data);
   return (
      <Container className="py-4">
         <Row>
            <Col className="px-4" tag="h2">
               {data.title}
            </Col>
         </Row>
         <Row>
            <Col className="text-muted px-4 mb-4" tag="h6">
               by {data.authorID.firstName} {data.authorID.lastName}{' '}
               <ReactTimeago date={data.createdAt} />
            </Col>
         </Row>
         <Row className="p-4 bg-light rounded">
            <Col className="text-wrap text-break" tag="p">
               {data.body}
            </Col>
         </Row>
      </Container>
   );
}

export default Announcement;
