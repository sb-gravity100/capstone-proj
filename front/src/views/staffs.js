import React, { useMemo } from 'react';
import { Container, Row, List, Col, Card, CardHeader } from 'reactstrap';

function Staffs() {
   const staffList = useMemo(
      () => [
         {
            name: 'Supreme Student Government',
            members: [
               'Gerrald Catalon',
               'Mary Irish Joy P. Catalon',
               'Magdalena Espela',
               'Jazel Talha',
            ],
         },
         {
            name: 'Junior Emergency Response Team (JERT)- DRRM',
            members: ['Christer John Labajo', 'Brian Jee Burlaos'],
         },
         {
            name: 'NDEP-BKD',
            members: ['Jennifer Deslate'],
         },
         {
            name: "Youth for Environment Schools' Organization (YES-O)",
            members: ['Rugie Joy O. Madrones', 'Rose Ann P. De Castro'],
         },
         {
            name: 'Junior Media Arts Guild (JMAG)',
            members: ['Denver Talha'],
         },
      ],
      []
   );
   return (
      <>
         <Container>
            <Row>
               <h2 className="text-center p-4 bg-info mt-4 rounded-2">
                  Organizations
               </h2>
            </Row>
            {staffList.map((staff) => (
               <Row>
                  <div className="bg-light border-dark border-5 rounded-2 p-4 my-4">
                     <div className="h3">{staff.name}</div>
                     <Container fluid>
                        <Row>
                           {staff.members.map((mem) => (
                              <Col>
                                 <Card style={{ width: '220px' }}>
                                    <CardHeader tag="h6">{mem}</CardHeader>
                                    <img
                                       src="/assets/profile-placeholder.jpg"
                                       alt="profile"
                                    />
                                 </Card>
                              </Col>
                           ))}
                        </Row>
                     </Container>
                  </div>
               </Row>
            ))}
         </Container>
      </>
   );
}
export default Staffs;
