import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const name = sessionStorage.getItem('name');

  const logout = () => {
    sessionStorage.clear();
    navigate('/app');
    window.location.reload();
  };

  return (
    <nav>
      <Link to="/"><strong>GiftLink</strong></Link>
      <Link to="/app">Gifts</Link>
      <Link to="/app/search">Search</Link>
      <span className="spacer" />
      {name ? (
        <>
          <span>Welcome, {name}</span>
          <a href="#logout" onClick={logout}>Logout</a>
        </>
      ) : (
        <>
          <Link to="/app/login">Login</Link>
          <Link to="/app/register">Register</Link>
        </>
      )}
    </nav>
  );
}
