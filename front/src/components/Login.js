import {
   Form,
   FormGroup,
   Input,
   Label,
   Button,
   Container,
   FormFeedback,
} from 'reactstrap';
import axios from 'axios';
import { setAuthToken } from './setAuthToken';
import { useState } from 'react';

function Login() {
   const [userValid, setUserValid] = useState(false);
   const [passValid, setPassValid] = useState(false);
   const handleSubmit = (userName, password) => {
      setUserValid(false);
      setPassValid(false);
      axios
         .post('/auth/admin/login', { userName, password })
         .then((response) => {
            const token = response.data.token;
            const user = response.data.user;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setAuthToken(token);
            window.location.href = '/';
         })
         .catch((err) => {
            if (err.response.data?.code === 'NOT_FOUND') {
               setUserValid(true);
            }
            if (err.response.data?.code === 'PASSWORD_INCORRECT') {
               setPassValid(true);
            }
         });
   };
   return (
      <Container className="py-4">
         <Form
            onSubmit={(e) => {
               e.preventDefault();
               handleSubmit(e.target[0].value, e.target[1].value);
            }}
         >
            <FormGroup floating>
               <Input
                  id="LoginUsername"
                  name="userName"
                  placeholder="ID Username"
                  type="text"
                  valid
                  invalid={userValid}
               />
               <Label for="LoginUsername">Username</Label>
               <FormFeedback invalid>User not found.</FormFeedback>
            </FormGroup>
            <FormGroup floating>
               <Input
                  id="LoginPassword"
                  name="password"
                  placeholder="ID Username"
                  type="password"
                  valid={userValid && passValid}
                  invalid={passValid}
               />
               <Label for="LoginPassword">Password</Label>
               <FormFeedback invalid>Incorrect password.</FormFeedback>
            </FormGroup>
            <Button color="info" block>
               Login
            </Button>
         </Form>
      </Container>
   );
}

export default Login;
