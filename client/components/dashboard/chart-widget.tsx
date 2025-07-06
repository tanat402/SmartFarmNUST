import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, TrendingUp } from "lucide-react";

interface ChartDataPoint {
  time: string;
  value: number;
  timestamp: number;
}

interface ChartWidgetProps {
  title: string;
  data: ChartDataPoint[];
  unit: string;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  type?: "line" | "area";
}

export function ChartWidget({
  title,
  data,
  unit,
  color,
  trend,
  className,
  type = "line",
}: ChartWidgetProps) {
  const currentValue = data[data.length - 1]?.value || 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">
            {payload[0].value} {unit}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold">{title}</CardTitle>
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-foreground">
                {currentValue.toFixed(1)} {unit}
              </span>
              {trend && (
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    trend.isPositive
                      ? "text-success border-success/20 bg-success/10"
                      : "text-destructive border-destructive/20 bg-destructive/10"
                  }`}
                >
                  <TrendingUp
                    className={`w-3 h-3 mr-1 ${
                      trend.isPositive ? "" : "rotate-180"
                    }`}
                  />
                  {Math.abs(trend.value).toFixed(1)}%
                </Badge>
              )}
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {type === "area" ? (
                <AreaChart data={data}>
                  <defs>
                    <linearGradient
                      id={`gradient-${color}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={color} stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="time"
                    className="text-xs"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    className="text-xs"
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={2}
                    fill={`url(#gradient-${color})`}
                    dot={false}
                  />
                </AreaChart>
              ) : (
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="time"
                    className="text-xs"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    className="text-xs"
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
