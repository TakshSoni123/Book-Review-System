import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Welcome from './Welcome';
import Login from './Login.js';
import Signup from './Signup.js';
import Dashboard from './Dashboard.js';

export default () => (
  <>
  <h1>Hello app</h1>
  <Routes>
    <Route exact path="/" element ={<Welcome />}></Route>
    <Route path="/login" element ={<Login />}></Route>
    <Route path="/signup" element ={<Signup />}></Route>
    <Route path="/dashboard" element ={<Dashboard />}></Route>
    </Routes>
  </>
)

