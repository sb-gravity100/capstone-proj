import React, { useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Select from 'react-select';
import axios from 'axios';

function PostAnnouncement(props) {
   const sections = [
      'Grade 7',
      'Grade 8',
      'Grade 9',
      'Grade 10',
      'Grade 11',
      'Grade 12',
      'STE',
      'TECHVOC',
   ];
   const [sectionChoices, setChoices] = useState([]);
   return (
      <Container className="py-4">
         <Form
            onSubmit={(e) => {
               e.preventDefault();
               var post = {
                  [e.target[0].name]: e.target[0].value,
                  [e.target[1].name]: e.target[1].value,
                  tags: sectionChoices,
               };
               axios
                  .post('/api/announcement', JSON.stringify(post), {
                     headers: { 'Content-Type': 'application/json' },
                  })
                  .then((res) => {
                     props.toggleModal();
                  });
            }}
         >
            <FormGroup floating>
               <Input
                  id="PostTitle"
                  name="title"
                  placeholder="Title"
                  type="text"
                  required
               />
               <Label for="PostTitle">Title</Label>
            </FormGroup>
            <FormGroup floating>
               <Input
                  id="PostBody"
                  name="body"
                  type="textarea"
                  style={{
                     height: '300px',
                  }}
               />
               <Label for="PostBody">Body</Label>
            </FormGroup>
            <FormGroup>
               <Select
                  isMulti
                  name="tags"
                  options={sections.map((e) => ({ value: e, label: e }))}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Tags..."
                  onChange={(e) => setChoices(e.map((a) => a.value))}
               />
            </FormGroup>
            <Button color="primary" block>
               Post
            </Button>
         </Form>
      </Container>
   );
}

export default PostAnnouncement;
