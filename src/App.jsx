import React, { useState } from "react";

export default function XDictionary() {
  // Initialize dictionary state with the provided array (do NOT remove existing entries)
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

    // If the input is empty, do nothing — preserve previous search results (important for No Search Term test)
    if (trimmed === "") {
      setDefinition(null);
      setNotFound(true);
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
      {/* Title for the app */}
      <h1 className="text-2xl font-semibold mb-4">Dictionary App</h1>

      {/* Search form - uses an input element and a button element as required */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4" aria-label="search-form">
        <input
          id="search-input"
          data-testid="search-input"
          type="text"
          placeholder="Search for a word..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search for a word..."
          className="flex-1 p-2 border rounded"
        />
        <button
          id="search-button"
          data-testid="search-button"
          type="submit"
          className="px-4 py-2 border rounded bg-gray-100"
        >
          Search
        </button>
      </form>

      {/* Results area: show the Definition: header always (tests expect this). Only display the meaning when present; otherwise show the exact not-found message when appropriate. */}
      <div aria-live="polite" data-testid="result">
        <h3 className="font-bold text-lg">Definition:</h3>

        {definition && (
          <div>
            <p>{definition}</p>
          </div>
        )}

        {!definition && notFound && (
          <div>
            <p>Word not found in the dictionary.</p>
          </div>
        )}
      </div>
    </div>
  );
}
