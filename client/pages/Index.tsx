import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sprout,
  Wifi,
  BarChart3,
  Droplets,
  Thermometer,
  Zap,
  Smartphone,
  Cloud,
  Shield,
  ArrowRight,
  Play,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/ui/navigation";

const features = [
  {
    icon: Droplets,
    title: "Smart Irrigation",
    description: "Automated watering based on real-time soil moisture data",
    color: "text-tech-500",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Monitor and analyze farm data with interactive dashboards",
    color: "text-primary",
  },
  {
    icon: Wifi,
    title: "IoT Connectivity",
    description: "Seamless integration with sensors and microcontrollers",
    color: "text-success",
  },
  {
    icon: Smartphone,
    title: "Mobile Control",
    description: "Control your farm remotely via Blynk IoT platform",
    color: "text-warning",
  },
  {
    icon: Cloud,
    title: "Cloud Storage",
    description: "Secure data storage and backup in the cloud",
    color: "text-accent",
  },
  {
    icon: Shield,
    title: "Reliable System",
    description: "99.9% uptime with automated failover protection",
    color: "text-destructive",
  },
];

const benefits = [
  "Reduce water consumption by up to 40%",
  "Increase crop yield with optimal growing conditions",
  "Monitor multiple farms from a single dashboard",
  "Get instant alerts for critical conditions",
  "Historical data analysis for better decision making",
  "Easy integration with existing farming equipment",
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  <Sprout className="w-3 h-3 mr-1" />
                  Next-Gen Agriculture Technology
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Smart Farm <span className="text-primary">NUST</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Revolutionary IoT-based irrigation system that transforms
                  traditional farming with intelligent automation, real-time
                  monitoring, and data-driven insights.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="group">
                  <Link to="/dashboard">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    View Dashboard
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="group">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">
                    Sensors Connected
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">40%</div>
                  <div className="text-sm text-muted-foreground">
                    Water Saved
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-card border rounded-2xl p-6 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Live Farm Status</h3>
                    <Badge className="bg-success/10 text-success border-success/20">
                      <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
                      Online
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/5 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <Droplets className="w-5 h-5 text-tech-500" />
                        <span className="text-sm font-medium">
                          Soil Moisture
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="text-2xl font-bold">68%</div>
                        <div className="text-xs text-muted-foreground">
                          Optimal Range
                        </div>
                      </div>
                    </div>

                    <div className="bg-accent/5 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <Thermometer className="w-5 h-5 text-warning" />
                        <span className="text-sm font-medium">Temperature</span>
                      </div>
                      <div className="mt-2">
                        <div className="text-2xl font-bold">24°C</div>
                        <div className="text-xs text-muted-foreground">
                          Perfect
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-success/5 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-5 h-5 text-success" />
                        <span className="text-sm font-medium">
                          Irrigation System
                        </span>
                      </div>
                      <Badge className="bg-success/10 text-success border-success/20">
                        Active
                      </Badge>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Auto-watering in progress • Zone A3
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg"
              >
                <Wifi className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-success to-tech-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Sprout className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold">
              Intelligent Farming Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how our IoT-powered platform transforms traditional
              agriculture with cutting-edge technology and data-driven insights.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group border-border/50">
                    <CardContent className="p-6 space-y-4">
                      <div
                        className={`inline-block p-3 rounded-xl bg-current/10 ${feature.color}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-5xl font-bold">
                  Why Choose SmartFarm NUST?
                </h2>
                <p className="text-xl text-muted-foreground">
                  Our platform delivers measurable results that transform your
                  farming operations and boost productivity.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <Button asChild size="lg" className="mt-8">
                <Link to="/devices">
                  Explore Devices
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-success/10 rounded-2xl p-8 border">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">
                      Connected Ecosystem
                    </h3>
                    <p className="text-muted-foreground">
                      Seamlessly integrate all your farming equipment
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { icon: Droplets, label: "Sensors", count: "24" },
                      { icon: Zap, label: "Controllers", count: "8" },
                      { icon: Wifi, label: "Networks", count: "3" },
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="text-center space-y-2">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="text-lg font-bold">{item.count}</div>
                          <div className="text-xs text-muted-foreground">
                            {item.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-card rounded-lg p-4 border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">System Health</span>
                      <Badge className="bg-success/10 text-success border-success/20">
                        Excellent
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary to-success h-2 rounded-full w-[94%]" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      94% efficiency
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl lg:text-5xl font-bold">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Join thousands of farmers who have already revolutionized their
              operations with SmartFarm NUST. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
              >
                <Link to="/dashboard">
                  Get Started Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
