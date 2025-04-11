import { Card } from "@/components/ui/card";
interface ContentConfirmScreenProps {
    id: string;
    value: object;
}

const ContentConfirmScreen = ({ id, value }: ContentConfirmScreenProps) => {
return (
    <Card className="flex my-4  flex-col items-center justify-center min-h-screen ">
        asd
        {id}{value.toString()}
    </Card>
);
}
export default ContentConfirmScreen;