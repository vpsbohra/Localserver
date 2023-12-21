import React, { useState } from 'react';

const PasswordPage = ({ onPasswordSubmit }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onPasswordSubmit(password);
  };

  return (
    <div className='password_page'>
      <form onSubmit={handleSubmit}>
        <h2>Please Enter Your Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PasswordPage;