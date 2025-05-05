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
  approval: z.boolean(),
  content_id: z.number().int().optional() // Add content_id to schema
});

const ContentConfirmQueue = () => {
  const { id } = useParams();
  const [showContentQueue, setShowContentQueue] = useState(true);
  const navigate = useNavigate();
  const { page, content, error } = useContentData(id);
  const auth = UserService.userRetrieval();
  const isLoggedIn = auth !== null;

  const form = useForm<QueueFormData & { content_id?: number }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      queue_index: -1,
      approval: undefined,
      content_id: undefined
    },
  });

  async function onSubmitApproval(values: QueueFormData & { content_id?: number }): Promise<void> {
    const data = UserService.userRetrieval();
    const token = data.token;
    const url = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_CONTENT_ENDPOINT}/approve/${id}`;

    try {
      const response = await axios.patch(
        url,
        {
          approval: values.approval,
          queue_index: values.queue_index,
          modified_by_id: data.id, // Add the user ID as modified_by_id
          content_id: values.content_id // Include content_id in the request
        },
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

  const handleApprove = (index: number, queueIndex: number, contentId: number) => {
    form.setValue('queue_index', queueIndex);
    form.setValue('approval', true);
    form.setValue('content_id', contentId); // Store content ID in form state
    form.handleSubmit(onSubmitApproval)();
    console.log("Approve clicked for index:", index, "queue index:", queueIndex, "content id:", contentId);
  };

  const handleReject = (index: number, queueIndex: number, contentId: number) => {
    form.setValue('queue_index', queueIndex);
    form.setValue('approval', false);
    form.setValue('content_id', contentId); // Store content ID in form state
    form.handleSubmit(onSubmitApproval)();
    console.log("Reject clicked for index:", index, "queue index:", queueIndex, "content id:", contentId);
  };



  if (error) {
    return <div className="text-red-500">Error loading content: {error}</div>;
  }

  return (
    <div className="justify-between mb-8">
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
        {isLoggedIn ? (
          <Button
            className={`${!showContentQueue ? 'underline underline-offset-4 ' : ''} hover:underline font-sans shadow-none hover:underline-offset-4 text-lg`}
            onClick={() => setShowContentQueue(false)}
          >
            Content History
          </Button>
        ) : null}
      </div>

      {showContentQueue ? (
        <div>
          {content && Array.isArray(content) && content
            .filter(item => {
              try {
                // Skip deleted content items
                if (item.is_deleted === true) return false;

                //check if queue is not empty
                if (item.queue === "[]") return false;

                // parse the queue and check if it contains any items
                const queueItems = JSON.parse(item.queue);
                return Array.isArray(queueItems) && queueItems.length > 0;
              } catch (err) {
                console.error("Error parsing queue:", err);
                return false;
              }
            })
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
  );
};

export default ContentConfirmQueue;
