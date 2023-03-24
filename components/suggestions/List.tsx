import { Message } from "@/types";
import { motion } from "framer-motion";
import { FC } from "react";
import Item from "./Item";

interface Props {
  onSend: (message: Message) => void;
}

const List: FC<Props> = ({ onSend }) => {
  // some dummy data
  const items = [
    "How do I get started?",
    "Hoc can I render my application?",
    "How does routing work?",
    "How do I manage state?",
    "How do I add authentication?",
    "How do I create an API route?",
    "How do I use SolidStart with TypeScript?",
  ];

  // framer motion variants
  const variants = {
    initial: {
      opacity: 0,
      y: 100,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
  };

  return (
    <motion.section
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      key="suggestions"
      className="max-w-lg mx-auto mt-10 "
    >
      <h4 className="mt-3 text-sm font-semibold text-white/80 md:text-left">
        Or try asking one of these questions:
      </h4>

      <ul className="flex flex-wrap gap-2 sm:gap-3 mt-4 text-sm text-scale-1100">
        {items.map((item) => (
          <Item key={item} title={item} onSend={onSend} />
        ))}
      </ul>
    </motion.section>
  );
};

export default List;
