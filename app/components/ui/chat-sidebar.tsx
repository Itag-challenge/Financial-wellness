"use client"

import { Button } from "../ui/Button"
import { ScrollArea } from "../ui/scroll-area"
import { PlusIcon } from "lucide-react"

type Conversation = {
  id: string
  title: string
  timestamp: Date
}

interface ChatSidebarProps {
  conversations: Conversation[]
  onSelectConversation: (id: string) => void
  onNewConversation: () => void
  currentConversationId: string | null
}

export default function ChatSidebar({
  conversations,
  onSelectConversation,
  onNewConversation,
  currentConversationId,
}: ChatSidebarProps) {
  return (
    <div className="flex flex-col h-full bg-background border-r border-border/30">
      <div className="p-4">
        <Button 
          onClick={onNewConversation} 
          className="w-full justify-start font-normal hover:bg-primary/10 transition-colors"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1 px-2">
        {conversations.map((conversation) => (
          <div 
            key={conversation.id}
            className={`
              w-full mb-1 rounded-md p-3 cursor-pointer
              ${currentConversationId === conversation.id 
                ? 'bg-secondary/60 text-foreground' 
                : 'text-muted-foreground hover:bg-secondary/30'}
              transition-colors duration-200
            `}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <div className="truncate text-sm">{conversation.title}</div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t border-border/30">
        <div className="text-xs text-muted-foreground">Powered by FEHUR</div>
      </div>
    </div>
  )
}