import { motion } from "framer-motion";
import { Calendar, Download, TrendingUp, BarChart3 } from "lucide-react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Analytics() {
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
              Analytics & Reports
            </h1>
            <p className="text-muted-foreground mt-1">
              Historical data analysis and insights for your farm
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {[
            {
              icon: TrendingUp,
              title: "Water Efficiency",
              value: "40%",
              change: "+5%",
            },
            {
              icon: BarChart3,
              title: "Crop Yield",
              value: "+25%",
              change: "+3%",
            },
            {
              icon: TrendingUp,
              title: "Energy Savings",
              value: "32%",
              change: "+8%",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-success">
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">
                Advanced Analytics Coming Soon
              </h3>
              <p className="text-muted-foreground mb-4">
                Comprehensive analytics dashboard with historical trends,
                predictive insights, and detailed reporting capabilities will be
                available soon.
              </p>
              <Button variant="outline">Request Early Access</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
