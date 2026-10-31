import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';

const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
const conditions = ['New', 'Like New', 'Older'];

export default function SearchPage() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const search = async () => {
    const params = new URLSearchParams({ name, category, condition });
    const response = await fetch(`${urlConfig.backendUrl}/api/gifts/search?${params.toString()}`);
    setResults(await response.json());
    setSearched(true);
  };

  return (
    <div>
      <h2>Search gifts</h2>
      <div className="form">
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={condition} onChange={(e) => setCondition(e.target.value)}>
          <option value="">All conditions</option>
          {conditions.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={search}>Search</button>
      </div>
      {searched && results.length === 0 && <p>No gifts match your criteria.</p>}
      <div className="grid">
        {results.map((gift) => (
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
