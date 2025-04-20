import { Button } from "@/components/ui/button";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import { useAuth } from "@/context/AuthContext";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
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
export default function AdminScreen() {
    const { role } = useAuth();
    const chartData = [{ month: "role", trust: role, remaining: 1 - role }]

    const totalTrust = chartData[0].trust *100

    return (

        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">Check Trust Factor</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Trust factor </DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-0">

                        <div className="mt-3 h-[120px]">
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
                                            content={<ChartTooltipContent hideLabel />}
                                        />
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
                                                                    Trust
                                                                </tspan>
                                                            </text>
                                                        )
                                                    }
                                                }}
                                            />
                                        </PolarRadiusAxis>
                                        <RadialBar
                                            dataKey="remaining"
                                            fill="var(--color-remaining)"
                                            stackId="a"
                                            cornerRadius={5}
                                            className="stroke-transparent stroke-2"
                                        />
                                        <RadialBar
                                            dataKey="trust"
                                            stackId="a"
                                            cornerRadius={5}
                                            fill="var(--color-trust)"
                                            className="stroke-transparent stroke-2"
                                        />

                                    </RadialBarChart>
                                </ChartContainer>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <DrawerFooter className="mt-20">
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>

    );
}