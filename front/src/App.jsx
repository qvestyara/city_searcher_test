import { useState } from 'react'
import './App.css'

function App() {
  const [letter, setLetter] = useState('')
  const [count, setCount] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLetterChange = (e) => {
    const { value } = e.target;

    setLetter(value);
    setCount(null);
    setError('');

    if (value && !/^[a-z]$/i.test(value)) {
      setError('Please enter a single letter (a-z).')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!/^[a-z]$/i.test(letter)) {
      setError('Please enter a single letter (a-z).');
      return;
    }

    setIsLoading(true)
    setError('');
    setCount(null);
    try {
      const response = await fetch(`/api/cities/count?letter=${letter}`);
      if (!response.ok) {
        throw new Error(`Error fetching city count: ${response.statusText}`);
      }
      const data = await response.json();
      setCount(data.count);
    } catch (error) {
      setError('Failed to fetch city count.');
      console.error('Error fetching city count:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <h1 className="header">City searcher</h1>
      <p className="description">Find how many cities start with a specific letter.</p>
      <form onSubmit={handleSubmit} className="letter-form">
        <label htmlFor="letter">Enter a letter (a-z):</label>
        <input
          type="text"
          id="letter"
          name="letter"
          maxLength={1}
          placeholder="Enter a letter (a-z)"
          value={letter}
          onChange={handleLetterChange}
          className={`letter-input ${error ? 'input-error' : ''}`}
        />
        <button
          type="submit"
          disabled={isLoading || !letter.match(/^[a-z]$/i)}
          className="search-button"
        >Search</button>
      </form>
      {error && <p className="error" >{error}</p>}
      {isLoading && <p className="loading">Loading...</p>}
      {count !== null && <p aria-live="polite" className="count">Count: {count}</p>}
    </div>
  )
}

export default App
