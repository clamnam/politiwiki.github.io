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
import { useState } from "react";

interface ContentQueueItemProps {
  item: Content;
  index: number;
  onApprove: (index: number, queueIndex: number) => void;
  onReject?: (index: number, queueIndex: number) => void;
}

const ContentQueueItem = ({ item, index, onApprove, onReject}: ContentQueueItemProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 5;
  
  let queueItems = [];
  try {
    queueItems = JSON.parse(item.queue);
    console.log(queueItems);
    if (!Array.isArray(queueItems) || queueItems.length === 0) {
      return null;
    }
  } catch (err) {
    console.error("Failed to parse queue", err);
    return null;
  }

  // Calculate pagination values
  const totalPages = Math.ceil(queueItems.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, queueItems.length);
  const currentItems = queueItems.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    
    <div className="">
      
      <hr className="h-px my-4 border-0 bg-background" />
      <div className="m-4">
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm">
              Showing {startIndex + 1}-{endIndex} of {queueItems.length} items
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                disabled={currentPage === 0}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <Button
                  key={pageIndex}
                  variant={currentPage === pageIndex ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageIndex)}
                >
                  {pageIndex + 1}
                </Button>
              ))}
              <Button 
                variant="outline" 
                size="sm"
                disabled={currentPage >= totalPages - 1}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
        
        {/* Display current page items */}
        {currentItems.map((queueItem, queueIndex) => (
          <div key={queueIndex} className="mb-8 pb-4 border-b border-gray-200">
            {queueItem?.status === "Pending" && queueItem?.is_deleted === false && !item.updated_at ? (
              <div className="text-red-500">New Content</div>
            ) : queueItem?.is_deleted === true ? (
              <div className="text-purple-600">Delete</div>
            ) : <div className="text-green-500">Edit</div>}
            
            <div className="flex justify-between">
              <div>
                <div className="text-2xl font-serif">{queueItem?.title}</div>
                <div className="text-lg">{queueItem?.content_body}</div>
              </div>
              <div>
                <div className="text-sm">created : {formatDate(item?.created_at)}</div>
                {item?.updated_at ? <div className="text-sm">updated : {formatDate(item?.updated_at)}</div> : null}
              </div>
            </div>
            
            <div className="flex gap-2 mt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="">
                    <CheckCheckIcon
                      className="cursor-pointer rounded-sm bg-green-400"
                      size={20} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="min-w-10/12 sm:max-w-[425px] bg-background text-foreground">
                  <div className="">
                    <DialogHeader>
                      <DialogTitle>APPROVE CONTENT?</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to approve this section?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="text-2xl gap-4 py-4">
                      <div className="font-serif">Section Title :</div>
                      <div className="overflow-scroll text-xs items-center">
                        {queueItem?.title}
                      </div>
                    </div>
                    <hr className="h-px my-4 bg-background border-0" />
                    <div className="text-lg gap-4 py-4">
                      <div className="font-serif">Section body :</div>
                      <div className="items-center">
                        {item?.status === "Pending" ? (
                          queueItem?.content_body
                        ) : (
                          <ReactDiffViewer 
                            oldValue={item.content_body} 
                            newValue={queueItem?.content_body} 
                            compareMethod={DiffMethod.WORDS_WITH_SPACE} 
                          />
                        )}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="submit"
                        onClick={() => onApprove(index, startIndex + queueIndex)}
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
              
              <Button variant="ghost" className="m-0 p-0" onClick={() => onReject && onReject(index, startIndex + queueIndex)}>
                <XIcon
                  className="cursor-pointer text-foreground rounded-sm bg-red-400"
                  size={20} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentQueueItem;