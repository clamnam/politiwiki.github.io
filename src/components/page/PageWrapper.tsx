import { Outlet } from "react-router-dom";
import { Card } from "../ui/card";

export default function PageWrapper(){
  return (<Card className="m-4 text-white border-zinc-600"><Outlet /></Card>);
};

