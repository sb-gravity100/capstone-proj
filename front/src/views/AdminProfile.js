import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import ReactTimeago from 'react-timeago';
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
   Modal,
   ModalBody,
   ModalHeader,
} from 'reactstrap';
import PostAnnouncement from '../components/PostAnnouncement';

function Admin() {
   const [announcements, setAnnouncements] = useState([]);
   const [isOpen, setOpen] = useState(false);
   const [user, setUser] = useState({});
   const toggle = () => setOpen(!isOpen);
   const logout = () => {
      setUser({});
      axios.get('/auth/logout').then((e) => {
         localStorage.removeItem('token');
         localStorage.removeItem('user');

         window.location.href = '/';
      });
   };
   useEffect(() => {
      if (!localStorage.getItem('token')) {
         window.location.href = '/';
      }
      var _user = JSON.parse(localStorage.getItem('user'));
      console.log(_user);
      setUser(_user);
      axios
         .get('/api/announcements?authorID=' + (_user?._id || ''))
         .then((res) => {
            console.log(res.data);
            setAnnouncements(res.data);
         })
         .catch(console.log);
   }, []);
   return (
      <>
         <Modal fullscreen isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Post Announcement</ModalHeader>
            <ModalBody>
               <PostAnnouncement toggleModal={toggle} />
            </ModalBody>
         </Modal>
         <Container className="mt-2">
            <Row className="bg-light p-4 rounded mb-4">
               <Col>
                  <img src="/assets/profile-placeholder.jpg" alt="" />
               </Col>
               <Col lg={8}>
                  <div className="h2">
                     {user?.firstName} {user?.lastName}
                  </div>
                  <div className="lead">{user?.username}</div>
                  <div className="">{user?.IDNumber}</div>
               </Col>
               <Col>
                  <Button className="mb-2" onClick={logout} block color="dark">
                     Logout
                  </Button>
                  <Button onClick={toggle} color="primary" block>
                     Post
                  </Button>
               </Col>
            </Row>
            <Row className="bg-light p-4 rounded mb-2">
               <Col xxl={12}>
                  <h1 className="text-center">Posts</h1>
               </Col>
            </Row>
            {announcements?.map((a) => (
               <Row key={a._id}>
                  <Col className=" my-2">
                     <Card>
                        <CardBody>
                           <CardTitle tag="h5">
                              <NavLink
                                 className="d-inline-block"
                                 href={'/' + a._id}
                              >
                                 <span className="text-primary">{a.title}</span>
                              </NavLink>{' '}
                              {a.tags.map((e, i) => (
                                 <Button
                                    key={i}
                                    className="p-1 mx-1"
                                    color="dark"
                                 >
                                    {e}
                                 </Button>
                              ))}
                           </CardTitle>
                           <NavLink href={'/' + a._id}>
                              <CardSubtitle className="text-muted">
                                 <ReactTimeago date={a.createdAt} /> by{' '}
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
      </>
   );
}

export default Admin;
