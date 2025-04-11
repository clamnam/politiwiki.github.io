import { BellIcon } from "@/components/ui/bell";
import { Link } from "react-router-dom";

interface ContentConfirmButtonProps {
    id: number;
    value: number;
}

const ContentConfirmButton = ({ id, value }: ContentConfirmButtonProps) => {
    return (
        <Link className=" p-0 relative inline-block" to={`/page/${id}/review/`}>
            <BellIcon className="p-0" size={30} />
            <div className="absolute -top-1 -right-1 bg-background text-xs text-red-500 rounded-full h-5 w-5 flex items-center justify-center">
                {value}
            </div>
        </Link>
    );
};

export default ContentConfirmButton;