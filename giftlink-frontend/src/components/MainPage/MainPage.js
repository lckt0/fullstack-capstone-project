import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';

export default function MainPage() {
  const [gifts, setGifts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${urlConfig.backendUrl}/api/gifts`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setGifts)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div>
      <h2>All gifts</h2>
      {error && <p className="error">Could not load gifts: {error}</p>}
      <div className="grid">
        {gifts.map((gift) => (
          <div className="card" key={gift.id}>
            <img src={`${urlConfig.backendUrl}${gift.image}`} alt={gift.name} />
            <h3>{gift.name}</h3>
            <p>{gift.category} · {gift.condition}</p>
            <button onClick={() => navigate(`/app/product/${gift.id}`)}>View details</button>
          </div>
        ))}
      </div>
    </div>
  );
}
