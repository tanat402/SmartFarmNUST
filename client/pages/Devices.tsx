import { motion } from "framer-motion";
import { Plus, Search, Filter, Cpu, Zap, Wifi } from "lucide-react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Devices() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Device Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and configure your IoT devices and sensors
            </p>
          </div>

          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Device</span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8"
        >
          <div className="flex-1">
            <Input
              placeholder="Search devices..."
              className="w-full"
              startIcon={Search}
            />
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Placeholder cards */}
          {[
            { icon: Cpu, title: "Soil Sensors", count: 12, status: "Online" },
            { icon: Zap, title: "Controllers", count: 4, status: "Online" },
            {
              icon: Wifi,
              title: "Gateway Devices",
              count: 2,
              status: "Online",
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {item.title}
                  </CardTitle>
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.count}</div>
                  <p className="text-xs text-muted-foreground">
                    Status: {item.status}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">
                Device Management Coming Soon
              </h3>
              <p className="text-muted-foreground mb-4">
                Full device management interface with Blynk integration, device
                configuration, and real-time control will be available in the
                next update.
              </p>
              <Button variant="outline">Learn More</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
