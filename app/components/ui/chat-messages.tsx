"use client"

import { useRef, useEffect } from "react"
import type { Message, RoleType } from "@/types"
import { Avatar } from "../ui/avatar"
import { Card } from "../ui/card"
import { AlertCircle, Bot, User, ShieldAlert } from "lucide-react"
import { Alert, AlertDescription } from "../ui/alert"
import { cn } from "../../lib/utils"

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
  error: Error | null
}

function getRoleMeta(role: RoleType) {
  switch (role) {
    case "user":
      return {
        label: "You",
        icon: <User className="h-4 w-4" />,
        avatarClass: "bg-accent text-accent-foreground",
        bubbleClass: "ml-auto bg-card text-textPrimary shadow-card border border-border",
      }
    case "assistant":
      return {
        label: "Assistant",
        icon: <Bot className="h-4 w-4" />,
        avatarClass: "bg-muted text-textPrimary",
        bubbleClass: "mr-auto bg-card text-textPrimary shadow-card border border-border",
      }
    case "system":
      return {
        label: "System",
        icon: <ShieldAlert className="h-4 w-4" />,
        avatarClass: "bg-yellow-400 text-yellow-900",
        bubbleClass: "mx-auto bg-yellow-100 text-yellow-900 border border-yellow-300",
      }
    default:
      return {
        label: role,
        icon: null,
        avatarClass: "",
        bubbleClass: "",
      }
  }
}

function formatTimestamp(date: Date | string | number) {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}


export default function ChatMessages({ messages, isLoading, error }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  if (messages.length === 0 && !isLoading && !error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <Bot className="h-12 w-12 mb-4 text-muted-foreground" />
        <h3 className="text-xl font-semibold mb-2">How can I help you today?</h3>
        <p className="text-muted-foreground max-w-md">
          Ask me anything and I'll do my best to assist you with your needs. I can answer questions, provide information, or just chat.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4 max-w-3xl mx-auto bg-background min-h-screen px-2 py-6 rounded-lg">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error.message || "Something went wrong. Please try again."}</AlertDescription>
        </Alert>
      )}

      {messages.map((message, index) => {
        const meta = getRoleMeta(message.role as RoleType)
        return (
          <Card
            key={index}
            className={cn(
              "p-4 max-w-[85%] shadow-card",
              meta.bubbleClass
            )}
          >
            <div className="flex items-start gap-3">
              <Avatar className={cn("h-8 w-8 mt-0.5 border border-border", meta.avatarClass)}>
                {meta.icon}
              </Avatar>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-textPrimary">{meta.label}</span>
                  <span className="text-xs text-textSecondary">{formatTimestamp(Date.now())}</span>
                </div>
                <div>
                  <span>{message.content}</span>
                </div>
              </div>
            </div>
          </Card>
        )
      })}

      {isLoading && (
        <Card className="p-4 max-w-[85%] mr-auto bg-card text-textPrimary shadow-card border border-border">
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8 mt-0.5 bg-muted text-textPrimary border border-border">
              <Bot className="h-4 w-4" />
            </Avatar>
            <div className="space-y-2 w-full">
              <div className="font-semibold text-textPrimary">Assistant</div>
              <div className="flex space-x-2">
                <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce" />
                <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce delay-75" />
                <div className="h-2 w-2 rounded-full bg-muted-foreground/30 animate-bounce delay-150" />
              </div>
            </div>
          </div>
        </Card>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}
