import { Message, OpenAIModel } from "@/types";
import { FC, MutableRefObject, useEffect, useRef } from "react";
import Result from "../results/Results";
import List from "../suggestions/List";
import { ChatInput } from "./ChatInput";
import { ChatLoader } from "./ChatLoader";
import { ChatMessage } from "./ChatMessage";

interface Props {
  model: OpenAIModel;
  messages: Message[];
  loading: boolean;
  disabled: boolean;
  onSend: (message: Message) => void;
  onSelect: (model: OpenAIModel) => void;
  onNewConversation: () => void;
  stopConversationRef: MutableRefObject<boolean>;
}

export const Chat: FC<Props> = ({
  model,
  messages,
  loading,
  disabled,
  onSend,
  onSelect,
  onNewConversation,
  stopConversationRef,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-full w-full flex flex-col bg-slate-900 px-6">
      <div className="flex-1 overflow-auto no-scrollbar">
        {messages.length === 0 ? (
          <>
            <div className="sm:pb-20 pt-20">
              <h1 className="max-w-xl mx-auto mt-2 mb-8 sm:mt-10 sm:mb-10 text-5xl font-semibold tracking-tighter text-center md:leading-tight md:text-6xl font-display text-slate-200">
                ChatGPT for <br />
                <em className="not-italic text-transparent bg-clip-text bg-gradient-to-br from-rose-100 via-emerald-100 to-sky-200">
                  Everybody
                </em>
              </h1>
              <List onSend={onSend} />
            </div>
          </>
        ) : (
          <>
            <Result loading={disabled} messages={messages} onSend={onSend}>
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {loading && <ChatLoader />}
            </Result>

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="h-[170px] w-full md:w-[700px] xl:w-[800px] mx-auto bg-transparent z-0">
        <ChatInput
          onNewConversation={onNewConversation}
          loading={disabled}
          onSend={onSend}
          model={model}
          onSelect={onSelect}
          stopConversationRef={stopConversationRef}
        />
      </div>
    </div>
  );
};
