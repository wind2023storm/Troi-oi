import { Message } from "@/types";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "../Markdown/CodeBlock";

interface Props {
  message: Message;
}

export const ChatMessage: FC<Props> = ({ message }) => {
  return (
    <div
      className={`flex justify-center py-[20px] sm:py-[30px] text-white no-scrollbar ${
        message.role === "assistant" ? " border-neutral-300" : ""
      }`}
      style={{ overflowWrap: "anywhere" }}
    >
      <div className="w-full flex px-5">
        <div className="mr-1 sm:mr-2 font-bold min-w-[40px]">
          {message.role === "assistant" ? "AI:" : "You:"}
        </div>

        <div className="prose prose-invert min-w-full pr-12 mt-[-2px]">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <CodeBlock
                    key={Math.random()}
                    language={match[1]}
                    value={String(children).replace(/\n$/, "")}
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
