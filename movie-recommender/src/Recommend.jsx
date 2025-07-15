import axios from 'axios';
import { useState } from 'react';

export default function Recommend() {
  const [movie, setMovie] = useState('');
  const [recs, setRecs] = useState([]);
  const [error, setError] = useState('');

  const fetchRecs = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/recommend', { movie });
      setRecs(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
        'An unexpected error occurred'
      );
      setRecs([]);
    }
  };

  return (
    <div>
      <h2>Movie Recommender</h2>
      <form onSubmit={fetchRecs}>
        <input
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          placeholder="Enter a movie title"
          required
        />
        <button type="submit">Recommend</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {recs.map((title, idx) => (
          <li key={idx}>{title}</li>
        ))}
      </ul>
    </div>
  );
}
