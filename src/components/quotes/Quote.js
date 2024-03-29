import React, { useState, useEffect } from 'react';

const Quote = () => {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    const fetchQuote = async () => {
      setLoading(true);
      setError(false);

      try {
        const res = await fetch('https://api.api-ninjas.com/v1/quotes?category=happiness', {
          headers: {
            'X-Api-Key': 'jzzfew774Kqg+nf2AkhCAw==pIwj1VNrBEBwQ0lW',
            'Content-Type': 'application/json',
          },
        });

        const getData = await res.json();
        if (mounted) {
          setQuote(getData[0].quote);
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchQuote();
  }, [mounted]);

  if (loading) {
    return <span>Loading..</span>;
  }

  if (error) {
    return <span>Something went wrong...</span>;
  }

  return (
    <div>
      <span>{quote}</span>
    </div>
  );
};

export default Quote;
