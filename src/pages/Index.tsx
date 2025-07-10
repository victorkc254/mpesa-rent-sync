
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Banknote, FileText, Plus, TrendingUp } from "lucide-react";
import PropertyManagement from "@/components/PropertyManagement";
import Dashboard from "@/components/Dashboard";
import PaymentTracking from "@/components/PaymentTracking";
import Reports from "@/components/Reports";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const navigation = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "properties", label: "Properties", icon: Building2 },
    { id: "payments", label: "Payments", icon: Banknote },
    { id: "reports", label: "Reports", icon: FileText },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "properties":
        return <PropertyManagement />;
      case "payments":
        return <PaymentTracking />;
      case "reports":
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-500 rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  RentEasy
                </h1>
                <p className="text-sm text-gray-500">The Landlord's Chill Pill</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              🇰🇪 Kenya
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "outline"}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 ${
                  activeTab === item.id
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "hover:bg-green-50 text-gray-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Index;
