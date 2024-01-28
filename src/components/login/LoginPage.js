import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // try {
    //   const response = await fetch('http://192.168.43.106:8080/login/auth', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ login, motDePasse }),
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log('Login successful:', data);
    //     localStorage.setItem('authToken',data.response.token);
    //     console.log('local storage : '+localStorage.getItem('authToken'));
    //     // Perform any actions upon successful login
    //     navigate('/HomePage', { state: { type: 1 } });
    //   } else {
    //     console.error('Login failed:', response.status, response.statusText);
    //     // Handle login failure
    //   }
    // } catch (error) {
    //   console.error('Error during login:', error.message);
    //   // Handle other errors
    // }

    navigate('/HomePage', { state: { type: 1 } });
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className='input'>
              <input
                type="email"
                id="email"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Email"
                required
              />
            </div>

            <div className='input'>
              <input
                type="password"
                id="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                placeholder="Password"
                required
              />
            </div>

            <button type="submit">Login</button>
          </form>
      </div>
    </div>
  );
};

export default LoginPage;
