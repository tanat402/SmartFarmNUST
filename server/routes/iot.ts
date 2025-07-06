import { RequestHandler } from "express";
import {
  ApiResponse,
  SensorReading,
  SensorStatus,
  IoTDevice,
  SystemStatus,
  IrrigationCommand,
  IrrigationStatus,
  BlynkDeviceStatus,
  AnalyticsData,
} from "@shared/api";

// Mock data generators (replace with real IoT integration)
const generateMockSensorReadings = (): SensorReading[] => [
  {
    id: "reading-1",
    deviceId: "device-1",
    type: "moisture",
    value: 68.5,
    unit: "%",
    timestamp: new Date().toISOString(),
    location: "Zone A",
  },
  {
    id: "reading-2",
    deviceId: "device-2",
    type: "temperature",
    value: 24.3,
    unit: "°C",
    timestamp: new Date().toISOString(),
    location: "Zone A",
  },
];

const generateMockDevices = (): IoTDevice[] => [
  {
    id: "device-1",
    name: "Main Controller",
    type: "controller",
    status: "online",
    batteryLevel: 87,
    signalStrength: 92,
    location: "Zone A - Greenhouse",
    lastSeen: new Date().toISOString(),
    firmware: "v2.1.3",
    blynkConnected: true,
    blynkToken: "mock-token-123",
  },
  {
    id: "device-2",
    name: "Soil Sensor Array",
    type: "sensor",
    status: "online",
    batteryLevel: 72,
    signalStrength: 78,
    location: "Zone B - Field",
    lastSeen: new Date().toISOString(),
    firmware: "v1.8.2",
    blynkConnected: true,
  },
];

// GET /api/iot/sensors - Get all sensor readings
export const getSensorReadings: RequestHandler = (req, res) => {
  const response: ApiResponse<SensorReading[]> = {
    success: true,
    data: generateMockSensorReadings(),
    timestamp: new Date().toISOString(),
  };
  res.json(response);
};

// GET /api/iot/sensors/status - Get sensor status summary
export const getSensorStatus: RequestHandler = (req, res) => {
  const mockStatus: SensorStatus[] = [
    {
      id: "sensor-1",
      name: "Soil Moisture - Zone A",
      type: "moisture",
      value: 68.5,
      unit: "%",
      status: "normal",
      trend: "stable",
      lastUpdated: "2 minutes ago",
      threshold: { min: 40, max: 80 },
    },
    {
      id: "sensor-2",
      name: "Temperature Sensor",
      type: "temperature",
      value: 24.3,
      unit: "°C",
      status: "normal",
      trend: "up",
      lastUpdated: "1 minute ago",
      threshold: { min: 15, max: 35 },
    },
  ];

  const response: ApiResponse<SensorStatus[]> = {
    success: true,
    data: mockStatus,
    timestamp: new Date().toISOString(),
  };
  res.json(response);
};

// GET /api/iot/devices - Get all IoT devices
export const getDevices: RequestHandler = (req, res) => {
  const response: ApiResponse<IoTDevice[]> = {
    success: true,
    data: generateMockDevices(),
    timestamp: new Date().toISOString(),
  };
  res.json(response);
};

// POST /api/iot/devices/:id/toggle - Toggle device status
export const toggleDevice: RequestHandler = (req, res) => {
  const { id } = req.params;

  // In a real implementation, this would interact with the actual device
  console.log(`Toggling device ${id}`);

  const response: ApiResponse<{ success: boolean; newStatus: string }> = {
    success: true,
    data: {
      success: true,
      newStatus: "online", // Mock response
    },
    timestamp: new Date().toISOString(),
  };
  res.json(response);
};

// GET /api/iot/system/status - Get overall system status
export const getSystemStatus: RequestHandler = (req, res) => {
  const devices = generateMockDevices();
  const onlineDevices = devices.filter((d) => d.status === "online").length;

  const status: SystemStatus = {
    totalDevices: devices.length,
    onlineDevices,
    criticalAlerts: 0,
    warningAlerts: 1,
    lastUpdate: new Date().toISOString(),
    systemHealth: "excellent",
  };

  const response: ApiResponse<SystemStatus> = {
    success: true,
    data: status,
    timestamp: new Date().toISOString(),
  };
  res.json(response);
};

// POST /api/iot/irrigation/control - Control irrigation system
export const controlIrrigation: RequestHandler = (req, res) => {
  const command: IrrigationCommand = req.body;

  // In a real implementation, this would send commands to the irrigation controller
  console.log("Irrigation command:", command);

  const response: ApiResponse<{ commandId: string; status: string }> = {
    success: true,
    data: {
      commandId: `cmd-${Date.now()}`,
      status: "executed",
    },
    timestamp: new Date().toISOString(),
  };
  res.json(response);
};

// GET /api/iot/irrigation/status - Get irrigation system status
export const getIrrigationStatus: RequestHandler = (req, res) => {
  const status: IrrigationStatus = {
    isActive: true,
    currentZone: "Zone A",
    remainingTime: 25, // minutes
    nextScheduled: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    waterFlow: 12.5, // L/min
    totalWaterUsed: 150, // L
  };

  const response: ApiResponse<IrrigationStatus> = {
    success: true,
    data: status,
    timestamp: new Date().toISOString(),
  };
  res.json(response);
};

// GET /api/iot/blynk/status - Get Blynk connection status
export const getBlynkStatus: RequestHandler = (req, res) => {
  const devices = generateMockDevices();
  const blynkStatus: BlynkDeviceStatus[] = devices
    .filter((d) => d.blynkConnected)
    .map((d) => ({
      deviceId: d.id,
      online: d.status === "online",
      lastActivity: d.lastSeen,
      energyUsage: Math.random() * 100, // Mock energy usage
    }));

  const response: ApiResponse<BlynkDeviceStatus[]> = {
    success: true,
    data: blynkStatus,
    timestamp: new Date().toISOString(),
  };
  res.json(response);
};

// GET /api/iot/analytics - Get analytics data
export const getAnalyticsData: RequestHandler = (req, res) => {
  const { timeRange } = req.query;
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

  // Generate mock trend data
  const generateTrendData = (baseValue: number, variance: number) =>
    Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(
        startDate.getTime() + i * 60 * 60 * 1000,
      ).toISOString(),
      value:
        baseValue + Math.sin(i * 0.5) * variance + Math.random() * variance,
    }));

  const analytics: AnalyticsData = {
    timeRange: {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    },
    metrics: {
      waterEfficiency: 94.2,
      energySavings: 32.8,
      cropYieldImprovement: 18.5,
      averageSoilMoisture: 67.3,
      averageTemperature: 24.1,
    },
    trends: {
      moisture: generateTrendData(67, 8),
      temperature: generateTrendData(24, 3),
      humidity: generateTrendData(72, 10),
    },
  };

  const response: ApiResponse<AnalyticsData> = {
    success: true,
    data: analytics,
    timestamp: new Date().toISOString(),
  };
  res.json(response);
};
