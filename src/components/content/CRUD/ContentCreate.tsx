// import  { PureComponent } from 'react';
// import ReactDiffViewer from 'react-diff-viewer-continued';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useLocation, useNavigate } from 'react-router-dom';

import axios from "axios"
const formSchema = z.object({
  title: z.string().min(1).max(100),
  content_body: z.string().min(1).max(10000),
  content_type: z.number().int(),
  order_id: z.number().int(),
  page_id: z.number().int(),


})
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import UserService from "@/api/userService"
import { useEffect, useState } from "react";



const ContentCreate = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [orderNum, setOrderNum] = useState(0);
  const location = useLocation();
  const pageData = location.state;
  if (pageData?.page === undefined || isNaN(Number(pageData.page))) {
    navigate('/pages');
  }

  const pageIdNumber = parseInt(pageData.page, 10);

  // Add debugging
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CONTENT_ENDPOINT}bypage/${pageIdNumber}`;
        axios.get(apiUrl).then((response) => {
          setOrderNum((response.data).length);
        });
      } catch (err) {
        console.error(err);
      }

    };
    if (pageIdNumber) fetchData();

  }, [pageIdNumber]);

  // More explicit conversion

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content_type: 1,
      content_body: "",
      order_id: orderNum,
      page_id: pageIdNumber, // Use the explicitly converted number
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    const data = UserService.userRetrieval();
    const token = data.token;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CONTENT_ENDPOINT}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response);
      console.log(pageData.page);
      // Show success message or redirect user
      navigate(`/page/${Number(pageData.page)}`); // Redirect to the page view after successful creation
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error - show error message to user
    }
  }


  return (
    <>
      <div className=" p-6 md:p-10">
        <Card className="p-6 w-full max-w-sm  ">
          <div className="text-2xl font-serif">Create Content </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                onSubmit,
                (errors) => console.error("Form validation errors:", errors)
              )}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel>Content Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. section name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content_body"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel>Content Body</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g. relevant information" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="my-2"
                variant="submit"
                type="submit"
                onClick={() => console.log("Button clicked")}
              >
                Submit
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default ContentCreate;





