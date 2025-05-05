import UserService from "@/api/userService";
import AdminScreen from "./adminScreen";
import { useAuth } from "@/context/AuthContext";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";

const chartConfig = {
    trust: {
        label: "trust",
        color: "hsl(126, 89%, 52%)",
    },
    remaining: {
        label: "remaining",
        color: "hsl(25 5.3% 44.7%)",
    },
}
export default function Profile() {
    const { role } = useAuth();

    const data = UserService.userRetrieval();
    const date = new Date(data?.created_at);
    const chartData = [{ month: "role", trust: role, remaining: 1 - role }]

    const totalTrust = chartData[0].trust * 100
    return (
        <><div className="flex flex-col items-center justify-center text-center" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
            <div className="  " style={{ textAlign: 'center' }}>
                <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F54%2F72%2Fd1%2F5472d1b09d3d724228109d381d617326.jpg&f=1&nofb=1&ipt=28bcfea4eca893269b884002985588d9421a1ff31334244f71802c3e71b3758c"
                    alt="Profile"
                    style={{ width: "50px", borderRadius: '50%', marginBottom: '1rem' }} />

            </div>
            <h1 style={{ textAlign: 'center' }}>{data?.username}</h1>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
                {data?.email} | User Since : {date.toLocaleString()}
            </p>


        {data?.role < 0.7 ? <AdminScreen /> : null}
        </div><div className="mt-3 h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square w-full max-w-[250px]"
                    >
                        <RadialBarChart

                            data={chartData}
                            endAngle={180}
                            innerRadius={80}
                            outerRadius={130}
                        >
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />} />
                            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                <Label className="text-foreground"
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) - 16}
                                                        className="fill-foreground text-2xl font-bold"
                                                    >
                                                        {totalTrust.toLocaleString()}%
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 4}
                                                        className="text-white"
                                                    >
                                                        Trust Factor
                                                    </tspan>
                                                </text>
                                            );
                                        }
                                    }} />
                            </PolarRadiusAxis>
                            <RadialBar
                                dataKey="remaining"
                                fill="var(--color-remaining)"
                                stackId="a"
                                cornerRadius={5}
                                className="stroke-transparent stroke-2" />
                            <RadialBar
                                dataKey="trust"
                                stackId="a"
                                cornerRadius={5}
                                fill="var(--color-trust)"
                                className="stroke-transparent stroke-2" />

                        </RadialBarChart>
                    </ChartContainer>
                </ResponsiveContainer>
            </div></>
    );
};

