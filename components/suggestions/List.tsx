import { Message } from "@/types";
import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import Item from "./Item";
import { supabase } from "@/utils/SupabaseClient";

interface Props {
  onSend: (message: Message) => void;
}

const List: FC<Props> = ({ onSend }) => {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    async function fetchPopupData() {
      let newItems: any[] = []
      const { data: chatSuggestions } = await supabase.from('chatgpt_suggestion').select();
      if (chatSuggestions?.length) {
        for (const suggestion of chatSuggestions) {
          newItems.push(suggestion?.prompt);
        }
      }
      setItems(newItems);
    }
    fetchPopupData()
  }, []);
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
      <h4 className="mt-3 text-sm font-semibold dark:text-white/80 text-black/80 md:text-left">
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
