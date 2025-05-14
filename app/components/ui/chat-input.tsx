
"use client"

import type React from "react"

import type { FormEvent } from "react"
import { Button } from "../ui/Button"
import { Textarea } from "../ui/textarea"
import { SendIcon } from "lucide-react"

interface ChatInputProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  isLoading: boolean
}

export default function ChatInput({ input, handleInputChange, handleSubmit, isLoading }: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (input.trim() && !isLoading) {
        const form = e.currentTarget.form
        if (form) form.requestSubmit()
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Textarea
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
        className="resize-none pr-14 min-h-[60px] max-h-[200px]"
        disabled={isLoading}
      />
      <Button type="submit" size="icon" className="absolute right-2 bottom-2" disabled={!input.trim() || isLoading}>
        <SendIcon className="h-4 w-4" />
      </Button>
    </form>
  )
}
