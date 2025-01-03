import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { ChangeEvent, FormEvent } from 'react';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import type { User } from '../models/User';
import LookoverthereLogo1 from '../assets/LookoverthereLogo1.jpg';
import LoginGif from '../assets/planegif.webp'; // Import the GIF
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
    <Link to="/">
      <img src={LookoverthereLogo1} alt="LookHere!!!" className="nav-logo" />
    </Link>
    <h2>Welcome Back!</h2>
        <p className="welcome-message">It's time to continue your adventure!</p>
        <img src={LoginGif} alt="Login GIF" className="login-gif" />
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
        Something went wrong with your login! Try again!
      </div>
        )}
    </>
  );
};

export default Login;
