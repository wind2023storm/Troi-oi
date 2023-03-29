import { useEffect, useState, useRef, FC } from "react";
import { supabase } from "@/utils/SupabaseClient";
import { AnimatePresence, motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";

interface Props {
  onClose: () => void;
  onNewPromptChange: (prompt: any) => void;
}

const Prompt: FC<Props> = ({ onClose, onNewPromptChange }) => {
  const [selected, setSelected] = useState<String>("");
  const [prompts, setPrompts] = useState<any[]>([]);
  const [initPrompts, setInitPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState<Boolean>(false)

  useEffect(() => {
    getPromptList();
  }, []);

  const onSearchPrompt = (keyword: String) => {
    let newPrompts: any[] = [];
    if (initPrompts) {
      for (const prompt of initPrompts) {
        if (prompt?.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())) {
          newPrompts.push(prompt);
        }
      }
      setPrompts(newPrompts);
    }
  }
  const getPromptList = async () => {
    try {
      setLoading(true);
      const { data: items, error, status } = await supabase.from('chatgpt_prompt').select();
      if (error && status !== 406) {
        throw error;
      }
      
      if (items) {
        setPrompts(items);
        setInitPrompts(items);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSelect = (item: any) => {
    onNewPromptChange(item?.prompt);
    onClose();
  };

  const ref = useRef(null);
  const handleClickOutside = (event: any) => {
    // @ts-ignore
    if (ref.current && !ref.current.contains(event.target)) {
      onClose();
    }
  };
  // List of items
  const items = [
    "Fix Grammar Errors",
    "Act as an English Translator and Improver",
    "Act as an job interviewer",
    "Act as a English Pronunciation Helper",
    "Act as a Travel Guide",
  ];
  // Animation variants for modal
  const overlayVariants = {
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

  //variant for background color change smoothly
  const backgroundVariants = {
    initial: {
      backgroundColor: "#00000000",
    },
    visible: {
      backgroundColor: "#00000099",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    hidden: {
      backgroundColor: "#00000000",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };
  return (
    <motion.div
      variants={backgroundVariants}
      initial="initial"
      animate="visible"
      exit="hidden"
      className="fixed inset-0 overflow-y-auto z-50"
      onClick={handleClickOutside}
    >
      <div className="flex justify-center min-h-screen px-4 pb-20 text-center sm:block sm:p-0 items-center pt-4">
        <motion.div
          variants={overlayVariants}
          initial="initial"
          animate="visible"
          exit="hidden"
          ref={ref}
          className="inline-block w-full align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl sm:my-8 sm:align-middle sm:p-6 max-w-xl opacity-100 translate-y-0 sm:scale-100"
        >
          <div
            className="relative text-sm text-center inline-flex items-center text-gray-900 w-full"
          >
            <AnimatePresence>
              <motion.div
                variants={dropdownVariants}
                initial="initial"
                animate="visible"
                exit="hidden"
                className="w-full overflow-hidden"
              >
                <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto sm:flex sm:items-center sm:justify-between">
                  <div className="text-left">
                    <p className="text-xl font-bold text-gray-900">Select a prompt</p>
                  </div>
                  <div className="mt-4 mr-0 mb-0 ml-0 sm:mt-0">
                    <p className="sr-only">Search Prompt</p>
                    <div className="relative">
                      <div className="flex items-center pt-0 pr-0 pb-0 pl-3 absolute inset-y-0 left-0 pointer-events-none">
                        <p>
                          <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21
                            21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        </p>
                      </div>
                      <input onChange={(e) => {onSearchPrompt(e.target.value)}} placeholder="Search Prompts " type="search" className="bg-white border block pt-2 pr-2 pl-10 w-full py-2
                        pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 sm:text-sm"/>
                    </div>
                  </div>
                </div>
                <div className="shadow-xl px-4 pt-2 flow-root rounded-lg relative h-auto">
                  {!loading ? prompts?.map((prompt, index) => (
                    <div key={index} className="mt-6">
                      <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                        <div className="flex items-center flex-1 min-w-0">
                          <img
                            src="/chat-role.jfif" className="flex-shrink-0 object-cover rounded-full btn- w-10 h-10"/>
                          <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                            <p className="text-left text-lg font-bold text-gray-800 truncate">
                              {prompt?.name}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:mt-0">
                          <button
                            onClick={() => handleSelect(prompt)}
                            className="bg-gray-800 px-6 py-2 text-md text-gray-100 transition-all duration-200 hover:bg-gray-700 rounded-lg">
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="h-[80px] flex items-center justify-center">
                      <ClipLoader color="#458acd" />
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Prompt;