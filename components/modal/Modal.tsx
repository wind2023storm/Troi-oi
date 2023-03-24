import { IconXboxX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { FC, useRef } from "react";

interface Props {
  closeModal: () => void;
  text: string;
  children: any;
}

const Modal: FC<Props> = ({ closeModal, children, text }) => {
  const ref = useRef(null);

  // Close modal when clicking outside of ref
  const handleClickOutside = (event: any) => {
    // @ts-ignore
    if (ref.current && !ref.current.contains(event.target)) {
      closeModal();
    }
  };

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
    <div>
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
            className="inline-block w-full align-bottom bg-slate-800 rounded-lg px-4 pt-5 pb-4 text-left shadow-xl sm:my-8 sm:align-middle sm:p-6 max-w-sm opacity-100 translate-y-0 sm:scale-100"
          >
            {/* headline */}
            <div className="flex justify-between items-center pb-4">
              <h3 className="text-lg leading-6 font-medium text-zinc-200">
                Select a {text}
              </h3>
              <IconXboxX className="cursor-pointer" onClick={closeModal} />
            </div>

            {/* model item  */}
            {children}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
