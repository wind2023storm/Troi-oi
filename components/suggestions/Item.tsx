import { Message } from "@/types";
import { FC } from "react";

interface Props {
  onSend: (message: Message) => void;
  title: string;
}

const Item: FC<Props> = ({ onSend, title }) => {
  const handleSearchInput = (title: string) => {
    onSend({ role: "user", content: title });
  };

  return (
    <li>
      <button
        onClick={() => handleSearchInput(title)}
        className="px-4 py-1 sm:py-2 transition-colors rounded-full backdrop-blur-xl [@supports(backdrop-filter:blur(0))]:bg-slate-1100/80 hover:bg-blue-700 [@supports(backdrop-filter:blur(0))]:hover:bg-blue-700/80 bg-slate-1100 text-slate-200"
      >
        {title}
      </button>
    </li>
  );
};

export default Item;
