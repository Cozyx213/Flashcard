// components/FlashcardList.tsx

import React from "react";
import { Element } from "../lib/types";
import Flashcard from "./Flashcard";
import styles from "./FlashcardList.module.css";

interface FlashcardListProps {
  elements: Element[];
}

const FlashcardList: React.FC<FlashcardListProps> = ({ elements }) => {
  return (
    <div className={styles.cardGrid}>
      {elements.map((element) => (
        <Flashcard key={element.id} element={element} />
      ))}
    </div>
  );
};

export default FlashcardList;
