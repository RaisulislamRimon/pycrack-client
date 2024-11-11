import { useState } from "react";

const ReshapeCalculator = () => {
  const [numElements, setNumElements] = useState(16000);
  const [dimensions, setDimensions] = useState(2);
  const [shapes, setShapes] = useState([]);
  const [error, setError] = useState("");

  const handleCalculate = async () => {
    setError("");
    try {
      const response = await fetch("http://127.0.0.1:5000/calculate-shapes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ num_elements: numElements, dimensions }),
      });

      if (response.ok) {
        const data = await response.json();
        setShapes(data.shapes);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">NumPy Reshape Calculator</h2>

      <div className="mb-4">
        <label className="block text-lg mb-2">Total Elements:</label>
        <input
          type="number"
          className="border p-2 rounded w-full"
          value={numElements}
          onChange={(e) => setNumElements(Number(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg mb-2">Dimensions:</label>
        <input
          type="number"
          className="border p-2 rounded w-full"
          value={dimensions}
          onChange={(e) => setDimensions(Number(e.target.value))}
        />
      </div>

      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleCalculate}
      >
        Calculate Reshape Options
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Possible Shapes:</h3>
        {shapes.length > 0 ? (
          <ul className="list-disc pl-5">
            {shapes.map((shape, index) => (
              <li key={index}>{`(${shape.join(", ")})`}</li>
            ))}
          </ul>
        ) : (
          <p>No possible shapes found.</p>
        )}
      </div>
    </div>
  );
};

export default ReshapeCalculator;
