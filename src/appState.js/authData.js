import { useState, useEffect } from 'react';
import { fetchData } from '../apiService.js/requestToBack';

const authData = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const loadData = async () => {
        try {
          const result = await fetchData();
          setData(result);
        } catch (err) {
          setError('Failed to fetch data');
        } finally {
          setLoading(false);
        }
      };
  
      loadData();
    }, []);
  
    return { data, error, loading };
  };