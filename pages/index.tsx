import { Chat } from "@/components/Chat/Chat";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Conversation, Message, OpenAIModel } from "@/types";
import { IconAlignLeft } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Animation from "../components/Animation";

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>();
  const [loading, setLoading] = useState<boolean>(false);
  const [model, setModel] = useState<OpenAIModel>(OpenAIModel.GPT_3_5);
  const [lightMode, setLightMode] = useState<"dark" | "light">("dark");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const stopConversationRef = useRef<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth > 1023);
    };
    setShowSidebar(window.innerWidth > 1023);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSend = async (message: Message) => {
    if (selectedConversation) {
      let updatedConversation: Conversation = {
        ...selectedConversation,
        messages: [...selectedConversation.messages, message],
      };

      setSelectedConversation(updatedConversation);
      setLoading(true);
      setDisabled(true);

      const controller = new AbortController();
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          messages: updatedConversation.messages,
        }),
      });

      if (!response.ok) {
        setLoading(false);
        throw new Error(response.statusText);
      }

      const data = response.body;

      if (!data) {
        return;
      }

      setLoading(false);

      const reader = data.getReader();

      const decoder = new TextDecoder();
      let done = false;
      let isFirst = true;
      let text = "";

      while (!done) {
        if (stopConversationRef.current === true) {
          controller.abort();
          done = true;
          break;
        }

        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);

        text += chunkValue;

        if (isFirst) {
          isFirst = false;
          const updatedMessages: Message[] = [
            ...updatedConversation.messages,
            { role: "assistant", content: chunkValue },
          ];

          updatedConversation = {
            ...updatedConversation,
            messages: updatedMessages,
          };

          setSelectedConversation(updatedConversation);
        } else {
          const updatedMessages: Message[] = updatedConversation.messages.map(
            (message, index) => {
              if (index === updatedConversation.messages.length - 1) {
                return {
                  ...message,
                  content: text,
                };
              }

              return message;
            }
          );

          updatedConversation = {
            ...updatedConversation,
            messages: updatedMessages,
          };

          setSelectedConversation(updatedConversation);
        }
      }

      //  get last user message
      const lastUserMessage = updatedConversation.messages
        .filter((message) => message.role === "user")
        .pop()?.content;

      updatedConversation.name = lastUserMessage || "New conversation";

      localStorage.setItem(
        "selectedConversation",
        JSON.stringify(updatedConversation)
      );

      const updatedConversations: Conversation[] = conversations.map(
        (conversation) => {
          if (conversation.id === selectedConversation.id) {
            return updatedConversation;
          }

          return conversation;
        }
      );

      if (updatedConversations.length === 0) {
        updatedConversations.push(updatedConversation);
      }

      setConversations(updatedConversations);

      localStorage.setItem(
        "conversationHistory",
        JSON.stringify(updatedConversations)
      );

      setDisabled(false);
    }
  };

  // not using currently
  const handleLightMode = (mode: "dark" | "light") => {
    setLightMode(mode);
    localStorage.setItem("theme", mode);
  };

  const handleRenameConversation = (
    conversation: Conversation,
    name: string
  ) => {
    const updatedConversation = {
      ...conversation,
      name,
    };

    const updatedConversations = conversations.map((c) => {
      if (c.id === updatedConversation.id) {
        return updatedConversation;
      }

      return c;
    });

    setConversations(updatedConversations);
    localStorage.setItem(
      "conversationHistory",
      JSON.stringify(updatedConversations)
    );

    setSelectedConversation(updatedConversation);
    localStorage.setItem(
      "selectedConversation",
      JSON.stringify(updatedConversation)
    );
  };

  const handleNewConversation = () => {
    const lastConversation = conversations[conversations.length - 1];

    const newConversation: Conversation = {
      id: lastConversation ? lastConversation.id + 1 : 1,
      name: "New conversation",
      messages: [],
    };

    const updatedConversations = [...conversations, newConversation];
    setConversations(updatedConversations);
    localStorage.setItem(
      "conversationHistory",
      JSON.stringify(updatedConversations)
    );

    setSelectedConversation(newConversation);
    localStorage.setItem(
      "selectedConversation",
      JSON.stringify(newConversation)
    );

    setModel(OpenAIModel.GPT_3_5);
    setLoading(false);
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    localStorage.setItem("selectedConversation", JSON.stringify(conversation));
  };

  const handleDeleteConversation = (conversation: Conversation) => {
    const updatedConversations = conversations.filter(
      (c) => c.id !== conversation.id
    );
    setConversations(updatedConversations);
    localStorage.setItem(
      "conversationHistory",
      JSON.stringify(updatedConversations)
    );

    if (updatedConversations.length > 0) {
      setSelectedConversation(updatedConversations[0]);
      localStorage.setItem(
        "selectedConversation",
        JSON.stringify(updatedConversations[0])
      );
    } else {
      setSelectedConversation({
        id: 1,
        name: "New conversation",
        messages: [],
      });
      localStorage.removeItem("selectedConversation");
    }
  };

  useEffect(() => {
    // const theme = localStorage.getItem("theme");
    // if (theme) {
    //   setLightMode(theme as "dark" | "light");
    // }

    const conversationHistory = localStorage.getItem("conversationHistory");

    if (conversationHistory) {
      setConversations(JSON.parse(conversationHistory));
    }

    const selectedConversation = localStorage.getItem("selectedConversation");

    if (selectedConversation) {
      setSelectedConversation(JSON.parse(selectedConversation));
    } else {
      setSelectedConversation({
        id: 1,
        name: "New conversation",
        messages: [],
      });
    }
  }, []);

  // sidebar ref for click outside of sidebar to close it
  const sidebarRef = useRef<HTMLDivElement>(null);

  // when sidebar is open and user clicks outside of it, close it
  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setShowSidebar(false);
    }
  };

  // add event listener for click outside of sidebar to close it
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSidebar]);

  // variants for sidebar
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
    <>
      <Head>
        <title>Chatbot</title>
        <meta
          name="description"
          content="An advanced chatbot starter kit for OpenAI's chat model using Next.js, TypeScript, and Tailwind CSS."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>

      {selectedConversation && (
        <div className={`flex h-screen text-white relative  ${lightMode}`}>
          <AnimatePresence>
            {showSidebar && (
              <motion.div
                variants={backgroundVariants}
                initial="initial"
                animate="visible"
                exit="hidden"
                className="lg:static fixed inset-0 z-10 lg:hidden"
              ></motion.div>
            )}
          </AnimatePresence>
          <div
            ref={sidebarRef}
            className={`h-full lg:z-0 z-20 lg:pt-2 pt-5 flex flex-col bg-slate-1100 min-w-[300px] max-w-[300px] lg:static absolute left-0 inset-y-0 transition-transform duration-200 ${
              showSidebar
                ? "translate-x-0"
                : "lg:translate-x-0 -translate-x-full"
            }`}
          >
            <Sidebar
              loading={disabled}
              conversations={conversations}
              selectedConversation={selectedConversation}
              onNewConversation={handleNewConversation}
              onSelectConversation={handleSelectConversation}
              onDeleteConversation={handleDeleteConversation}
              onToggleSidebar={() => setShowSidebar(!showSidebar)}
              onRenameConversation={handleRenameConversation}
            />
          </div>

          {!showSidebar && (
            <IconAlignLeft
              className="mt-5 z-10 absolute top-1 left-4 text-white cursor-pointer  hover:text-gray-300 lg:hidden"
              size={32}
              onClick={() => setShowSidebar(!showSidebar)}
            />
          )}

          <div className="w-full h-full relative">
            <Animation />
            <Chat
              onNewConversation={handleNewConversation}
              disabled={disabled}
              model={model}
              messages={selectedConversation.messages}
              loading={loading}
              onSend={handleSend}
              onSelect={setModel}
              stopConversationRef={stopConversationRef}
            />
          </div>
        </div>
      )}
    </>
  );
}
