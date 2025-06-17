"use client"
import React from "react"
import { toast } from "sonner"
import { Loader2Icon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type RequestNewsSchema, requestNewsSchema } from "@/lib/schemas/requestNews"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default function Page() {
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const form = useForm<RequestNewsSchema>({
        resolver: zodResolver(requestNewsSchema),
        defaultValues: {
            keyword: "",
        },
    })

    async function submitFunc({ keyword }: RequestNewsSchema) {
        setIsSubmitting(true)
        await fetch(`/api/news?keywords=${encodeURIComponent(keyword)}`);
        setIsSubmitting(false)
        toast("sent request")
        form.reset()
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitFunc)} className="w-[90%] max-w-[500px] space-y-8">
                    <FormField
                        control={form.control}
                        name="keyword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Key word</FormLabel>
                                <FormControl>
                                    <Input placeholder="Search term" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isSubmitting}>
                        {
                            isSubmitting
                                ? (
                                    <span>
                                        <Loader2Icon className="animate-spin" />
                                        <span>Submitting</span>
                                    </span>
                                )
                                : <span>Submit</span>
                        }
                    </Button>
                </form>
            </Form>
        </div>
    )
}