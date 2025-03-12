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
  axios.post(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_PAGE_ENDPOINT}`, values)
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

    <Button type="submit">Submit</Button>
  </form>
</Form>

</>
  );
};

export default PageCreate;


