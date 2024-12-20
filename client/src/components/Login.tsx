import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import type { User } from '../models/User';

const Login = () => {
  const [userFormData, setUserFormData] = useState<User>({ username: '', email: '', password: '', savedLocations: [] });
  // set state for form errors
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [login] = useMutation(LOGIN_USER);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors: { email?: string; password?: string } = {};
    if (!userFormData.email) errors.email = 'Email is required!';
    if (!userFormData.password) errors.password = 'Password is required!';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    try {
      const { data } = await login({
        variables: { ...userFormData }
      });

      if (!data) {
        throw new Error('something went wrong!');
      }

      const { token } = await data.login;
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
      savedLocations: [],
    });
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        {showAlert && (
          <div style={{ color: 'red' }}>
            Something went wrong with your signup!
            <button onClick={() => setShowAlert(false)}>Close</button>
          </div>
        )}
         <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email || ''}
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
            value={userFormData.password || ''}
            required
          />
        {userFormData.password === '' && <span style={{ color: 'red' }}>Password is required!</span>}
        </div>
        <button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          >
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
