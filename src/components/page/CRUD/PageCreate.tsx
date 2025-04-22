// import  { PureComponent } from 'react';
// import ReactDiffViewer from 'react-diff-viewer-continued';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
const x = import.meta.env.VITE_API_PAGE_TYPE_COUNT
const category_count: number = (x);

import { useState } from "react";

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
import UserService from "@/api/userService";
import { Card } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect } from "react"

//janky thought still in rust mindset
const formSchema = z.object({
  title: z.string().min(1).max(100),
  category: z.number().min(0).max(category_count + 1),
})


const PageCreate = () => {

  // const [data, setData] = useState(null);
  // const [content, setContent] = useState(null);
  const navigate = useNavigate();
  const data = UserService.userRetrieval();
  const token = data?.token
//  TODO change to unauthorized
  if(!token){
   navigate("/") 
  }

  const [categories, setCategories] = useState<object>();
  useEffect(() => {
    const fetchCategories = async () => {
      const url = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CATEGORY_ENDPOINT}`;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data)
        console.log(response.data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };
    fetchCategories();
  }, [token]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: 0,
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = UserService.userRetrieval();
    const token = data.token;
    console.log(values);
    axios.post(
      `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_PAGE_ENDPOINT}`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        console.log(response);
        navigate(`/page/${response.data.id}`);

      })
      .catch((error) => {
        console.error(error);
      });

  
  }

  const Dropdown = () => (
    <SelectContent className="bg-background">
      {categories && Object.entries(categories).map(([key, value]) => (
        <SelectItem className="bg-foreground/10" key={key} value={String(value.id)}>
          {value.name}
        </SelectItem>
      ))}
    </SelectContent>
  );


  return (
    <>

      {/* {diff} */}
      <div className="p-6 items-center text-foreground">
        <Card className="p-6 w-full max-w-sm ">
          <div className="text-2xl  font-serif">Create a Page </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
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
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="mt-8">
                    <FormLabel>Page Type</FormLabel>
                    <Select onValueChange={(value: string) => field.onChange(parseInt(value, 10))} defaultValue={String(field.value)}>
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a party" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="">
                        <Dropdown />
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="mt-8" variant="submit" type="submit">Submit</Button>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default PageCreate;


