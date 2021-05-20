import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

export default function SignIn() {
  const [email, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Chatter</h1>
        <div>
          <input placeholder="Email" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Password" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link onClick={e => (!email || !room) ? e.preventDefault() : null} to={`/chat?email=${email}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
        <Link to={`/register`}>
          <button className={'button mt-20'} type="submit">Register</button>
        </Link>
      </div>
    </div>
  );
}