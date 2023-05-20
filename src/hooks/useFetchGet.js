import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchGet = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        // const response = await axios.get('https://api-deslocamento.herokuapp.com/api/v1/Cliente');
        setData(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return { data, error };
};

export default useFetchGet;