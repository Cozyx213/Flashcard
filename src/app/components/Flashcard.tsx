import { Element } from "../lib/types";
const Flashcard = ({
  answer,
  element,
  isFlipped,
  onFlip,
  Click,
  onChange,
}: {
  answer: string;
  element: Element;
  isFlipped: boolean;
  onFlip: () => void;
  Click: () => void;
 onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { atomic_number, other_info, element_symbol, element_name } = element;
  return (
    <div className="w-64 h-96 bg-indigo-800 text-emerald-400 rounded-t-lg shadow-md cursor-pointer ">
      <div
        className="w-full h-full flex items-center justify-center p-4"
        onClick={onFlip}
      >
        {isFlipped ? (
          <div className="text-center">
            <div className="text-6xl font-bold">{element_symbol}</div>
            <div className="text-2xl mt-2">{element_name}</div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-xl font-semibold">
              Atomic Number: {atomic_number}
            </div>
            <div className="text-xl mt-2">Atomic Mass: {other_info}</div>
          </div>
        )}
      </div>
      <div className="w-full justify-between  flex  rounded-b-lg bg-slate-600">
        <button className="" onClick={Click}>
          Prev
        </button>
        <button className="" onClick={Click}>
          Next
        </button>
      </div>
      <input
        className="text-cyan-600"
        type="text"
        value={answer}
        onChange={onChange}
      />
    </div>
  );
};
export default Flashcard;
