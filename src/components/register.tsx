import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"

import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '@/context/AuthContext';
import {UserData} from '../types'

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

const formSchema = z.object({
    email: z.string()
        .nonempty({ message: "Email is required." })
        .max(254, { message: "Email must be less than 254 characters." })
        .email({ message: "Invalid email address." })
        .refine((val) => emailRegex.test(val), { message: "Email format is not valid." }),
    username: z.string().min(1)
        .max(30, { message: "Username must be less than 30 characters." }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters." })
        .max(30, { message: "Password must be less than 30 characters." }),
});
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


export default function Register() {
    const navigate = useNavigate();
    const { login, isLoggedIn } = useAuth();
    const [status, setStatus] = useState<string | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
            password: ""
        },
    })


    async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_REGISTER_ENDPOINT}`, values);
            console.log(response);
            const userdata: UserData = {
                id: response.data.id,
                email: response.data.email,
                username:  response.data.username,
                token: response.data.token,
                role_id: response.data.role_id,
                created_at:response.data.create_at
            }
            login(userdata);

            setStatus("Register successful");
            // Redirect to pages after successful registration
            navigate("/pages");

            window.location.reload()

            }catch (error) {
            console.error(error)
            setStatus("Register failed.");

        }
    }
    if (isLoggedIn) {
        return <div className=""><>already logged in  </> <Link className="underline" to={"/"}>go to content?</Link></div>
    }
    // Rest of your component remains the same
    return (
        <div className="no-flex sm:flex  min-h-screen items-center justify-center text-foreground p-6">
            <div className="text-6xl m-4">REGISTER</div>
            <Card className="p-6 w-full max-w-sm border-foreground ">
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <>
                                    <FormItem className="my-2">
                                        <FormLabel> Email </FormLabel>
                                        <FormControl>
                                            <Input placeholder="example@email.com" type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <div className="my-2">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <>
                                        <FormItem className="my-2">
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
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className=" my-1 px-1">{status ? <div className="bg-red-500 my-1 px-1">{status}. <Link className="hover:underline" to='/login'>Already have an account?</Link></div> : <>&nbsp;</>}</div>
                        <div className="flex flex-col">

                        <Button className="" variant="submit" type="submit">
                            Submit
                        </Button>
                        <Link className='underline hover:no-underline m-6' to={"/login"}>Already have an account?</Link>
                    </div>
                    </form>
                </Form>
            </Card>
        </div>
    );
};