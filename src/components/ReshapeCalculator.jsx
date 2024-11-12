import React, { useState } from 'react';

function App() {
  const [totalElements, setTotalElements] = useState('');
  const [output2D, setOutput2D] = useState(null);
  const [output3D, setOutput3D] = useState(null);
  const [shape2D, setShape2D] = useState(null);
  const [shape3D, setShape3D] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    setError(null);
    setOutput2D(null);
    setOutput3D(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/reshape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          total_elements: parseInt(totalElements),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred');
      }

      const data = await response.json();
      setOutput2D(data.reshaped_2d);
      setOutput3D(data.reshaped_3d);
      setShape2D(data.shape_2d);
      setShape3D(data.shape_3d);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-center mb-4">Array Reshape Tool</h1>

        <div>
          <label className="block font-medium">Total Elements</label>
          <input
            type="number"
            value={totalElements}
            onChange={(e) => setTotalElements(e.target.value)}
            placeholder="Enter total elements"
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>

        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Get 2D and 3D Reshapes
        </button>

        {error && <p className="text-red-500 mt-2">Error: {error}</p>}

        {output2D && (
          <div className="mt-4 p-4 bg-gray-50 rounded border">
            <h2 className="font-semibold mb-2">2D Array Shape ({shape2D[0]} x {shape2D[1]}):</h2>
            <pre>{JSON.stringify(output2D, null, 2)}</pre>
          </div>
        )}

        {output3D && (
          <div className="mt-4 p-4 bg-gray-50 rounded border">
            <h2 className="font-semibold mb-2">3D Array Shape ({shape3D[0]} x {shape3D[1]} x {shape3D[2]}):</h2>
            <pre>{JSON.stringify(output3D, null, 2)}</pre>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
