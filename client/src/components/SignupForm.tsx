// import { useState } from 'react';
// import type { ChangeEvent, FormEvent } from 'react';
// import { useMutation } from '@apollo/client';
// import { ADD_USER } from '../utils/mutations';
// import { GET_ME } from '../utils/queries';

// //import { createUser } from '../utils/API';
// import Auth from '../utils/auth';
// import type { User } from '../models/User';

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
const SignupForm = () => {
//const SignupForm = ({}: { handleModalClose: () => void }) => {
//   // set initial form state
//   const [userFormData, setUserFormData] = useState<User>({ username: '', email: '', password: '', savedBooks: [] });
//   // set state for form validation
//   const [validated] = useState(false);
//   // set state for alert
//   const [showAlert, setShowAlert] = useState(false);

//   const [addUser] = useMutation(ADD_USER, {
//     refetchQueries: [
//       GET_ME,
//       'me'
//     ]
//   });
//   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setUserFormData({ ...userFormData, [name]: value });
//   };

//   const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     // check if form has everything (as per react-bootstrap docs)
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }

//     try {
//       const { username, email, password } = userFormData; 
//       const { data } = await addUser({
//         variables: { input: { username, email, password }}
//       });

//       if (!data) {
//         throw new Error('something went wrong!');
//       }

//       const { token } = data.addUser;
//       Auth.login(token);
//     } catch (err) {
//       console.error(err);
//       setShowAlert(true);
//     }

//     setUserFormData({
//       username: '',
//       email: '',
//       password: '',
//       savedBooks: [],
//     });
//   };

  return (
    <>
    <h1>Sign up Form</h1>
    </>
  );
};

export default SignupForm;
