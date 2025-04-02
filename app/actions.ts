"use server"

import { createClient } from "@supabase/supabase-js"
import { z } from "zod"

// Create a single supabase client for the entire server
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export async function joinWaitlist(formData: FormData) {
  try {
    const email = formData.get("email") as string

    // Validate the email
    const result = schema.safeParse({ email })

    if (!result.success) {
      return {
        success: false,
        message: result.error.errors[0].message,
      }
    }

    // Insert into Supabase
    const { error } = await supabase.from("waitlist").insert([{ email }])

    if (error) {
      // Handle unique constraint violation
      if (error.code === "23505") {
        return {
          success: false,
          message: "This email is already on our waitlist!",
        }
      }

      console.error("Supabase error:", error)
      return {
        success: false,
        message: "Something went wrong. Please try again later.",
      }
    }

    return {
      success: true,
      message: "You have successfully joined our waitlist!",
    }
  } catch (error) {
    console.error("Server action error:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}

