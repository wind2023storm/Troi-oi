import { motion } from "framer-motion";

export default function Footer({ loading, lastUserMessage, onSend }) {
  const variants = {
    transition: {
      duration: 0.1,
      delay: 0.05,
      default: {
        ease: "easeInOut",
      },
    },
    initial: {
      opacity: 0,
      x: -25,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
  };

  const handleSend = () => {
    if (typeof !lastUserMessage === "object") return;
    onSend(lastUserMessage);
  };

  return (
    <div className="flex items-center w-full py-3 pl-5 text-sm border-t border-slate-400/5">
      {!loading && (
        <motion.button
          onClick={handleSend}
          variants={variants}
          initial="initial"
          animate="animate"
          transition="transition"
          className="flex items-center px-3 py-1 text-sm font-medium transition-colors rounded-full text-slate-200 bg-slate-800 hover:text-white hover:bg-slate-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="w-4 h-4 mr-1.5"
          >
            <path
              fillRule="evenodd"
              d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
              clipRule="evenodd"
            ></path>
          </svg>{" "}
          Regenerate
        </motion.button>
      )}
      <ul className="flex-1 overflow-x-scroll whitespace-nowrap no-scrollbar">
        {/* <span className="inline-block px-3 py-1 mr-2 rounded-full last:mr-5 bg-emerald-400/10 text-emerald-400 ring-1 ring-inset ring-emerald-400/20 hover:bg-emerald-400/10 hover:text-emerald-300 hover:ring-emerald-300/50 cursor-pointer">
          <li>/docs/advanced</li>
        </span> */}
      </ul>
    </div>
  );
}
