"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { joinWaitlist } from "@/app/actions"
import { useFormStatus } from "react-dom"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="h-12 px-6 bg-violet-600 hover:bg-violet-700" disabled={pending}>
      {pending ? "Joining..." : "Join Waitlist"}
    </Button>
  )
}

export function WaitlistForm() {
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)

  async function handleSubmit(formData: FormData) {
    const result = await joinWaitlist(formData)

    if (result.success) {
      setMessage({ text: result.message, type: "success" })
      // Reset form
      const form = document.getElementById("waitlist-form") as HTMLFormElement
      form.reset()
    } else {
      setMessage({ text: result.message, type: "error" })
    }
  }

  return (
    <div className="w-full">
      <form id="waitlist-form" action={handleSubmit} className="space-y-3">
        <div className="flex gap-2">
          <Input type="email" name="email" placeholder="Enter your email address" className="h-12" required />
          <SubmitButton />
        </div>

        {message && (
          <div
            className={`text-sm p-2 rounded ${
              message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}
      </form>

      <p className="text-sm text-zinc-500 mt-2">Be among the first to access our beta. Limited spots available.</p>
    </div>
  )
}

