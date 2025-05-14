"use client"
import { useState } from "react"
import { useChat } from "@/hooks/use-chat"
import ChatSidebar from "../components/ui/chat-sidebar"
import ChatMessages from "../components/ui/chat-messages"
import ChatInput from "../components/ui/chat-input"
import { Button } from "../components/ui/Button"
import { PanelLeftIcon, PanelLeftCloseIcon } from "lucide-react"

export default function ChatInterface() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    conversations,
    startNewConversation,
    selectConversation,
    currentConversationId,
  } = useChat()

  return (
    <div className="flex w-full h-screen bg-background">
      <div
        className={`${
          sidebarOpen ? "w-80" : "w-0"
        } transition-all duration-300 ease-in-out overflow-hidden border-r border-border h-screen`}
      >
        <ChatSidebar
          conversations={conversations}
          onSelectConversation={selectConversation}
          onNewConversation={startNewConversation}
          currentConversationId={currentConversationId}
        />
      </div>

      <div className="flex-1 flex flex-col h-screen relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 z-10"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <PanelLeftCloseIcon className="h-5 w-5" /> : <PanelLeftIcon className="h-5 w-5" />}
        </Button>

        <div className="flex-1 overflow-auto p-4 pt-16">
          <ChatMessages messages={messages} isLoading={isLoading} error={error} />
        </div>

        <div className="p-4 border-t border-border">
          <ChatInput
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
