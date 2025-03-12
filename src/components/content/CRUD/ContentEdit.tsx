import ReactDiffViewer from 'react-diff-viewer-continued';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const oldData = `
const a = 10
const b = 10
const c = () => console.log('foo')

if(a > 10) {
  console.log('bar')
}

console.log('done')
`;

const formSchema = z.object({
  username: z.string().min(2).max(50),
  diff: z.string().optional(),
});

export default function ContentCreate() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      diff: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form values:", values);
  }

  const diffValue = watch("diff") || "";

  return (
    <div className="p-4 space-y-8">
      <ReactDiffViewer oldValue={oldData} newValue={diffValue} splitView={true} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-1">
            Username
          </label>
          <input
            id="username"
            placeholder="Enter your username"
            {...register("username")}
            className="p-2 border rounded"
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="diff" className="mb-1">
            Content
          </label>
          <textarea
            id="diff"
            placeholder="Enter content here..."
            {...register("diff")}
            className="p-2 border rounded w-full"
          />
          {errors.diff && (
            <span className="text-red-500 text-sm">
              {errors.diff.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
