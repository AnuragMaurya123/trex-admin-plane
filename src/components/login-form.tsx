"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { login, setIsLoading } from "@/slices/adminSlice"
import FormInput from "./form-components/form-input"

export const adminLoginSchema = z.object({
  username: z.string().email({ message: "Please enter a valid Username" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export default function LoginForm() {
  const router = useRouter()
  const { loading } = useAppSelector(state => state.admin)
  const dispatch = useAppDispatch()

  const form = useForm<z.infer<typeof adminLoginSchema>>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof adminLoginSchema>) {
    dispatch(setIsLoading(true))  // Set loading true before login

    // Simulate API call
    setTimeout(() => {
      dispatch(login(values))
      dispatch(setIsLoading(false))
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="w-full space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput control={form.control} label="Username" name={"username"} placeHolder="Enter your Username" type="text" />
          <FormInput control={form.control} label="Password" name={"password"} placeHolder="Enter your Password" type="password" />
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 text-base text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
