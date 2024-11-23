/*
NOT IN USE
*/
// app/register.js
"use client"
import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;