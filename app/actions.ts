"use server"

import { cookies } from "next/headers"
import { createServerSupabaseClient } from "@/lib/supabase"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

interface MessageInput {
  name: string
  email: string
  message: string
}

export async function submitMessage(data: MessageInput) {
  const supabase = createServerSupabaseClient()

  // Get the user session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    throw new Error("You must be logged in to submit a message")
  }

  // Insert the message with the user_id
  const { error } = await supabase.from("messages").insert({
    name: data.name,
    email: data.email,
    message: data.message,
    user_id: session.user.id,
  })

  if (error) {
    throw new Error(error.message)
  }

  // Revalidate the dashboard page to show the new message
  revalidatePath("/dashboard")

  return { success: true }
}

export async function signOut() {
  const supabase = createServerSupabaseClient()
  await supabase.auth.signOut()
  cookies().delete("supabase-auth-token")
  redirect("/login")
}

