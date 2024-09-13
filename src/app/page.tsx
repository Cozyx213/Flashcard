// src/app/page.tsx
"use client";
import { ChemistryData } from "./lib/types";
import { useState, useEffect } from "react";
import axios from "axios";

async function getElements(): Promise<ChemistryData["elements"]> {
  try {
    const res = await axios.get("http://127.0.0.1:5000/chemistryData", {
      headers: {
        "Cache-Control": "max-age=60",
      },
    });
    console.log(res.data.elements);
    return res.data.elements;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const Flashcard = ({ element, isFlipped, onFlip }) => {
  return (
    <div
      className="w-64 h-96 bg-white rounded-lg shadow-md cursor-pointer transition-transform duration-300 transform hover:scale-105"
      onClick={onFlip}
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        {isFlipped ? (
          <div className="text-center">
            <div className="text-xl font-semibold">
              Atomic Number: {element.atomicNumber}
            </div>
            <div className="text-xl mt-2">
              Atomic Mass: {element.atomicMass}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-6xl font-bold">{element.symbol}</div>
            <div className="text-2xl mt-2">{element.name}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function HomePage() {
  const [elements, setElements] = useState<ChemistryData["elements"] | null>(
    null
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    async function fetchElements() {
      try {
        const elements = await getElements();
        setElements(elements);
      } catch (error) {
        setError("Failed to fetch elements. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchElements();
  }, []);

  const handleNext = () => {
    if (elements) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % elements.length);
    }
    setAnswer("");
  };

  const handlePrevious = () => {
    if (elements) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + elements.length) % elements.length
      );
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!elements) {
    return <p>No elements found.</p>;
  }

  const currentElement = elements[currentIndex];
  function handleInput(input: string) {
    setAnswer(input);
    console.log(input, currentElement.element_name);
    if (input === currentElement.element_name) {
      console.log("Correct");
      handleNext();
    } else {
      console.log("Incorrect");
    }
  }
  return (
    <div>
      <div key={currentElement.id}>
        <h1>
          {currentElement.element_name} ({currentElement.element_symbol})
        </h1>
        <p>{currentElement.other_info}</p>
      </div>
      <button onClick={handlePrevious} disabled={elements.length <= 1}>
        Previous
      </button>
      <button onClick={handleNext} disabled={elements.length <= 1}>
        Next
      </button>
      <input
        className="text-cyan-600"
        type="text"
        value={answer}
        onChange={(e) => handleInput(e.target.value)}
      />
    </div>
  );
}
