import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import UserService from "@/api/userService";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContentData } from "./useContentData";
import ContentQueueItem from "./ContentQueueItem";
import ContentHistoryItem from "./ContentHistoryItem";
import { QueueFormData } from "../../../types";

const formSchema = z.object({
  queue_index: z.number().int().min(0),
  approval:z.boolean()
});

const ContentConfirmQueue = () => {
  const { id } = useParams();
  const [showContentQueue, setShowContentQueue] = useState(true);
  const navigate = useNavigate();
  const { page, content, isLoading, error } = useContentData(id);
  const auth = UserService.userRetrieval();
  const isLoggedIn = auth !== null;
// imported type
  const form = useForm<QueueFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      queue_index: -1,
      approval: undefined
    },
  });

  async function onSubmitApproval(values: QueueFormData): Promise<void> {
    const data = UserService.userRetrieval();
    const token = data.token
    const url = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CONTENT_ENDPOINT}/approve/${id}`;
    console.log(url);

    try {
      const response = await axios.patch(
        url,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response);
      navigate(`/page/${id}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  const handleApprove = (index: number) => {
    form.setValue('queue_index', 0);
    form.setValue('approval',true);
    form.handleSubmit(onSubmitApproval)();
    console.log("Approve clicked for index:", index);
  };
  const handleReject = (index: number) => {
    form.setValue('queue_index', 0);
    form.setValue('approval',false);
    form.handleSubmit(onSubmitApproval)();
    console.log("Reject clicked for index:", index);
  };

  if (isLoading) {
    return <div className="">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="mt-4">
      {/* <Link className=" hover:underline  underline-offset-8" to={`/page/${id}`}>
        &lt; Back
      </Link> */}

      <div className=" justify-between mb-8">
        <div className="font-serif font-medium pnb text-4xl">
          {page?.title}
        </div>

        <div className="flex space-x-4 mb-6">
          <Button
            className={`${showContentQueue ? 'underline underline-offset-4 ' : ''} hover:underline font-sans shadow-none hover:underline-offset-4 text-lg`}
            onClick={() => setShowContentQueue(true)}
          >
            Content Queue
          </Button>
          {isLoggedIn?(
          <Button
            className={`${!showContentQueue ? 'underline underline-offset-4 ' : ''} hover:underline font-sans shadow-none hover:underline-offset-4 text-lg`}
            onClick={() => setShowContentQueue(false)}
          >
            Content History
          </Button>
          ):null}
        </div>
          
        {showContentQueue  ? (
          <div>
            {content && Array.isArray(content) && content

              .filter(item => item.queue !== "[]")
              .map((item, index) => (
                
                <ContentQueueItem
                  key={index}
                  item={item}
                  index={index}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
          </div>
        ) : (
          
          <div>
            {content && Array.isArray(content) && content
              .filter(item => item.history !== "[]")
              .map((item, index) => (
                <ContentHistoryItem
                  key={index}
                  item={item}
                  index={index}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentConfirmQueue;
