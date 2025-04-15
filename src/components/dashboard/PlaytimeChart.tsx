
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PlaytimeChartProps {
  data: Array<{
    name: string;
    playtime: number;
  }>;
}

export default function PlaytimeChart({ data }: PlaytimeChartProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Weekly Playtime</CardTitle>
        <CardDescription>
          Hours spent gaming each day this week
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="playtimeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#6E59A5" opacity={0.2} />
              <XAxis dataKey="name" stroke="#8A898C" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#8A898C" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1A1F2C", 
                  border: "1px solid #6E59A5",
                  borderRadius: "0.375rem",
                  color: "#F1F0FB"
                }} 
              />
              <Area
                type="monotone"
                dataKey="playtime"
                stroke="#8B5CF6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#playtimeGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
