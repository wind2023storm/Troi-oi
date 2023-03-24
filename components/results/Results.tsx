import { Message } from "@/types";
import { motion } from "framer-motion";
import Footer from "./Footer";

export default function Results({
  children,
  loading,
  messages,
  onSend,
}: {
  children: React.ReactNode;
  loading: boolean;
  messages: Message[];
  onSend: (message: Message) => void;
}) {
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
      y: 100,
      scale: 0.95,
    },
  };

  // get last user message
  const lastUserMessage = messages.filter((msg) => msg.role === "user").pop();

  return (
    <motion.section
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      key="results"
      transition={{
        duration: 0.5,
        default: {
          ease: "easeInOut",
        },
      }}
      className="max-w-5xl overflow-hidden transform mx-auto mt-16 lg:mt-12 rounded-xl bg-slate-1100 backdrop-blur-xl [@supports(backdrop-filter:blur(0))]:bg-slate-1100/80 relative"
    >
      {children}
      <Footer
        loading={loading}
        lastUserMessage={lastUserMessage}
        onSend={onSend}
      />
    </motion.section>
  );
}
