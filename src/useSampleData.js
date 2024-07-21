import { useState, useEffect } from 'react';

export function useSampleData() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/sampledata.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(jsonData => {
        setData(jsonData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading the JSON data:', error);
        setError('Failed to load data');
        setLoading(false);
      });
  }, []);

  return { data, error, loading };
}