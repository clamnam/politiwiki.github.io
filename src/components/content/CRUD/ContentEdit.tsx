import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import axios from 'axios';
import TokenService from '@/api/tokenService';



const formSchema = z.object({
  title: z.string().min(1).max(100),
  content_body: z.string().min(1).max(1000),
  order_id: z.number().int(),
  page_id: z.number().int(),
  created_by_id: z.number().int(),


})

export default function ContentEdit() {
  const token = TokenService.tokenRetrieval();
  const navigate = useNavigate(); // Initialize the navigate function

  // const [currentContent, setCurrentContent] = useState();
  const location = useLocation();
  const data = location.state;
  const data_content = data?.content;
  
  const id = data_content?.id;
  const content_to_compare = data_content?.content_body;
  console.log(data_content.id);
  // const old_content_id = data_content?.old_content_id;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const url= `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CONTENT_ENDPOINT}/queue/${id}`;
      const response = await axios.patch(
        url,
        values,
        {
          
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/page/' + data_content?.page_id )
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data_content?.title,
      content_body: content_to_compare || "", // Use content_to_compare as default
      order_id: data_content?.order_id,
      page_id: data_content?.page_id,
      created_by_id: data_content?.created_by_id,
    },
  })

  // Update your useForm hook to use content_to_compare as default
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content_body: content_to_compare || "", // Use content_to_compare as default
    },
  });

  const diffValue = watch("content_body") || "";

  return (
    <div className="p-4 space-y-8 text-white">
      <ReactDiffViewer oldValue={content_to_compare} newValue={diffValue} splitView={true} compareMethod={DiffMethod.WORDS_WITH_SPACE} />
      <form
        onSubmit={form.handleSubmit(
          onSubmit,
          (errors) => console.error("Form validation errors:", errors)
        )} className="space-y-6">

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
        </div>

        <Button
          variant="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
