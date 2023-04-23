import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import {
   Button,
   Card,
   CardBody,
   CardSubtitle,
   CardText,
   CardTitle,
   Col,
   Container,
   NavLink,
   Row,
} from 'reactstrap';

function Announcements() {
   const [announcements, setAnnouncements] = useState([]);
   const [params, setParams] = useSearchParams();
   useEffect(() => {
      axios
         .get('/api/announcements', {
            params: {
               tags: params.get('tags'),
            },
         })
         .then((res) => {
            setAnnouncements(res.data);
         })
         .catch(console.log);
   }, [params]);
   return (
      <Container>
         <Row>
            <Col
               className="py-4 my-2 bg-primary text-light rounded"
               lg={{
                  size: 8,
                  offset: 2,
               }}
            >
               <h1 className="text-center">Announcements</h1>
            </Col>
         </Row>
         {announcements.map((a) => (
            <Row key={a._id}>
               <Col
                  lg={{
                     size: 8,
                     offset: 2,
                  }}
                  className=" my-2"
               >
                  <Card>
                     <CardBody>
                        <CardTitle tag="h5">
                           <NavLink
                              className="d-inline-block"
                              href={'/' + a._id}
                           >
                              {a.title}
                           </NavLink>{' '}
                           {a.tags.map((e, i) => (
                              <Button
                                 key={i}
                                 color="info"
                                 className="d-inline py-0 px-1 mx-1 "
                                 onClick={() => {
                                    setParams((f) => {
                                       f.set('tags', e);
                                       return f;
                                    });
                                 }}
                              >
                                 {e}
                              </Button>
                           ))}
                        </CardTitle>
                        <NavLink href={'/' + a._id}>
                           <CardSubtitle className="text-muted">
                              <TimeAgo date={a.createdAt} /> by{' '}
                              {a.authorID.firstName} {a.authorID.lastName}
                           </CardSubtitle>
                           <CardText>{a.body.substring(0, 200)}...</CardText>
                        </NavLink>
                        <Button color="light">&#128077; {a.likes}</Button>
                     </CardBody>
                  </Card>
               </Col>
            </Row>
         ))}
      </Container>
   );
}
export default Announcements;
