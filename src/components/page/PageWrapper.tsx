import { Outlet } from "react-router-dom";
import { Card } from "../ui/card";

export default function PageWrapper(){
  return (<div className="md:w-3/4  text-white border-zinc-600"><Outlet /></div>);
};

<Card className="w-3/4 m-4 text-white border-zinc-600"></Card>