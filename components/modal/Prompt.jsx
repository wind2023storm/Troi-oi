import { useState } from "react";

export default function Prompt() {
  const [selected, setSelected] = useState("");

  // List of items
  const items = [
    "Fix Grammar Errors",
    "Act as an English Translator and Improver",
    "Act as an job interviewer",
    "Act as a English Pronunciation Helper",
    "Act as a Travel Guide",
  ];
  return (
    <ul className="py-2">
      {items.map((item, index) => (
        <li onClick={() => setSelected(item)} key={index} className="py-2">
          <button
            className={`w-full flex justify-between items-center border border-zinc-500 capitalize rounded-full px-5 py-3 text-zinc-300 text-sm hover:bg-slate-900 hover:bg-opacity-40 ${
              selected === item ? "bg-slate-900 bg-opacity-40" : ""
            }`}
          >
            {item}
            <span
              className={`inline-block w-2.5 h-2.5 rounded-full ring-[5px] ${
                selected === item ? "ring-emerald-500" : "ring-zinc-500"
              }`}
            ></span>
          </button>
        </li>
      ))}
    </ul>
  );
}
