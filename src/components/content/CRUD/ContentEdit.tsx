import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import axios from 'axios';
import UserService from '@/api/userService';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const formSchema = z.object({
  title: z.string().min(1).max(100),
  content_body: z.string().min(1).max(10000),
  order_id: z.number().int(),
  page_id: z.number().int(),
  created_by_id: z.number().int(),
});

export default function ContentEdit() {
  const userdata = UserService.userRetrieval();
  const token = userdata.token;
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const data_content = data?.content;
  const id = data_content?.id;
  const content_to_compare = data_content?.content_body;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CONTENT_ENDPOINT}queue/${id}`;
      const response = await axios.patch(url, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/page/' + data_content?.page_id);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  // Use a single useForm hook
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data_content?.title,
      content_body: content_to_compare || "",
      order_id: data_content?.order_id,
      page_id: data_content?.page_id,
      created_by_id: data_content?.created_by_id,
    },
  });

  const diffValue = watch("content_body") || "";

  return (
    <div className="p-4  flex  ">
      <Card className="p-6 mx-6 w-full max-w-sm  ">

        <form
          onSubmit={handleSubmit(
            onSubmit,
            (errors) => console.error("Form validation errors:", errors)
          )}
          className="space-y-6"
        >
          <div className="flex flex-col">

            <Label htmlFor="content_body" className="mb-1">
              Title
            </Label>
            <Input
              defaultValue={""}
              id="title"
              placeholder="Enter content here..."
              {...register("title")}
              className="p-2 border rounded w-full min-h-max"
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="content_body" className="mb-1">
              Content
            </Label>
            <Textarea rows={10}
              defaultValue={content_to_compare}
              id="content_body"
              placeholder="Enter content here..."
              {...register("content_body")}
              className="p-2 border rounded w-full min-h-max"
            />
            {errors.content_body && (
              <span className="text-red-500 text-sm">
                {errors.content_body.message}
              </span>
            )}

          </div><Button
            variant="submit"
          >
            Submit
          </Button>
        </form>
      </Card>
      {content_to_compare !== diffValue && (
        <ReactDiffViewer 
          oldValue={content_to_compare}
          newValue={diffValue}
          splitView={true}
          compareMethod={DiffMethod.WORDS_WITH_SPACE}
        />
      )}
    </div>
  );
}
