export interface Message {
  id: number
  created_at: string
  name: string
  email: string
  message: string
  user_id: string
}

export interface Database {
  public: {
    Tables: {
      messages: {
        Row: Message
        Insert: Omit<Message, "id" | "created_at">
        Update: Partial<Omit<Message, "id" | "created_at">>
      }
    }
  }
}

export interface UserSession {
  user: {
    id: string
    email: string
  } | null
  error: Error | null
}

