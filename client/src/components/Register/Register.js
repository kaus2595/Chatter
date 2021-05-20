import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Register.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Chatter</h1>
        <div>
          <input placeholder="Email" className="joinInput" type="text" onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div>
          <input placeholder="Password" className="joinInput mt-20" type="text" onChange={(event) => setPassword(event.target.value)} />
        </div>
        <div>
          <input placeholder="Confirm Password" className="joinInput mt-20" type="text" onChange={(event) => setConfirmPassword(event.target.value)} />
        </div>
        <div>
          <input placeholder="Username" className="joinInput mt-20" type="text" onChange={(event) => setUsername(event.target.value)} />
        </div>
        <Link onClick={e => (!email || !password) ? e.preventDefault() : null} to={`/register`}>
          <button className={'button mt-20'} type="submit">Register</button>
        </Link>
        <Link to={`/`}>
          <button className={'button mt-20'} type="submit">Back</button>
        </Link>
      </div>
    </div>
  );
}