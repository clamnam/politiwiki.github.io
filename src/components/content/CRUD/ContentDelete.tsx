import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { DeleteIcon } from "../../ui/delete";
import { BadgeAlertIcon } from "lucide-react";

interface ContentDeleteProps {
    id: number;
    content: {
        title?: string;
        content_body?: string;
    };
    onDelete: (index: number) => void;

}

const ContentDelete = ({ id, content, onDelete }: ContentDeleteProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="  p-0 hover:text-red-500">
                    <DeleteIcon size={50} />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] bg-neutral-800 text-white">
                <DialogHeader>
                    <DialogTitle className="text-red-500 flex items-center ">DELETE CONTENT? <BadgeAlertIcon className="p-2" size={35} /></DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this section?
                    </DialogDescription>
                </DialogHeader>
                <div className="text-2xl gap-4 py-4">
                    <div className="font-serif">Section Title:</div>
                    <div className="overflow-scroll text-white text-xs items-center">
                        {content?.title}
                    </div>
                </div>
                <hr className="h-px my-4 bg-gray-200 border-0" />
                <div className="text-lg gap-4 py-4">
                    <div className="font-serif">Section body:</div>
                    <div className="items-center">
                        {content?.content_body}
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => onDelete(Number(id))} variant="submit" type="submit">
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ContentDelete;