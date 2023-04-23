import { Card, Container, CardTitle, CardSubtitle, Col, Row } from 'reactstrap';

function FrontCard() {
   return (
      <Container className="mx-auto">
         <Row className="justify-content-between align-items-center">
            <Card style={{ width: '20rem' }} className="p-2 mx-auto mb-sm-4">
               <CardTitle tag="h4">Clean Medical Services!</CardTitle>
               <CardSubtitle tag="h6">Trusted Doctors...</CardSubtitle>
               <img
                  alt="Card cap"
                  src="/assets/capstone/IMG_0370.jpg"
                  width="100%"
                  className="mt-2"
               />
            </Card>
            <Card style={{ width: '20rem' }} className="p-2 mx-auto mb-sm-4">
               <CardTitle tag="h4">Best Arts!</CardTitle>
               <CardSubtitle tag="h6">We offer you the best...</CardSubtitle>
               <img
                  className="mt-2"
                  alt="Card cap"
                  src="/assets/capstone/IMG_0364.jpg"
                  width="100%"
               />
            </Card>
            <Card style={{ width: '20rem' }} className="p-2 mx-auto mb-sm-4">
               <CardTitle tag="h4">Learning!</CardTitle>
               <CardSubtitle tag="h6">Hardworking Teachers...</CardSubtitle>
               <img
                  className="mt-2"
                  alt="Card cap"
                  src="/assets/capstone/IMG_0374.jpg"
                  width="100%"
               />
            </Card>
         </Row>
      </Container>
   );
}

export default FrontCard;
