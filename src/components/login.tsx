import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { useAuth } from '@/context/AuthContext';

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
// import TokenService from "@/api/tokenService"
import {  useNavigate } from "react-router-dom"


export default function Login() {
    const navigate = useNavigate(); // Initialize the navigate function
    const { login } = useAuth();
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
                    login(response.data.token); // Use the context function instead
                    setStatus("Login successful");
                    navigate("/pages");
                } if (response.status === 401) {
                    setStatus("Login failed");
                }

            });
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="flex min-h-screen items-center justify-center text-foreground p-6">
            <div className="text-6xl m-4">LOGIN</div>
            <Card className="p-6 w-full max-w-sm border-foreground">
                
                <Form {...form}>
                    <div className="bg-green-400">
                    {status}
                </div>
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
                        <Button className="" variant="submit" type="submit">Log in</Button>
                    </form>
                </Form>            

        </Card>
        </div>
    );
};




