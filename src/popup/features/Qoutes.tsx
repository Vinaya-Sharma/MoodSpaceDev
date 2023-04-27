import React, { useState, useEffect } from "react";

function Quote() {
  const [quote, setQuote] = useState(null);

  const fetchQuote = async () => {
    try {
      const response = await fetch(
        "https://api.api-ninjas.com/v1/quotes?category=inspirational",
        {
          headers: {
            "X-Api-Key": process.env.REACT_APP_qoutes,
          },
        }
      );
      const data = await response.json();
      setQuote(data[0]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center my-4">
      {quote ? (
        <blockquote className="max-w-md p-6 mx-auto text-sm font-medium text-center text-teal-900 bg-teal-50 shadow-md">
          <p className="mb-4">{quote.quote}</p>
          <footer className="text-xs font-normal text-teal-600">
            {quote.author}
          </footer>
          <button
            className="px-2 py-1 mt-2 text-sm font-medium text-white bg-teal-600 rounded hover:bg-teal-500"
            onClick={fetchQuote}
          >
            View Another Quote
          </button>
        </blockquote>
      ) : (
        <div className="text-sm font-medium text-center text-teal-900">
          Loading...
        </div>
      )}
    </div>
  );
}

export default Quote;
