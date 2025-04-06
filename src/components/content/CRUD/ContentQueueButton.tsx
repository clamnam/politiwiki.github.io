import { BellIcon } from "@/components/ui/bell";
import { Link } from "react-router-dom";

interface ContentConfirmButtonProps {
    id:number,
    value: number;
}

const ContentConfirmButton = ({ id, value }: ContentConfirmButtonProps) => {
    return (
        <Link className="max-h-min flex text-red-500" to={`/page/${id}/review/`}>
            <div >{value}</div>
            <BellIcon size={30} />
        </Link>
    );
}

export default ContentConfirmButton;