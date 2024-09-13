// components/Flashcard.tsx

import React, { useState } from "react";
import { Element } from "../lib/types";
import styles from "./Flashcard.module.css";

interface FlashcardProps {
  element: Element;
}

const Flashcard: React.FC<FlashcardProps> = ({ element }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`${styles.card} ${flipped ? styles.flipped : ""}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className={styles.front}>
        <h2>{element.element_symbol}</h2>
        <p>Atomic Number: {element.atomic_number}</p>
      </div>
      <div className={styles.back}>
        <h2>{element.element_name}</h2>
        <p>{element.other_info}</p>
      </div>
    </div>
  );
};

export default Flashcard;
