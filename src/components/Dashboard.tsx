
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Building2, Users, Banknote, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const Dashboard = () => {
  // Mock data - will be replaced with real data
  const stats = {
    totalIncome: 385000,
    totalArrears: 45000,
    occupancyRate: 85,
    totalProperties: 3,
    totalUnits: 24,
    totalTenants: 20
  };

  const recentPayments = [
    { id: 1, tenant: "John Kamau", amount: 25000, unit: "A1", property: "Kamau Heights", date: "2025-01-08", status: "completed" },
    { id: 2, tenant: "Mary Wanjiku", amount: 18000, unit: "B2", property: "Riverside Apartments", date: "2025-01-07", status: "completed" },
    { id: 3, tenant: "Peter Ochieng", amount: 22000, unit: "C3", property: "Garden View", date: "2025-01-06", status: "completed" },
  ];

  const overduePayments = [
    { id: 1, tenant: "Sarah Muthoni", amount: 25000, unit: "A3", property: "Kamau Heights", daysOverdue: 5 },
    { id: 2, tenant: "James Kimani", amount: 20000, unit: "B1", property: "Riverside Apartments", daysOverdue: 2 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="text-center py-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back to RentEasy! 🏠</h2>
        <p className="text-gray-600">Your rental empire at a glance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              KES {stats.totalIncome.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Arrears</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              KES {stats.totalArrears.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              2 tenants overdue
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.occupancyRate}%</div>
            <Progress value={stats.occupancyRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.totalTenants}</div>
            <p className="text-xs text-muted-foreground">
              across {stats.totalUnits} units
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Recent Payments</span>
            </CardTitle>
            <CardDescription>Latest rent payments received</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{payment.tenant}</p>
                    <p className="text-sm text-gray-500">{payment.property} - {payment.unit}</p>
                    <p className="text-xs text-gray-400">{payment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">KES {payment.amount.toLocaleString()}</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      Paid
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Overdue Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <span>Overdue Payments</span>
            </CardTitle>
            <CardDescription>Tenants with outstanding balances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {overduePayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{payment.tenant}</p>
                    <p className="text-sm text-gray-500">{payment.property} - {payment.unit}</p>
                    <p className="text-xs text-yellow-600">{payment.daysOverdue} days overdue</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-yellow-600">KES {payment.amount.toLocaleString()}</p>
                    <Badge variant="destructive" className="text-xs">
                      Overdue
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
