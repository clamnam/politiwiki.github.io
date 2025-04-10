import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import TokenService from "@/api/tokenService";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContentData } from "./useContentData";
import ContentQueueItem from "./ContentQueueItem";
import ContentHistoryItem from "./ContentHistoryItem";
import { QueueFormData } from "../../../types";

const formSchema = z.object({
  queue_index: z.number().int().min(0),
});

const ContentConfirmQueue = () => {
  const { id } = useParams();
  const [showContentQueue, setShowContentQueue] = useState(true);
  const navigate = useNavigate();
  const { page, content, isLoading, error } = useContentData(id);
  const auth = TokenService.tokenRetrieval();
  const isLoggedIn = auth !== null;

  const form = useForm<QueueFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      queue_index: -1,
    },
  });

  async function onSubmit(values: QueueFormData): Promise<void> {
    const token = TokenService.tokenRetrieval();
    const url = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CONTENT_ENDPOINT}/${id}`;

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
    form.handleSubmit(onSubmit)();
    console.log("Approve clicked for index:", index);
  };

  if (isLoading) {
    return <div className="">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="text-white">
      <Link className="m-2 hover:underline text-white underline-offset-8" to={`/page/${id}`}>
        &lt; Back
      </Link>

      <div className="text-neutral-500 justify-between my-8">
        <div className="font-serif font-medium text-white text-4xl">
          {page?.title}
        </div>

        <div className="flex space-x-4 mb-6">
          <Button
            className={`${showContentQueue ? 'underline underline-offset-4 text-white' : ''} hover:underline font-sans hover:underline-offset-4 text-lg`}
            onClick={() => setShowContentQueue(true)}
          >
            Content queue
          </Button>
          {isLoggedIn?(
          <Button
            className={`${!showContentQueue ? 'underline underline-offset-4 text-white' : ''} hover:underline font-sans hover:underline-offset-4 text-lg`}
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
