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
    console.log(role);
    const chartData = [{ month: "role", trust: role, remaining: 1-role }]

    const totalVisitors = chartData[0].trust + chartData[0].remaining

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
                                                                    {totalVisitors.toLocaleString()}
                                                                </tspan>
                                                                <tspan
                                                                    x={viewBox.cx}
                                                                    y={(viewBox.cy || 0) + 4}
                                                                    className="text-white"
                                                                >
                                                                    Visitors
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
        // <div className="flex min-h-screen flex-col">
        //     <div className="flex-1 space-y-4 p-8 pt-6">
        //         <div className="flex items-center justify-between space-y-2">
        //             <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        //             <div className="flex items-center space-x-2">
        //                 <Button variant="outline" size="sm">
        //                     <Download className="mr-2 h-4 w-4" />
        //                     Download Report
        //                 </Button>
        //             </div>
        //         </div>

        //         <Tabs defaultValue="overview" className="space-y-4">
        //             <TabsList>
        //                 <TabsTrigger value="overview">Overview</TabsTrigger>
        //                 <TabsTrigger value="users">Users</TabsTrigger>
        //                 <TabsTrigger value="analytics">Analytics</TabsTrigger>
        //                 <TabsTrigger value="settings">Settings</TabsTrigger>
        //             </TabsList>

        //             <TabsContent value="overview" className="space-y-4">
        //                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        //                     <Card>
        //                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        //                             <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        //                             <DollarSign className="h-4 w-4 text-muted-foreground" />
        //                         </CardHeader>
        //                         <CardContent>
        //                             <div className="text-2xl font-bold">$45,231.89</div>
        //                             <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        //                         </CardContent>
        //                     </Card>

        //                     <Card>
        //                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        //                             <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
        //                             <Users className="h-4 w-4 text-muted-foreground" />
        //                         </CardHeader>
        //                         <CardContent>
        //                             <div className="text-2xl font-bold">+2,350</div>
        //                             <p className="text-xs text-muted-foreground">+10.1% from last month</p>
        //                         </CardContent>
        //                     </Card>

        //                     <Card>
        //                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        //                             <CardTitle className="text-sm font-medium">Sales</CardTitle>
        //                             <CreditCard className="h-4 w-4 text-muted-foreground" />
        //                         </CardHeader>
        //                         <CardContent>
        //                             <div className="text-2xl font-bold">+12,234</div>
        //                             <p className="text-xs text-muted-foreground">+19% from last month</p>
        //                         </CardContent>
        //                     </Card>

        //                     <Card>
        //                         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        //                             <CardTitle className="text-sm font-medium">Active Users</CardTitle>
        //                             <Activity className="h-4 w-4 text-muted-foreground" />
        //                         </CardHeader>
        //                         <CardContent>
        //                             <div className="text-2xl font-bold">+573</div>
        //                             <p className="text-xs text-muted-foreground">+5% from last month</p>
        //                         </CardContent>
        //                     </Card>
        //                 </div>

        //                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        //                     <Card className="col-span-4">
        //                         <CardHeader>
        //                             <CardTitle>Recent Users</CardTitle>
        //                             <CardDescription>
        //                                 {recentUsers.length} users registered this month
        //                             </CardDescription>
        //                         </CardHeader>
        //                         <CardContent>
        //                             <Table>
        //                                 <TableHeader>
        //                                     <TableRow>
        //                                         <TableHead>Name</TableHead>
        //                                         <TableHead>Email</TableHead>
        //                                         <TableHead>Status</TableHead>
        //                                         <TableHead>Role</TableHead>
        //                                     </TableRow>
        //                                 </TableHeader>
        //                                 <TableBody>
        //                                     {recentUsers.map((user) => (
        //                                         <TableRow key={user.id}>
        //                                             <TableCell className="flex items-center gap-2">
        //                                                 <Avatar className="h-8 w-8">
        //                                                     <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} />
        //                                                     <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        //                                                 </Avatar>
        //                                                 {user.name}
        //                                             </TableCell>
        //                                             <TableCell>{user.email}</TableCell>
        //                                             <TableCell>
        //                                                 <span
        //                                                     className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-800' :
        //                                                             user.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
        //                                                                 'bg-yellow-100 text-yellow-800'
        //                                                         }`}
        //                                                 >
        //                                                     {user.status}
        //                                                 </span>
        //                                             </TableCell>
        //                                             <TableCell>{user.role}</TableCell>
        //                                         </TableRow>
        //                                     ))}
        //                                 </TableBody>
        //                             </Table>
        //                         </CardContent>
        //                     </Card>

        //                     <Card className="col-span-3">
        //                         <CardHeader>
        //                             <CardTitle>User Distribution</CardTitle>
        //                             <CardDescription>
        //                                 Breakdown of user accounts by status
        //                             </CardDescription>
        //                         </CardHeader>
        //                         <CardContent>
        //                             <PieChart data={pieData} />
        //                         </CardContent>
        //                     </Card>
        //                 </div>
        //             </TabsContent>
        //         </Tabs>
        //     </div>
        // </div>
    );
}