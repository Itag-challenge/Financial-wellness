"use client";

import React, { useState, useCallback, type FormEvent } from "react";
import type { Message, RoleType } from "@/types";
import { v4 as uuidv4 } from "uuid";

/**
 * Conversation represents a chat conversation.
 * @typedef {Object} Conversation
 * @property {string} id - Unique identifier for the conversation.
 * @property {string} title - Title of the conversation.
 * @property {Date} timestamp - Timestamp of the conversation creation.
 */
export type Conversation = {
  id: string;
  title: string;
  timestamp: Date;
};

/**
 * useConversations manages the list of conversations and the current conversation.
 * @returns {{
 *   conversations: Conversation[];
 *   currentConversationId: string;
 *   startNewConversation: () => void;
 *   selectConversation: (id: string) => void;
 *   updateConversationTitle: (id: string, title: string) => void;
 *   setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
 *   setCurrentConversationId: React.Dispatch<React.SetStateAction<string>>;
 * }}
 */
export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "default",
      title: "New conversation",
      timestamp: null, // SSR-safe initial value
    },
  ]);
  const [currentConversationId, setCurrentConversationId] = useState<string>("default");

  // Hydrate from localStorage on client
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("conversations");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setConversations(
            parsed.map((conv: any) => ({
              ...conv,
              timestamp: new Date(conv.timestamp),
            }))
          );
        } catch {}
      }
      const storedId = localStorage.getItem("currentConversationId");
      if (storedId) setCurrentConversationId(storedId);
    }
  }, []);

  // Persist conversations to localStorage
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "conversations",
        JSON.stringify(conversations)
      );
    }
  }, [conversations]);

  // Persist currentConversationId to localStorage
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentConversationId", currentConversationId);
    }
  }, [currentConversationId]);

  const startNewConversation = useCallback((): void => {
    const newId = uuidv4();
    setConversations((prev) => [
      ...prev,
      {
        id: newId,
        title: "New conversation",
        timestamp: new Date(),
      },
    ]);
    setCurrentConversationId(newId);
  }, []);

  const selectConversation = useCallback((id: string): void => {
    setCurrentConversationId(id);
  }, []);

  const updateConversationTitle = useCallback((id: string, title: string): void => {
    setConversations((prev) =>
      prev.map((conv) => (conv.id === id ? { ...conv, title } : conv))
    );
  }, []);

  return {
    conversations,
    currentConversationId,
    startNewConversation,
    selectConversation,
    updateConversationTitle,
    setConversations,
    setCurrentConversationId,
  };
}

/**
 * useMessages manages the messages for the current conversation.
 * @returns {{
 *   messages: Message[];
 *   addMessage: (message: Message) => void;
 *   resetMessages: () => void;
 *   setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
 * }}
 */
export function useMessages(conversationId: string) {
  const [messages, setMessages] = useState<Message[]>([]);

  // Hydrate from localStorage on client
  React.useEffect(() => {
    if (typeof window !== "undefined" && conversationId) {
      const stored = localStorage.getItem(`messages_${conversationId}`);
      if (stored) {
        try {
          setMessages(JSON.parse(stored));
        } catch {
          setMessages([]);
        }
      } else {
        setMessages([]);
      }
    }
  }, [conversationId]);

  // Persist messages to localStorage
  React.useEffect(() => {
    if (typeof window !== "undefined" && conversationId) {
      localStorage.setItem(
        `messages_${conversationId}`,
        JSON.stringify(messages)
      );
    }
  }, [messages, conversationId]);

  const addMessage = useCallback((message: Message): void => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const resetMessages = useCallback((): void => {
    setMessages([]);
  }, []);

  return {
    messages,
    addMessage,
    resetMessages,
    setMessages,
  };
}

/**
 * useChat combines conversation and message logic, and handles chat input and API simulation.
 * This is a backward-compatible hook that composes useConversations and useMessages.
 * @returns {{
 *   messages: Message[];
 *   input: string;
 *   handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
 *   handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
 *   isLoading: boolean;
 *   error: Error | null;
 *   conversations: Conversation[];
 *   startNewConversation: () => void;
 *   selectConversation: (id: string) => void;
 *   currentConversationId: string;
 * }}
 */
export function useChat() {
  const {
    conversations,
    currentConversationId,
    startNewConversation,
    selectConversation,
    updateConversationTitle,
    setCurrentConversationId,
  } = useConversations();
  const { messages, addMessage, resetMessages, setMessages } = useMessages(currentConversationId);

  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInput(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      if (!input.trim() || isLoading) return;

      // Add user message
      const userMessage: Message = {
        role: "user" as RoleType,
        content: input.trim(),
      };
      addMessage(userMessage);
      setInput("");
      setIsLoading(true);
      setError(null);

      try {
        // Simulate LLM API call
        const response = await streamChatResponse(input.trim());

        // Add assistant message
        addMessage({
          role: "assistant" as RoleType,
          content: response,
        });

        // Update conversation title if it's the first message
        if (messages.length === 0) {
          updateConversationTitle(currentConversationId, truncateTitle(input.trim()));
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to send message"));
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages.length, currentConversationId, addMessage, updateConversationTitle]
  );

 const streamChatResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch("https://c83fcb6084c2675956e23f3fac1ea3d5.serveo.net/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: prompt }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.answer || typeof data.answer !== "string") {
      throw new Error("Malformed response from API");
    }

    return data.answer;
  } catch (err) {
    console.error("Error during API call:", err);
    throw err;
  }
};


  // When starting a new conversation, reset messages
  const handleStartNewConversation = useCallback((): void => {
    startNewConversation();
    resetMessages();
  }, [startNewConversation, resetMessages]);

  // When selecting a conversation, reset messages (simulate loading)
  const handleSelectConversation = useCallback(
    (id: string): void => {
      selectConversation(id);
      resetMessages(); // Reset messages when switching conversations to avoid hydration mismatch
    },
    [selectConversation, resetMessages]
  );

  const truncateTitle = (text: string): string => {
    return text.length > 30 ? text.substring(0, 30) + "..." : text;
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    conversations,
    startNewConversation: handleStartNewConversation,
    selectConversation: handleSelectConversation,
    currentConversationId,
  };
}
