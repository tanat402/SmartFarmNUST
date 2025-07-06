// Existing demo interface
export interface DemoResponse {
  message: string;
}

// IoT Sensor Data interfaces
export interface SensorReading {
  id: string;
  deviceId: string;
  type: "moisture" | "temperature" | "humidity" | "ph" | "light" | "battery";
  value: number;
  unit: string;
  timestamp: string;
  location?: string;
}

export interface SensorStatus {
  id: string;
  name: string;
  type: "moisture" | "temperature" | "humidity" | "ph" | "light" | "battery";
  value: number;
  unit: string;
  status: "normal" | "warning" | "critical";
  trend: "up" | "down" | "stable";
  lastUpdated: string;
  threshold?: {
    min: number;
    max: number;
  };
}

// Device Management interfaces
export interface IoTDevice {
  id: string;
  name: string;
  type: "sensor" | "controller" | "pump" | "valve";
  status: "online" | "offline" | "error";
  batteryLevel?: number;
  signalStrength: number;
  location: string;
  lastSeen: string;
  firmware: string;
  blynkToken?: string;
  blynkConnected: boolean;
  configuration?: Record<string, any>;
}

// Blynk Integration interfaces
export interface BlynkAuthToken {
  token: string;
  deviceId: string;
  expires?: string;
}

export interface BlynkDataStream {
  pin: string;
  value: number | string;
  timestamp: string;
}

export interface BlynkDeviceStatus {
  deviceId: string;
  online: boolean;
  lastActivity: string;
  energyUsage?: number;
}

// System Status interfaces
export interface SystemStatus {
  totalDevices: number;
  onlineDevices: number;
  criticalAlerts: number;
  warningAlerts: number;
  lastUpdate: string;
  systemHealth: "excellent" | "good" | "warning" | "critical";
}

// Analytics interfaces
export interface AnalyticsData {
  timeRange: {
    start: string;
    end: string;
  };
  metrics: {
    waterEfficiency: number;
    energySavings: number;
    cropYieldImprovement: number;
    averageSoilMoisture: number;
    averageTemperature: number;
  };
  trends: {
    moisture: Array<{ timestamp: string; value: number }>;
    temperature: Array<{ timestamp: string; value: number }>;
    humidity: Array<{ timestamp: string; value: number }>;
  };
}

// Control System interfaces
export interface IrrigationCommand {
  deviceId: string;
  action: "start" | "stop" | "schedule";
  duration?: number; // minutes
  zones?: string[];
  scheduledTime?: string;
}

export interface IrrigationStatus {
  isActive: boolean;
  currentZone?: string;
  remainingTime?: number;
  nextScheduled?: string;
  waterFlow?: number; // liters per minute
  totalWaterUsed?: number; // liters
}

// API Response wrappers
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Error handling
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}
