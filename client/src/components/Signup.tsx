import { useState } from 'react';
import clouds from '../assets/clouds.png';
import { Link } from 'react-router-dom';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import '../Styles/login.css' 

// //import { createUser } from '../utils/API';
 import Auth from '../utils/auth';
 import type { User } from '../models/User';
 import signuppisa from '../assets/signuppisa.jpg';
 import LookoverthereLogo1 from '../assets/LookoverthereLogo1.jpg';

//const SignupForm = () => {
const Signup = () => {
  const navigate = useNavigate();
  // set initial form state
  const [userFormData, setUserFormData] = useState<User>({ username: '', email: '', password: '', savedLocations: [] });
  // set state for alert
  //const [error, setError] = useState('');
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

  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //setError('')

    try {
      const { username, email, password } = userFormData; 
      //console.log(username, email, password, "Line 49")
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
    } 
      // Reset form state regardless of success or failure
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
     {/* This is needed for the validation functionality above */}
     <h2>Sign up for your account!</h2>
     <div className="clouds">
        <img src={clouds} alt="clouds" />
      </div>
     <div className="image-container">
        <img src={signuppisa} alt="Signup" className="signup-image left" />
        <img src={signuppisa} alt="Signup" className="signup-image right" />
      </div>
     <form onSubmit={handleFormSubmit}>

      <div className='form'>
        <label htmlFor='username'>Username</label>
        <div className="clouds">
        <img src={clouds} alt="clouds" />
      </div>
        <input
          type='text'
          placeholder='Your username'
          name='username'
          onChange={handleInputChange}
          className="log-in"
          value={userFormData.username}
          required
        />
      </div>
      <div className='form'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          placeholder='Your email address'
          name='email'
          onChange={handleInputChange}
          className="log-in"
          value={userFormData.email}
          required
        />
        {/*userFormData.email === '' && <span style={{ color: 'red' }}>Email is required!</span>*/}
      </div>

      <div className='form'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          placeholder='Your password'
          name='password'
          onChange={handleInputChange}
          className="log-in"
          value={userFormData.password}
          required
        />
      </div>

      <button
        disabled={!(userFormData.username && userFormData.email && userFormData.password)}
        type='submit'
        className="log-in"
      >
        Submit
      </button>
      
      {showAlert && (
      <div style={{ color: 'red' }}>
        Something went wrong with your signup!
      </div>
      )}
    </form>
    </>
  );
};

export default Signup;
