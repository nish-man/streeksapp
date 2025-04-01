import { createServerSupabaseClient } from "@/lib/supabase"
import { redirect } from "next/navigation"
import MessageForm from "@/components/MessageForm"
import MessageList from "@/components/MessageList"
import { signOut } from "@/app/actions"

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Fetch messages
  const { data: messages } = await supabase.from("messages").select("*").order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <form action={signOut}>
            <button type="submit" className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md">
              Sign Out
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MessageForm />

          <div className="bg-white p-6 rounded-lg shadow-md">
            <MessageList messages={messages || []} />
          </div>
        </div>
      </main>
    </div>
  )
}

