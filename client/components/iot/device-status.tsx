import { motion } from "framer-motion";
import {
  Wifi,
  WifiOff,
  Cpu,
  Battery,
  Signal,
  MapPin,
  Clock,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Device {
  id: string;
  name: string;
  type: "sensor" | "controller" | "pump" | "valve";
  status: "online" | "offline" | "error";
  batteryLevel?: number;
  signalStrength: number;
  location: string;
  lastSeen: string;
  firmware: string;
  blynkConnected: boolean;
}

interface DeviceStatusProps {
  device: Device;
  className?: string;
  onToggle?: (deviceId: string) => void;
}

const deviceTypeIcons = {
  sensor: Cpu,
  controller: Zap,
  pump: Zap,
  valve: Zap,
};

const statusColors = {
  online: "text-success",
  offline: "text-muted-foreground",
  error: "text-destructive",
};

const statusBadgeColors = {
  online: "bg-success/10 text-success border-success/20",
  offline: "bg-muted text-muted-foreground border-border",
  error: "bg-destructive/10 text-destructive border-destructive/20",
};

export function DeviceStatus({
  device,
  className,
  onToggle,
}: DeviceStatusProps) {
  const Icon = deviceTypeIcons[device.type];

  const getSignalBars = (strength: number) => {
    const bars = Math.ceil((strength / 100) * 4);
    return Array.from({ length: 4 }, (_, i) => (
      <div
        key={i}
        className={cn(
          "w-1 rounded-sm transition-colors",
          i < bars ? "bg-current" : "bg-muted",
          i === 0 && "h-2",
          i === 1 && "h-3",
          i === 2 && "h-4",
          i === 3 && "h-5",
        )}
      />
    ));
  };

  const getBatteryColor = (level: number) => {
    if (level > 60) return "text-success";
    if (level > 20) return "text-warning";
    return "text-destructive";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="hover:shadow-lg transition-all duration-300 group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div className="flex items-center space-x-3">
            <div
              className={cn(
                "p-2 rounded-lg transition-colors",
                device.status === "online" && "bg-success/10",
                device.status === "offline" && "bg-muted",
                device.status === "error" && "bg-destructive/10",
              )}
            >
              <Icon className={cn("w-5 h-5", statusColors[device.status])} />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold">
                {device.name}
              </CardTitle>
              <p className="text-xs text-muted-foreground capitalize">
                {device.type}
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className={cn("text-xs", statusBadgeColors[device.status])}
          >
            {device.status}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Connection Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {device.blynkConnected ? (
                <Wifi className="w-4 h-4 text-tech-500" />
              ) : (
                <WifiOff className="w-4 h-4 text-muted-foreground" />
              )}
              <span className="text-xs text-muted-foreground">
                Blynk {device.blynkConnected ? "Connected" : "Disconnected"}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Signal className="w-3 h-3 text-muted-foreground" />
              <div className="flex items-end space-x-0.5">
                {getSignalBars(device.signalStrength)}
              </div>
              <span className="text-xs text-muted-foreground ml-1">
                {device.signalStrength}%
              </span>
            </div>
          </div>

          {/* Battery Level (if applicable) */}
          {device.batteryLevel !== undefined && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Battery
                  className={cn(
                    "w-4 h-4",
                    getBatteryColor(device.batteryLevel),
                  )}
                />
                <span className="text-xs text-muted-foreground">Battery</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      getBatteryColor(device.batteryLevel),
                    )}
                    style={{
                      width: `${device.batteryLevel}%`,
                      backgroundColor: "currentColor",
                    }}
                  />
                </div>
                <span
                  className={cn(
                    "text-xs font-medium",
                    getBatteryColor(device.batteryLevel),
                  )}
                >
                  {device.batteryLevel}%
                </span>
              </div>
            </div>
          )}

          {/* Location */}
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {device.location}
            </span>
          </div>

          {/* Last Seen */}
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Last seen: {device.lastSeen}
            </span>
          </div>

          {/* Firmware */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Firmware: {device.firmware}
            </span>
            {onToggle && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onToggle(device.id)}
                disabled={device.status === "error"}
                className="text-xs h-7"
              >
                {device.status === "online" ? "Disable" : "Enable"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
