import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { useAuth } from '@/context/AuthContext';
import { UserData } from "@/types";


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
// import UserService from "@/api/UserService"
import { Link, useNavigate } from "react-router-dom"




const formSchema = z.object({
    username: z.string().min(1)
        .max(30, { message: "Username must be less than 30 characters." }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters." })
        .max(30, { message: "Password must be less than 30 characters." }),
})


export default function Login() {
    const navigate = useNavigate(); // Initialize the navigate function
    const { login, isLoggedIn } = useAuth();
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
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_LOGIN_ENDPOINT}`, values);
            console.log(response)
            const userdata: UserData = {
                id: response.data.id,
                email: response.data.email,
                username: response.data.username,
                token: response.data.token,
                role_id: response.data.role_id,
                created_at: response.data.created_at
            }
            console.log(userdata);
            if (response.status === 200) {
                login(userdata); // Use the context function instead
                setStatus("Login successful");
                navigate("/pages");

                window.location.reload();

            }
        } catch (error) {
            setStatus("Login failed");
            console.error(error);
        }
    }
    if (isLoggedIn) {
        return <div className=""><>already logged in  </> <Link className="underline" to={"/"}>go to content?</Link></div>
    }
    return (
        <>
            <div className="no-flex sm:flex min-h-screen items-center justify-center text-foreground p-6">

                <div className="text-6xl m-4">LOGIN</div>
                <Card className="p-6 w-full max-w-sm border-foreground">

                    <Form {...form}>
                        <div className="bg-green-400">
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
                                    )} />
                            </div>
                            <FormField control={form.control} name="password" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <div className=" my-1 px-1">{status ? <div className="bg-red-500 my-1 px-1">{status}. <Link className="hover:underline" to='/register'>Create an Account here</Link></div> : <>&nbsp;</>}</div>
                            <div className="flex flex-col">
                            <Button className="" variant="submit" type="submit">Log in</Button>
                            <Link className='underline hover:no-underline m-6' to={"/register"}>Dont have an account?</Link>
                            </div>
                        </form>
                    </Form>

                </Card>
            </div></>
    );
};




