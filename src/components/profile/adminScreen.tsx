import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import UserService from "@/api/userService";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Card } from "../ui/card";
import { useState } from "react";


const formSchema = z.object({
    name: z.string().min(4)
})
export default function AdminScreen() {
    const data = UserService.userRetrieval();
    const [status,setStatus]=useState(<></>);
    const token = data.token;


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

        axios.post(
            `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CATEGORY_ENDPOINT}`,
            values,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => {
                setStatus(<div className="bg-green-400">success adding {response.data.name}</div>);
                console.log(response);

            })
            .catch((error) => {
                setStatus(<div className="bg-red-400">success</div>);

                console.error(error);
            });


    }

    return (

        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">Add Categories</Button>
            </DrawerTrigger>
            <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Add Categories </DrawerTitle>
                    </DrawerHeader>
                    <Card className="mx-auto px-4 mb-4 w-full max-w-sm">
                    <div>{status}</div>
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Page Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. party name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="mt-8" variant="submit" type="submit">Submit</Button>
                        </form>
                    </FormProvider>
                    
                </Card>
                <DrawerFooter className="mt-20">
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
            </DrawerContent>
        </Drawer>

    );
}