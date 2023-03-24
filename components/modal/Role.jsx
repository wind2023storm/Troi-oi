import { IconChevronDown } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

export default function Role() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("Select Role");

  // Dropdown Button Ref
  const btnRef = useRef(null);

  // Toggle Dropdown
  const handleToggle = (e) => {
    if (e.target === btnRef.current) {
      setIsOpen(!isOpen);
    }
  };

  const items = [
    "Life Coach",
    "English Tutor",
    "Travel Guide",
    "Job Interviewer",
    "English Translator",
    "English Pronunciation Helper",
  ];

  // handle select role
  const handleSelect = (v) => {
    setValue(v);
    setIsOpen(false);
  };

  // make a variants for dropdown
  const dropdownVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <div
        ref={btnRef}
        onClick={handleToggle}
        className="cursor-pointer relative text-sm text-center inline-flex items-center border border-zinc-500 outline-none px-4 py-3 text-gray-900 w-full rounded-full"
      >
        <input
          readOnly
          value={value}
          type="text"
          className="w-full h-full outline-none pointer-events-none bg-transparent text-zinc-300"
        />

        <div className="h-full absolute right-0 inset-y-0 flex justify-center items-center mr-4 pointer-events-none">
          <IconChevronDown
            className={`text-white w-4 h-4 ml-2 transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="initial"
              animate="visible"
              exit="hidden"
              className={`absolute top-full mt-3 left-0 z-10 bg-slate-800 rounded-lg border border-zinc-500 w-full`}
            >
              <ul className="text-gray-500 text-start">
                {items.map((item, index) => (
                  <li
                    onClick={() => handleSelect(item)}
                    key={index}
                    className="cursor-pointer py-2.5 px-2 text-zinc-300 text-sm hover:bg-slate-900 hover:bg-opacity-40"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}{" "}
        </AnimatePresence>
      </div>{" "}
      <div className="flex justify-center pt-6 gap-6">
        <button
          type="button"
          className="text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-full text-sm px-10 py-2.5 text-center"
        >
          Cancel
        </button>
        <button
          type="button"
          className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-full text-sm px-10 py-2.5 text-center"
        >
          Save
        </button>
      </div>
    </>
  );
}
