import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  RefreshCw,
  Download,
  Settings,
  Bell,
  Wifi,
  WifiOff,
  AlertTriangle,
} from "lucide-react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SensorCard, SensorData } from "@/components/dashboard/sensor-card";
import { ChartWidget } from "@/components/dashboard/chart-widget";
import { DeviceStatus, Device } from "@/components/iot/device-status";

// Mock data - in a real app, this would come from your IoT API
const generateMockSensorData = (): SensorData[] => [
  {
    id: "moisture-1",
    type: "moisture",
    value: 68,
    unit: "%",
    label: "Soil Moisture - Zone A",
    trend: "stable",
    status: "normal",
    lastUpdated: "2 min ago",
    min: 0,
    max: 100,
  },
  {
    id: "temp-1",
    type: "temperature",
    value: 24.5,
    unit: "°C",
    label: "Temperature",
    trend: "up",
    status: "normal",
    lastUpdated: "1 min ago",
    min: 15,
    max: 35,
  },
  {
    id: "humidity-1",
    type: "humidity",
    value: 72,
    unit: "%",
    label: "Air Humidity",
    trend: "down",
    status: "normal",
    lastUpdated: "3 min ago",
    min: 40,
    max: 90,
  },
  {
    id: "ph-1",
    type: "ph",
    value: 6.8,
    unit: "pH",
    label: "Soil pH",
    trend: "stable",
    status: "normal",
    lastUpdated: "5 min ago",
    min: 5.5,
    max: 8.0,
  },
  {
    id: "light-1",
    type: "light",
    value: 850,
    unit: "lux",
    label: "Light Intensity",
    trend: "up",
    status: "normal",
    lastUpdated: "1 min ago",
    min: 200,
    max: 1200,
  },
  {
    id: "battery-1",
    type: "battery",
    value: 87,
    unit: "%",
    label: "System Battery",
    trend: "down",
    status: "warning",
    lastUpdated: "30 sec ago",
    min: 0,
    max: 100,
  },
];

const generateMockChartData = () => {
  const now = new Date();
  return Array.from({ length: 24 }, (_, i) => {
    const time = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
    return {
      time: time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      value: 65 + Math.sin(i * 0.5) * 10 + Math.random() * 8,
      timestamp: time.getTime(),
    };
  });
};

const generateMockDevices = (): Device[] => [
  {
    id: "device-1",
    name: "Main Controller",
    type: "controller",
    status: "online",
    batteryLevel: 87,
    signalStrength: 92,
    location: "Zone A - Greenhouse",
    lastSeen: "2 minutes ago",
    firmware: "v2.1.3",
    blynkConnected: true,
  },
  {
    id: "device-2",
    name: "Soil Sensor Array",
    type: "sensor",
    status: "online",
    batteryLevel: 72,
    signalStrength: 78,
    location: "Zone B - Field",
    lastSeen: "1 minute ago",
    firmware: "v1.8.2",
    blynkConnected: true,
  },
  {
    id: "device-3",
    name: "Irrigation Pump",
    type: "pump",
    status: "offline",
    signalStrength: 0,
    location: "Zone C - Storage",
    lastSeen: "15 minutes ago",
    firmware: "v1.9.1",
    blynkConnected: false,
  },
];

export default function Dashboard() {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Initialize data
    setSensorData(generateMockSensorData());
    setChartData(generateMockChartData());
    setDevices(generateMockDevices());

    // Simulate real-time updates
    const interval = setInterval(() => {
      setSensorData((prev) =>
        prev.map((sensor) => ({
          ...sensor,
          value: sensor.value + (Math.random() - 0.5) * 2,
          lastUpdated: "now",
        })),
      );
      setLastUpdated(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setSensorData(generateMockSensorData());
    setChartData(generateMockChartData());
    setLastUpdated(new Date());
  };

  const onlineDevices = devices.filter((d) => d.status === "online").length;
  const totalDevices = devices.length;
  const criticalAlerts = sensorData.filter(
    (s) => s.status === "critical",
  ).length;
  const warningAlerts = sensorData.filter((s) => s.status === "warning").length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Farm Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time monitoring and control of your smart irrigation system
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Badge
              variant="outline"
              className={`${
                isConnected
                  ? "text-success border-success/20 bg-success/10"
                  : "text-destructive border-destructive/20 bg-destructive/10"
              }`}
            >
              {isConnected ? (
                <Wifi className="w-3 h-3 mr-1" />
              ) : (
                <WifiOff className="w-3 h-3 mr-1" />
              )}
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </motion.div>

        {/* Status Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Devices Online
                  </p>
                  <p className="text-2xl font-bold">
                    {onlineDevices}/{totalDevices}
                  </p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <Wifi className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Sensors
                  </p>
                  <p className="text-2xl font-bold">{sensorData.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Warnings
                  </p>
                  <p className="text-2xl font-bold">{warningAlerts}</p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Critical Alerts
                  </p>
                  <p className="text-2xl font-bold">{criticalAlerts}</p>
                </div>
                <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                  <Bell className="w-6 h-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sensor Data Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-6">Live Sensor Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sensorData.map((sensor) => (
              <SensorCard key={sensor.id} sensor={sensor} />
            ))}
          </div>
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          <ChartWidget
            title="Soil Moisture Trend"
            data={chartData}
            unit="%"
            color="hsl(var(--tech-500))"
            type="area"
            trend={{ value: 2.4, isPositive: true }}
          />
          <ChartWidget
            title="Temperature Over Time"
            data={chartData.map((d) => ({ ...d, value: d.value + 15 }))}
            unit="°C"
            color="hsl(var(--warning))"
            type="line"
            trend={{ value: 1.2, isPositive: false }}
          />
        </motion.div>

        {/* Device Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-6">Connected Devices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((device) => (
              <DeviceStatus
                key={device.id}
                device={device}
                onToggle={(deviceId) => {
                  console.log("Toggle device:", deviceId);
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          Last updated: {lastUpdated.toLocaleString()}
        </motion.div>
      </div>
    </div>
  );
}
