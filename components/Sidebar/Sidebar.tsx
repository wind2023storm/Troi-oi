import { Conversation } from "@/types";
import { IconPlus, IconX } from "@tabler/icons-react";
import Image from "next/image";
import { FC } from "react";
import logo from "../../assets/images/logo.png";
import typemark from "../../assets/images/typemark.png";
import { Conversations } from "./Conversations";
import SidebarBottom from "./SidebarBottom";

interface Props {
  loading: boolean;
  conversations: Conversation[];
  selectedConversation: Conversation;
  onNewConversation: () => void;

  onSelectConversation: (conversation: Conversation) => void;
  onDeleteConversation: (conversation: Conversation) => void;
  onToggleSidebar: () => void;
  onRenameConversation: (conversation: Conversation, name: string) => void;
}

export const Sidebar: FC<Props> = ({
  loading,
  conversations,
  selectedConversation,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
  onToggleSidebar,
  onRenameConversation,
}) => {
  return (
    <>
      {/* Logo */}
      <div className="flex justify-center items-center gap-2 lg:pt-4 pb-2">
        <Image src={logo} className="w-8" alt="logo" />
        <Image src={typemark} className="h-5 w-auto" alt="logo" />
      </div>

      <div className="flex items-center h-[60px] pl-2 lg:pr-2">
        <button
          className="flex items-center w-full h-[40px] rounded-lg bg-slate-1100 border border-neutral-300 text-sm hover:bg-slate-800"
          onClick={onNewConversation}
        >
          <IconPlus className="ml-4 mr-3" size={16} />
          New chat
        </button>

        <IconX
          className="ml-1 p-1 text-neutral-300 cursor-pointer hover:text-neutral-400 lg:hidden"
          size={38}
          onClick={onToggleSidebar}
        />
      </div>

      <div className="flex flex-1 justify-center overflow-auto">
        <Conversations
          loading={loading}
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={onSelectConversation}
          onDeleteConversation={onDeleteConversation}
          onRenameConversation={onRenameConversation}
        />
      </div>

      <SidebarBottom />
    </>
  );
};
