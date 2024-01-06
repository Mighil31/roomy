export interface ConversedUser {
  userId: number | null;
  name: string | null;
  conversationId: number | null;
}

export interface Message {
  messageId: number | null;
  conversationId: number | null;
  senderId: number | null;
  content: string | null;
  sent_at: Date | null;
}
