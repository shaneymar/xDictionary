import React, { useState } from "react";

export default function App() {
  
  const [dictionary] = useState([
    { word: "React", meaning: "A JavaScript library for building user interfaces." },
    { word: "Component", meaning: "A reusable building block in React." },
    { word: "State", meaning: "An object that stores data for a component." },
  ]);

  const [query, setQuery] = useState("");
  const [definition, setDefinition] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const trimmed = query.trim();
    if (trimmed === "") {
      setDefinition(null);
      setNotFound(false);
      return;
    }

    const found = dictionary.find(
      (entry) => entry.word.toLowerCase() === trimmed.toLowerCase()
    );

    if (found) {
      setDefinition(found.meaning);
      setNotFound(false);
    } else {
      setDefinition(null);
      setNotFound(true);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 border rounded shadow-sm">
      <h1 className="text-2xl font-semibold mb-4">XDictionary</h1>

      
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter a word"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search term"
          className="flex-1 p-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 border rounded bg-gray-100">
          Search
        </button>
      </form>

      
      <div aria-live="polite">
        {definition && (
          <div>
            <h3>Definition:</h3>
            <p>{definition}</p>
          </div>
        )}

        {!definition && notFound && (
          <div>
            <h3>Definition:</h3>
          <p>Word not found in the dictionary.</p>
          </div>
        )}
      </div>
    </div>
  );
}
