import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { urlConfig } from '../../config';

export default function DetailsPage() {
  const { productId } = useParams();
  const [gift, setGift] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${urlConfig.backendUrl}/api/gifts/${productId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setGift)
      .catch((e) => setError(e.message));
  }, [productId]);

  if (error) return <p className="error">Could not load gift: {error}</p>;
  if (!gift) return <p>Loading...</p>;

  return (
    <div className="card">
      <img src={`${urlConfig.backendUrl}${gift.image}`} alt={gift.name} style={{ maxWidth: 300 }} />
      <h2>{gift.name}</h2>
      <p>{gift.description}</p>
      <p>Category: {gift.category}</p>
      <p>Condition: {gift.condition}</p>
      <p>Age: {gift.age_years} years</p>
      <p>Posted by: {gift.posted_by} (zip {gift.zipcode})</p>
    </div>
  );
}
