// see SignupForm.js for comments
// import { useState } from 'react';
// import type { ChangeEvent, FormEvent } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';

// //import { loginUser } from '../utils/API';
// import { useMutation } from '@apollo/client';
// import { LOGIN_USER } from '../utils/mutations';
// import Auth from '../utils/auth';
// import type { User } from '../models/User';

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
const LoginForm = () => {
//const LoginForm = ({}: { handleModalClose: () => void }) => {
  // const [userFormData, setUserFormData] = useState<User>({ username: '', email: '', password: '', savedBooks: [] });
  // const [validated] = useState(false);
  // const [showAlert, setShowAlert] = useState(false);

  // const [login] = useMutation(LOGIN_USER);

  // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setUserFormData({ ...userFormData, [name]: value });
  // };

  // const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   // check if form has everything (as per react-bootstrap docs)
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
    
  //   try {
  //     const { data } = await login({
  //       variables: { ...userFormData }
  //     });

  //     if (!data) {
  //       throw new Error('something went wrong!');
  //     }

  //     const { token } = await data.login;
  //     Auth.login(token);
  //   } catch (err) {
  //     console.error(err);
  //     setShowAlert(true);
  //   }

  //   setUserFormData({
  //     username: '',
  //     email: '',
  //     password: '',
  //     savedBooks: [],
  //   });
  // };

  return (
    <>
      <>Login Form</>
    </>
  );
};

export default LoginForm;
