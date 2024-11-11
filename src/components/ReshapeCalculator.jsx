import React, { useState } from "react";

function App() {
  const [numElements, setNumElements] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleCalculate = async () => {
    setError(null);
    setResults([]);

    if (!numElements || isNaN(numElements)) {
      setError("Please enter a valid number.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/calculate-shapes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ num_elements: parseInt(numElements, 10) }),
      });
      const data = await response.json();

      if (response.ok) {
        setResults(data.shapes);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Error connecting to the server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-md">
        <h2 className="text-2xl font-bold mb-4">Reshape Calculator</h2>

        <input
          type="text"
          value={numElements}
          onChange={(e) => setNumElements(e.target.value)}
          placeholder="Enter number of elements"
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
        />

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
        >
          Calculate Reshape Options
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <div className="mt-4">
          <h3 className="text-xl font-semibold">Possible Reshapes:</h3>
          <ul className="list-disc list-inside mt-2">
            {results.length > 0 ? (
              results.map((shape, index) => (
                <li key={index}>{shape.join(" x ")}</li>
              ))
            ) : (
              <p>No valid reshapes available.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
