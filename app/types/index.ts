/**
 * RoleType defines the allowed roles for chat messages.
 */
export type RoleType = "user" | "assistant" | "system";

/**
 * Message represents a single chat message.
 */
export interface Message {
  role: RoleType;
  content: string;
}
  