import { motion } from "framer-motion";
import {
  Droplets,
  Thermometer,
  Gauge,
  Zap,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface SensorData {
  id: string;
  type: "moisture" | "temperature" | "humidity" | "ph" | "light" | "battery";
  value: number;
  unit: string;
  label: string;
  trend: "up" | "down" | "stable";
  status: "normal" | "warning" | "critical";
  lastUpdated: string;
  min?: number;
  max?: number;
}

interface SensorCardProps {
  sensor: SensorData;
  className?: string;
}

const sensorIcons = {
  moisture: Droplets,
  temperature: Thermometer,
  humidity: Gauge,
  ph: Zap,
  light: Zap,
  battery: Zap,
};

const statusColors = {
  normal: "text-success",
  warning: "text-warning",
  critical: "text-destructive",
};

const statusBadgeColors = {
  normal: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  critical: "bg-destructive/10 text-destructive border-destructive/20",
};

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

export function SensorCard({ sensor, className }: SensorCardProps) {
  const Icon = sensorIcons[sensor.type];
  const TrendIcon = trendIcons[sensor.trend];

  const getProgressValue = () => {
    if (sensor.min !== undefined && sensor.max !== undefined) {
      return ((sensor.value - sensor.min) / (sensor.max - sensor.min)) * 100;
    }
    return 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {sensor.label}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge
              variant="outline"
              className={cn("text-xs", statusBadgeColors[sensor.status])}
            >
              {sensor.status}
            </Badge>
            <div
              className={cn(
                "p-2 rounded-lg bg-gradient-to-br transition-colors",
                sensor.status === "normal" && "from-primary/10 to-primary/5",
                sensor.status === "warning" && "from-warning/10 to-warning/5",
                sensor.status === "critical" &&
                  "from-destructive/10 to-destructive/5",
              )}
            >
              <Icon className={cn("w-4 h-4", statusColors[sensor.status])} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-foreground">
                  {sensor.value}
                </span>
                <span className="text-sm text-muted-foreground">
                  {sensor.unit}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <TrendIcon className="w-3 h-3" />
                <span>{sensor.trend}</span>
              </div>
            </div>
          </div>

          {/* Progress bar for sensors with min/max values */}
          {sensor.min !== undefined && sensor.max !== undefined && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  {sensor.min}
                  {sensor.unit}
                </span>
                <span>
                  {sensor.max}
                  {sensor.unit}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={cn(
                    "h-2 rounded-full transition-all duration-500",
                    sensor.status === "normal" &&
                      "bg-gradient-to-r from-primary to-success",
                    sensor.status === "warning" &&
                      "bg-gradient-to-r from-warning to-warning",
                    sensor.status === "critical" &&
                      "bg-gradient-to-r from-destructive to-destructive",
                  )}
                  style={{ width: `${getProgressValue()}%` }}
                />
              </div>
            </div>
          )}

          <div className="mt-3 text-xs text-muted-foreground">
            Last updated: {sensor.lastUpdated}
          </div>

          {sensor.status === "critical" && (
            <div className="mt-2 flex items-center space-x-1 text-xs text-destructive">
              <AlertTriangle className="w-3 h-3" />
              <span>Requires attention</span>
            </div>
          )}
        </CardContent>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Card>
    </motion.div>
  );
}
