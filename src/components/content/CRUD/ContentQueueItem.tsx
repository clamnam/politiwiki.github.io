import { Content } from "../../../types";
import { Button } from "@/components/ui/button";
import { CheckCheckIcon } from "@/components/ui/check-check";
import { XIcon } from "@/components/ui/x";
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { formatDate } from "../../../utilities/formatter";

interface ContentQueueItemProps {
  item: Content;
  index: number;
  onApprove: (index: number) => void;
  onReject?: (index: number) => void;
}

const ContentQueueItem = ({ item, index, onApprove, onReject }: ContentQueueItemProps) => {
  let parsedQueue;
  try {
    parsedQueue = JSON.parse(item.queue);
    const queueIndex = 0;
    
    if (parsedQueue[queueIndex] !== undefined) {
      parsedQueue = parsedQueue[queueIndex];
    }
  } catch (err) {
    console.error("Failed to parse queue", err);
    return null;
  }

  if (!parsedQueue) {
    return null;
  }

  return (
    <div className="text-white">
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
      <div className="m-4">
        {item?.status === "Pending" ? (
          <div className="text-red-500">New Content</div>
        ) : (
          <div className="text-green-500">edit</div>
        )}
        <div className="flex justify-between">
          <div>
            <div className="text-2xl font-serif">{parsedQueue?.title}</div>
            <div className="text-lg">{parsedQueue?.content_body}</div>
          </div>
          <div>
            <div className="text-sm">created : {formatDate(item?.created_at)}</div>
            {item?.updated_at ? <div className="text-sm">updated : {formatDate(item?.updated_at)}</div> : null}
          </div>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <CheckCheckIcon
                className="cursor-pointer text-white rounded-sm bg-green-400"
                size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-10/12 sm:max-w-[425px] bg-neutral-800 text-white">
            <div>
              <DialogHeader>
                <DialogTitle>APPROVE CONTENT?</DialogTitle>
                <DialogDescription>
                  Are you sure you want to approve this section?
                </DialogDescription>
              </DialogHeader>
              <div className="text-2xl gap-4 py-4">
                <div className="font-serif">Section Title :</div>
                <div className="overflow-scroll text-white text-xs items-center">
                  {parsedQueue?.title}
                </div>
              </div>
              <hr className="h-px my-4 bg-gray-200 border-0" />
              <div className="text-lg gap-4 py-4">
                <div className="font-serif">Section body :</div>
                <div className="items-center">
                  {item?.status === "Pending" ? (
                    parsedQueue?.content_body
                  ) : (
                    <ReactDiffViewer 
                      oldValue={item.content_body} 
                      newValue={parsedQueue?.content_body} 
                      compareMethod={DiffMethod.WORDS_WITH_SPACE} 
                    />
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="submit"
                  onClick={() => onApprove(index)}
                  type="submit"
                >
                  {item?.status === "Pending" ? (
                    <div className="text-green-500">approve new section</div>
                  ) : (
                    <div className="text-green-500">approve change</div>
                  )}
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button className="m-0 p-0" onClick={() => onReject && onReject(index)}>
          <XIcon
            className="cursor-pointer text-white rounded-sm bg-red-400"
            size={50} />
        </Button>
      </div>
    </div>
  );
};

export default ContentQueueItem;