import { supabase } from "@/pages/api/supabaseClient";
import { Message, OpenAIModel } from "@/types";
import { IconPlayerStop, IconSend } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FC,
  KeyboardEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import PromptPopup from "../modal/PromptPopup";
import { ChatPromptIcon } from "./ChatPromptIcon";
import Head from "./Head";

interface Props {
  onSend: (message: Message) => void;
  model: OpenAIModel;
  stopConversationRef: MutableRefObject<boolean>;
  onNewConversation: () => void;
  loading: boolean;
  onSelect: (model: OpenAIModel) => void;
}

const maxLength: number = 12000;

export const ChatInput: FC<Props> = ({
  onSend,
  model,
  stopConversationRef,
  onNewConversation,
  onSelect,
  loading,
}) => {
  useEffect(() => {
    async function fetchPopupData() {
      const { data: chatGptLangs } = await supabase
        .from("chatgpt_lang")
        .select();
      const { data: chatGptTones } = await supabase
        .from("chatgpt_tone")
        .select();
      const { data: chatGptwriting } = await supabase
        .from("chatgpt_writing_style")
        .select();
      const { data: chatGptformat } = await supabase
        .from("chatgpt_format")
        .select();
      if (chatGptTones?.length) {
        if (toneData?.length) {
          setToneData([...toneData, ...chatGptTones]);
        } else setToneData([...chatGptTones]);
      }
      if (chatGptwriting?.length) {
        if (writingData?.length) {
          setWritingData([...writingData, ...chatGptwriting]);
        } else setWritingData([...chatGptwriting]);
      }
      if (chatGptformat?.length) {
        if (formatData?.length) {
          setFormatData([...formatData, ...chatGptformat]);
        } else setFormatData([...chatGptformat]);
      }
      setOutputData(chatGptLangs);
    }
    fetchPopupData();
  }, []);
  const [outputData, setOutputData] = useState<any[] | null>([]);
  const [toneData, setToneData] = useState<any[] | null>([
    {
      name: "default",
    },
  ]);
  const [writingData, setWritingData] = useState<any[] | null>([
    {
      name: "default",
    },
  ]);
  const [formatData, setFormatData] = useState<any[] | null>([
    {
      name: "default",
    },
  ]);
  const [content, setContent] = useState<string>();
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [alert, setAlert] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [popupShow, setPopupShow] = useState<Boolean>(false);
  const [output, setOutput] = useState<any>("");
  const [tone, setTone] = useState<any>("");
  const [writing, setWriting] = useState<any>("");
  const [format, setFormat] = useState<any>("");
  const handlePopupShow = () => {
    setPopupShow(!popupShow);
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.length > maxLength) {
      setAlert(`Message limit is ${maxLength} characters`);
      return;
    } else {
      setAlert("");
    }

    setContent(value);
  };

  const handleCharacterChange = useCallback(
    (promptContent: string) => {
      if (promptContent?.length > maxLength) {
        setAlert(`Message limit is ${maxLength} characters`);
        return;
      } else {
        setAlert("");
      }
      onSend({ role: "user", content: promptContent });
    },
    [maxLength]
  );

  const handlePromptChange = useCallback(
    (promptContent: string) => {
      if (promptContent?.length > maxLength) {
        setAlert(`Message limit is ${maxLength} characters`);
        return;
      } else {
        setAlert("");
      }
      setContent(promptContent);
    },
    [maxLength]
  );

  const handleSend = () => {
    if (!content) {
      setAlert("Please enter a message");
      setTimeout(() => {
        setAlert("");
      }, 2000);
      return;
    }

    if (
      (tone && tone.toLowerCase() !== "default") ||
      (output && output.toLowerCase() !== "default") ||
      (writing && writing.toLowerCase() !== "default") ||
      (format && format.toLowerCase() !== "default")
    ) {
      onSend({
        role: "user",
        content:
          content +
          `\n Please respond in ${output ? output : "English"}${
            tone ? ", " + tone + " tone" : ""
          }${writing ? ", " + writing + " style." : "."}${
            format ? " Answer in " + format + " detail." : ""
          }`,
      });
    } else onSend({ role: "user", content });

    setContent("");

    if (window.innerWidth < 640 && textareaRef && textareaRef.current) {
      textareaRef.current.blur();
    }
  };

  const isMobile = () => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
    return mobileRegex.test(userAgent);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!isTyping) {
      if (e.key === "Enter" && !e.shiftKey && !isMobile()) {
        e.preventDefault();
        handleSend();
      }
    }
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
      textareaRef.current.style.overflow = `${
        textareaRef?.current?.scrollHeight > 400 ? "auto" : "hidden"
      }`;
    }
  }, [content]);

  function handleStopConversation() {
    stopConversationRef.current = true;
    setTimeout(() => {
      stopConversationRef.current = false;
    }, 1000);
  }

  return (
    <>
      {/* alert message */}
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute z-50 top-20 inset-x-0 pointer-events-none mx-auto w-full sm:w-2/3 md:w-1/2 text-center px-4"
          >
            <div className="bg-red-500 py-6 rounded-md">{alert}</div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 w-full pt-6 md:pt-2 px-4">
        <Head
          model={model}
          onSelect={onSelect}
          onNewConversation={onNewConversation}
          onNewCharacter={handleCharacterChange}
          onNewPromptChange={handlePromptChange}
        />
        {popupShow && (
          <PromptPopup
            outputData={outputData}
            toneData={toneData}
            writingData={writingData}
            formatData={formatData}
            setPopupShow={handlePopupShow}
            output={output}
            tone={tone}
            writing={writing}
            format={format}
            setTone={setTone}
            setOutput={setOutput}
            setWriting={setWriting}
            setFormat={setFormat}
          />
        )}
        <div className="stretch mx-2  flex flex-row gap-2 md:mx-4 last:mb-6 last:mt-3 lg:mx-auto lg:max-w-xl xl:max-w-3xl items-center">
          <div
            className={
              popupShow
                ? "cursor-pointer shrink-0 transition-colors p-1.5 rounded-lg relative bg-gray-500 text-gray-500 dark:text-zinc-900"
                : "cursor-pointer shrink-0 transition-colors  p-1.5 rounded-lg relative  text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-200"
            }
            onClick={() => handlePopupShow()}
          >
            <ChatPromptIcon />
          </div>
          <div className="flex flex-col w-full py-2 flex-grow  md:pl-4 relative dark:bg-slate-1100 bg-white shadow-blue-900/5 ring-2 dark:ring-blue-900 ring-blue-500 rounded-[32px]">
            <textarea
              ref={textareaRef}
              className="dark:text-white text-black m-0 w-full resize-none outline-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0  pl-2 md:pl-0 no-scrollbar"
              style={{
                resize: "none",
                bottom: `${textareaRef?.current?.scrollHeight}px`,
                maxHeight: "400px",
                overflow: `${
                  textareaRef.current && textareaRef.current.scrollHeight > 400
                    ? "auto"
                    : "hidden"
                }`,
              }}
              placeholder="Type a message..."
              value={content}
              rows={1}
              onCompositionStart={() => setIsTyping(true)}
              onCompositionEnd={() => setIsTyping(false)}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />

            {loading ? (
              <button
                className="absolute bottom-2.5 right-4 focus:outline-none "
                onClick={handleStopConversation}
              >
                <IconPlayerStop size={22} color="red" />
              </button>
            ) : (
              <button
                className="absolute bottom-3 right-4 focus:outline-none dark:text-white text-black"
                onClick={handleSend}
              >
                <IconSend size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
