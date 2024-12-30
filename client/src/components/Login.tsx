import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import type { User } from '../models/User';
import LookoverthereLogo1 from '../assets/LookoverthereLogo1.jpg';
import '../Styles/login.css' 

const Login = () => {
  const [userFormData, setUserFormData] = useState<User>({ username: '', email: '', password: '', savedLocations: [] });
  
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [login] = useMutation(LOGIN_USER);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
 
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
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
    <img src={LookoverthereLogo1} alt="LookHere!!!" className="nav-logo" />
    <h2>Log in to your account!</h2>
      <form onSubmit={handleFormSubmit}>

         <div className='form'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            className="log-in"
            value={userFormData.email || ''}
            required
          />
         
        </div>

        <div className='form'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            className="log-in"
            value={userFormData.password || ''}
            required
          />
        
        </div>
        <button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          className="log-in"
          >
          Submit
        </button>
      </form>
      
      {showAlert && (
      <div style={{ color: 'red' }}>
        Something went wrong with your signup!
        <button onClick={() => setShowAlert(false)}>Close</button>
      </div>
        )}
    </>
  );
};

export default Login;
