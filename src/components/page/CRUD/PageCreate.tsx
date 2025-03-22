// import  { PureComponent } from 'react';
// import ReactDiffViewer from 'react-diff-viewer-continued';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
const formSchema = z.object({
  title: z.string().min(1).max(100),
})
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import TokenService from "@/api/tokenService";
import { Card } from "@/components/ui/card"




const PageCreate = () => {
  // const [data, setData] = useState(null);
  // const [content, setContent] = useState(null);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const token = TokenService.tokenRetrieval();
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
      })
      .catch((error) => {
        console.error(error);
      });

    axios.post(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_PAGE_ENDPOINT}`, values)

      .then(function (response) {
        console.log(response);
      });
  }



  return (
    <>
      <div className="px-3 text-2xl text-white">Create a Page </div>

      {/* {diff} */}
      <div className=" flex w-full items-center  p-6 md:p-10">
        <Card className=" p-6 w-full max-w-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. party name" {...field} />
                    </FormControl>
                    <FormDescription>This is the pages name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button variant="submit" type="submit">Submit</Button>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default PageCreate;


