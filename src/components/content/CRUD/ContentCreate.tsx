// import  { PureComponent } from 'react';
// import ReactDiffViewer from 'react-diff-viewer-continued';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
const formSchema = z.object({
  title: z.string().min(1).max(100),
  content_body: z.string().min(1).max(1000),
  content_type: z.number().int(),
  order_id: z.number().int(),
  page_id: z.number().int(),
  status: z.number().int(),


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




const ContentCreate = () => {
  // const [data, setData] = useState(null);
  // const [content, setContent] = useState(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content_type: 1,
      content_body: "",
      order_id: 2,
      page_id: 2,
      status: 1
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    console.log(values);
    axios.post(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CONTENT_ENDPOINT}`, values)
      .then(function (response) {
        console.log(response);
      });
  }


  return (
    <>
      {/* {diff} */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Content Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. section name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>

              </>
            )}
          />
          <FormField control={form.control} name="content_body" render={({ field }) => (
            <FormItem>
              <FormLabel>Content Body</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g. relevant information" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <Button variant="outline" type="submit">Submit</Button>
        </form>
      </Form>
      

    </>
  );
};

export default ContentCreate;


