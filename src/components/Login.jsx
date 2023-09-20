import React, { useEffect, useState } from 'react';
import '../scss/login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { usePizzaContext } from '../PizzaContext';
import jwt_decode from 'jwt-decode';
import { motion } from 'framer-motion';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser, setCart } = usePizzaContext();

  const loginUser = async () => {
    if (username === '' || password === '') {
      toast.error('All fields required');
      return;
    }
    const loginUserResponse = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/login`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      }
    );
    const loginUserResponseJSON = await loginUserResponse.json();
    const { success, token, message, cartProduct } = loginUserResponseJSON;
    if (success) {
      toast.success(message);
      localStorage.setItem('foody_token', token);
      const { username, fullName } = jwt_decode(token);
      setUser({ username: username, fullName: fullName });
      setCart(cartProduct);
      navigate('/');
    } else {
      toast.error(message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('foody_token') !== null) {
      navigate('/');
      return;
    }
    // eslint-disable-next-line
  }, []);

  return (
    <motion.div
      initial={{
        x: '-100%',
      }}
      animate={{
        x: 0,
      }}
      className="login-container"
    >
      <img
        className="background-image"
        src={require('../images/pizza/chicago.jpg')}
        alt="background-login-page"
      />

      <div className="login-box">
        <h2>Login</h2>

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

        <button onClick={loginUser}>Login</button>
        <p>
          New User?<Link to="/register"> Register</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
