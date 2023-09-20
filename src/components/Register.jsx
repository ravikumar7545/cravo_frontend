import React, { useState } from 'react';
import '../scss/register.scss';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { usePizzaContext } from '../PizzaContext';
import jwt_decode from 'jwt-decode';
const Login = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser, setCart } = usePizzaContext();

  const registerUser = async () => {
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{3,20}$/;
    if (username === '' || password === '' || fullName === '') {
      toast.error('All fields required');
      return;
    }
    if (usernameRegex.test(username) === false) {
      if (username.length < 4) {
        toast.error('Username must be at least 4 characters');
      } else if (isNaN(parseInt(username[0])) === false) {
        toast.error('Username first character should not be a number');
      } else {
        toast.error('Invalid username. Try different username');
      }
      return;
    }

    const registerUserResponse = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/register`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ username, password, fullName }),
      }
    );
    const registerUserResponseJSON = await registerUserResponse.json();
    const { success, token, message, cartProduct } = registerUserResponseJSON;
    if (success) {
      toast.success(message);
      localStorage.setItem('foody_token', token);
      const { username, fullName } = jwt_decode(token);
      setUser({ username: username, fullName: fullName });
      setCart(cartProduct.product);
      navigate('/');
    } else {
      toast.error(message);
    }
  };
  return (
    <div className="register-container">
      <img
        className="background-image"
        src={require('../images/pizza/chicago.jpg')}
        alt="background-login-page"
      />
      <div className="register-box">
        <h2>Register</h2>

        <div className="label-box">
          <label htmlFor="fullname">Full Name</label>
          <img
            className="label-box-gif"
            src={require('../images/icons8-username.gif')}
            alt="chotu"
          />
          <input
            type="text"
            name="fullname"
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter FullName"
            autoComplete="off"
          />
        </div>
        <div className="label-box">
          <label htmlFor="username">Username</label>
          <img
            className="label-box-gif"
            src={require('../images/icons8-username.gif')}
            alt="chotu"
          />
          <input
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            autoComplete="off"
          />
        </div>

        <div className="label-box">
          <label htmlFor="password">Password</label>
          <img
            className="label-box-gif"
            src={require('../images/icons8-password-64.png')}
            alt="chotu"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={registerUser}>Register</button>
        <p>
          Already a User?<Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
