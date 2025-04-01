import type { Message } from "@/types/supabase"
import { formatDate } from "@/lib/utils"

interface MessageListProps {
  messages: Message[]
}

export default function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No messages yet. Be the first to leave a message!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recent Messages</h2>

      <div className="divide-y divide-gray-200">
        {messages.map((message) => (
          <div key={message.id} className="py-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{message.name}</h3>
                <p className="text-sm text-gray-500">{message.email}</p>
              </div>
              <span className="text-xs text-gray-500">{formatDate(message.created_at)}</span>
            </div>
            <p className="mt-2 text-gray-700">{message.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

