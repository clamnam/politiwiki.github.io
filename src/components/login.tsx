

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
const formSchema = z.object({
    username: z.string().min(1)
        .max(30, { message: "Username must be less than 30 characters." }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters." })
        .max(30, { message: "Password must be less than 30 characters." }),


})
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
import { Card } from "./ui/card"
import { useState } from "react"
import TokenService from "@/api/tokenService"


export default function Login() {
    const [status, setStatus] = useState<string | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })


    async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
        try {
            axios.post(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_LOGIN_ENDPOINT}`, values)
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    TokenService.tokenSave(response.data.token);
                    setStatus("Login successful");
                } if (response.status === 401) {
                    setStatus("Login failed");
                }

            });
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <Card className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="p-6 border-2 border-solid bg-white w-full max-w-sm">
                <div className="bg-green-400">
                    {status}
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="my-2">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <>
                                        <FormItem>
                                            <FormLabel>Username </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>

                                    </>
                                )}
                            />
                        </div>
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button className="my-2 hover:border-red-500 hover:grow" variant="outline" type="submit">Submit</Button>
                    </form>
                </Form>            </div>

        </Card>
    );
};




