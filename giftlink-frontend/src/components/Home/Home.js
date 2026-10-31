import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="hero">
      <h1>Welcome to GiftLink</h1>
      <p>Give away items you no longer need and find gifts from your community.</p>
      <Link className="get-started" to="/app">Get Started</Link>
    </div>
  );
}
