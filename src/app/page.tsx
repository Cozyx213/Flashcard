// src/app/page.tsx
"use client";
import { ChemistryData } from "./lib/types";
import { useState, useEffect } from "react";
import axios from "axios";
import Flashcard from "./components/Flashcard";

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


export default function HomePage() {
  const [elements, setElements] = useState<ChemistryData["elements"] | null>(
    null
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  
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

  //const handlePrevious = () => {
  //  if (elements) {
  //    setCurrentIndex(
  //      (prevIndex) => (prevIndex - 1 + elements.length) % elements.length
  //    );
  //  }
  //};

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
  function onFlip(){
    setIsFlipped(isFlipped? false: true);
    console.log(isFlipped);
  }
  
  return (
    <div className="flex justify-center">
      <Flashcard
        answer={answer}
        element={currentElement}
        isFlipped={isFlipped}
        onFlip={onFlip}
        Click={handleNext}
        onChange={(e) => handleInput(e.target.value)}
      />
    </div>
  );
}
