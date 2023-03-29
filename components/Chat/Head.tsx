import { OpenAIModel } from "@/types";
import { AnimatePresence } from "framer-motion";
import { FC, useState } from "react";
import Modal from "../modal/Modal";
import Model from "../modal/Model";
import Prompt from "../modal/Prompt";
import Role from "../modal/Role";

interface Props {
  model: OpenAIModel;
  onSelect: (model: OpenAIModel) => void;
  onNewConversation: () => void;
  onNewCharacter: (promptContent: string) => void;
  onNewPromptChange: (promptContent: string) => void;
}

const Head: FC<Props> = ({ model, onSelect, onNewConversation, onNewCharacter, onNewPromptChange }) => {
  const [modal, setModal] = useState("");

  const closeModal = () => {
    setModal("");
  };

  const handleSetModal = (value: any) => {
    if (!modal) {
      setModal(value);
    } else {
      setModal("");
    }
  };

  return (
    <>
      <AnimatePresence>
        {modal === "prompt" && (<Prompt onClose={closeModal} onNewPromptChange={onNewPromptChange} />)}
        {modal === "role" && <Role onCharacterClick={onNewCharacter} onClose={closeModal} />}
        {modal === "model" && (
          <Modal closeModal={closeModal} text="Model">
            <Model onSelect={onSelect} model={model} />
          </Modal>
        )}
      </AnimatePresence>

      <div className="z-10 h-auto mx-auto">
        <ul className="xs:w-min whitespace-nowrap text-center mx-auto px-1 xs:px-3 text-sm font-normal sm:font-medium rounded-full shadow-xl ring-1 backdrop-blur dark:bg-slate-800/90 bg-slate-200 dark:text-zinc-200 text-zinc-900 dark:ring-slate-100/10 ring-slate-600/50">
          <li className="inline-block" onClick={() => handleSetModal("model")}>
            <button className="relative block text-sm px-1 xs:px-3 py-2 whitespace-nowrap transition dark:text-emerald-400 text-emerald-900">
              Model: {model}
              <span className="absolute h-px inset-x-1 -bottom-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-emerald-500/0"></span>
            </button>
          </li>
          <li className="inline-block" onClick={() => handleSetModal("role")}>
            <button className="relative block text-sm px-1 xs:px-3 py-2 whitespace-nowrap transition dark:hover:text-emerald-500 hover:text-emerald-900">
              Character
            </button>
          </li>
          <li className="inline-block" onClick={() => handleSetModal("prompt")}>
            <button className="relative block text-sm px-1 xs:px-3 py-2 whitespace-nowrap transition dark:hover:text-emerald-500 hover:text-emerald-900">
              Prompt
            </button>
          </li>
          <li className="inline-block" onClick={onNewConversation}>
            <button className="relative block text-sm px-1 sm:px-3 py-2 whitespace-nowrap transition dark:hover:text-emerald-500 hover:text-emerald-900">
              New Chat
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Head;
