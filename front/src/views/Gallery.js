import React, { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Col, Container, Row } from 'reactstrap';

function Gallery() {
   const [images, setImages] = useState([]);

   useEffect(() => {
      const array = [];
      for (let i = 57; i < 77; i++) {
         array.push('/assets/capstone/IMG_03' + i + '.jpg');
      }
      setImages(array);
   }, []);
   return (
      <>
         <Container>
            <Row>
               <Col xs={12} tag="h2" className="mx-auto p-4 bg-light mt-2">
                  Gallery
               </Col>
            </Row>
            <Row className="rounded bg-light p-3 mb-2">
               <ResponsiveMasonry>
                  <Masonry gutter="0.2rem">
                     {images.map((e, i) => (
                        <img key={i} src={e} alt={i} />
                     ))}
                  </Masonry>
               </ResponsiveMasonry>
            </Row>
         </Container>
      </>
   );
}

export default Gallery;
