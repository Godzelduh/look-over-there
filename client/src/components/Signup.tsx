import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

// //import { createUser } from '../utils/API';
 import Auth from '../utils/auth';
 import type { User } from '../models/User';

//const SignupForm = () => {
const Signup = () => {
  const navigate = useNavigate();
  // set initial form state
  const [userFormData, setUserFormData] = useState<User>({ username: '', email: '', password: '', savedLocations: [] });
  // set state for form errors
  const [formErrors, setFormErrors] = useState<{ username?: string; email?: string; password?: string }>({});
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [
      GET_ME,
      'me'
    ]
  });
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors: { username?: string; email?: string; password?: string } = {};
    if (!userFormData.username) errors.username = 'Username is required!';
    if (!userFormData.email) errors.email = 'Email is required!';
    if (!userFormData.password) errors.password = 'Password is required!';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const { username, email, password } = userFormData; 
      console.log(username, email, password, "Line 49")
      const { data } = await createUser({
        variables: { input: { username, email, password }}
      });
      console.log(data)
      
      if (!data) {
        throw new Error('something went wrong!');
      }

      const { token } = data.createUser;
      console.log(token)
      Auth.login(token);
      navigate('/login')
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    } finally {
      // Reset form state regardless of success or failure
      setUserFormData({
        username: '',
        email: '',
        password: '',
        savedLocations: [],
      });
    }
  };

  return (
    <>
     {/* This is needed for the validation functionality above */}
     <form onSubmit={handleFormSubmit}>
      {showAlert && (
        <div style={{ color: 'red' }}>
          Something went wrong with your signup!
          <button onClick={() => setShowAlert(false)}>Close</button>
        </div>
      )}

      <div className='form-group'>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          placeholder='Your username'
          name='username'
          onChange={handleInputChange}
          value={userFormData.username}
          required
        />
        {userFormData.username === '' && <span style={{ color: 'red' }}>Username is required!</span>}
      </div>

      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          placeholder='Your email address'
          name='email'
          onChange={handleInputChange}
          value={userFormData.email}
          required
        />
        {userFormData.email === '' && <span style={{ color: 'red' }}>Email is required!</span>}
      </div>

      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          placeholder='Your password'
          name='password'
          onChange={handleInputChange}
          value={userFormData.password}
          required
        />
        {userFormData.password === '' && <span style={{ color: 'red' }}>Password is required!</span>}
      </div>

      <button
        disabled={!(userFormData.username && userFormData.email && userFormData.password)}
        type='submit'
      >
        Submit
      </button>
    </form>
    </>
  );
};

export default Signup;
