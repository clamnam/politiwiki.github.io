// import  { PureComponent } from 'react';
// import ReactDiffViewer from 'react-diff-viewer-continued';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
const x = import.meta.env.VITE_API_PAGE_TYPE_COUNT
const page_type_count: number = (x);
//janky thought still in rust mindset
const page_types = new Map<number, string>();
for (let i = 0; i < page_type_count; i++) {
  const type = import.meta.env[`VITE_API_PAGE_TYPE_${i}`];
  page_types.set(i, type);
}
const formSchema = z.object({
  title: z.string().min(1).max(100),
  page_type: z.number().min(0).max(page_type_count + 1),
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
import TokenService from "@/api/tokenService";
import { Card } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"




const PageCreate = () => {
  // const [data, setData] = useState(null);
  // const [content, setContent] = useState(null);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      page_type: 0,
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
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
        navigate(`/page/${response.data.id}`);

      })
      .catch((error) => {
        console.error(error);
      });

    axios.post(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_PAGE_ENDPOINT}`, values)
      .then(function (response) {
        console.log(values);

        console.log(response);
      });
  }

  const Dropdown = () => {
    return (
      <SelectContent className="bg-secondary-background">
        {Array.from(page_types).map(([key, value]) => (
          <SelectItem className="bg-secondary" key={key} value={String(key)}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    );
  }


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
                name="page_type"
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


