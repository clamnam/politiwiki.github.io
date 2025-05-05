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
import { useState } from "react";

interface ContentDeleteProps {
    id: number;
    content: {
        title?: string;
        content_body?: string;
    };
    onDelete: (index: number) => void;

}

const ContentDelete = ({ id, content, onDelete }: ContentDeleteProps) => {
  const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="lg" className="  hover:text-red-500">
                    <DeleteIcon  size={30} className="border-0"/>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
                <DialogHeader>
                    <DialogTitle className="text-red-500 flex items-center ">DELETE CONTENT? <BadgeAlertIcon className="p-2" size={35} /></DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this section?
                    </DialogDescription>
                </DialogHeader>
                <div className="text-2xl gap-4 py-4">
                    <div className="font-serif">Section Title:</div>
                    <div className="  text-xs items-center">
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
                    <Button onClick={() => {setOpen(false); onDelete(Number(id));}} variant="submit" type="submit">
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ContentDelete;