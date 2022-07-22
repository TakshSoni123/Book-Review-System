import React, { useState } from 'react';
import Axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/test")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  const [usernameReg, setUserNameReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('')
  const [rePasswordReg, setRePasswordReg] = useState('')

  const register = () => {
    Axios.post('http://localhost:3001/register', { username: usernameReg, password: passwordReg, repassword: rePasswordReg }).then((response) => {
      console.log(response);
    });
  }

  return (
    <div className="App">
      <div className='register'>
        <h1>Sign-up</h1>

        <label>Username</label>
        <input type="text" onChange={(e) => {
          setUserNameReg(e.target.value);
        }}></input>

        <label>Password</label>
        <input type="password" onChange={(e) => {
          setPasswordReg(e.target.value);
        }}></input>

        <label>Re-type Password</label>
        <input type="password" onChange={(e) => {
          setRePasswordReg(e.target.value);
        }}></input>

        <button onClick={register}> Register </button>
      </div>
      <div className='login'>
        <h1>Login</h1>
        <input type="text" placeholder="Username..."></input>
        <input type="password" placeholder="Password..."></input>
        <button>Login</button>
      </div>
    </div>
  );
}

export default App;
