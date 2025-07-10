
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Download, TrendingUp, AlertTriangle, Calendar } from "lucide-react";
import { toast } from "sonner";

const Reports = () => {
  const [dateRange, setDateRange] = useState({
    startDate: "2025-01-01",
    endDate: "2025-01-31"
  });

  // Mock data for reports
  const incomeData = [
    { tenant: "John Kamau", property: "Kamau Heights", unit: "A1", amount: 25000, date: "2025-01-08" },
    { tenant: "Mary Wanjiku", property: "Riverside Apartments", unit: "B2", amount: 18000, date: "2025-01-07" },
    { tenant: "Peter Ochieng", property: "Garden View", unit: "C3", amount: 22000, date: "2025-01-06" },
  ];

  const arrearsData = [
    { tenant: "Sarah Muthoni", property: "Kamau Heights", unit: "A3", amount: 25000, daysOverdue: 5 },
    { tenant: "James Kimani", property: "Riverside Apartments", unit: "B1", amount: 20000, daysOverdue: 2 },
  ];

  const expenseData = [
    { description: "Plumbing repair - A1", amount: 3500, date: "2025-01-05", category: "Maintenance" },
    { description: "Security services", amount: 8000, date: "2025-01-01", category: "Security" },
    { description: "Cleaning supplies", amount: 1200, date: "2025-01-03", category: "Maintenance" },
  ];

  const generateReport = (reportType: string) => {
    let reportContent = "";
    let filename = "";

    switch (reportType) {
      case "income":
        const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
        reportContent = `
INCOME REPORT
Period: ${dateRange.startDate} to ${dateRange.endDate}
============

${incomeData.map(item => 
  `${item.date} | ${item.tenant} | ${item.property} - ${item.unit} | KES ${item.amount.toLocaleString()}`
).join('\n')}

TOTAL INCOME: KES ${totalIncome.toLocaleString()}
        `;
        filename = `Income-Report-${dateRange.startDate}-to-${dateRange.endDate}.txt`;
        break;

      case "arrears":
        const totalArrears = arrearsData.reduce((sum, item) => sum + item.amount, 0);
        reportContent = `
ARREARS REPORT
Generated: ${new Date().toISOString().split('T')[0]}
============

${arrearsData.map(item => 
  `${item.tenant} | ${item.property} - ${item.unit} | KES ${item.amount.toLocaleString()} | ${item.daysOverdue} days overdue`
).join('\n')}

TOTAL ARREARS: KES ${totalArrears.toLocaleString()}
        `;
        filename = `Arrears-Report-${new Date().toISOString().split('T')[0]}.txt`;
        break;

      case "pl":
        const totalIncomeForPL = incomeData.reduce((sum, item) => sum + item.amount, 0);
        const totalExpenses = expenseData.reduce((sum, item) => sum + item.amount, 0);
        const netProfit = totalIncomeForPL - totalExpenses;
        
        reportContent = `
PROFIT & LOSS STATEMENT
Period: ${dateRange.startDate} to ${dateRange.endDate}
============

INCOME:
${incomeData.map(item => 
  `${item.date} | ${item.tenant} | KES ${item.amount.toLocaleString()}`
).join('\n')}
Total Income: KES ${totalIncomeForPL.toLocaleString()}

EXPENSES:
${expenseData.map(item => 
  `${item.date} | ${item.description} | KES ${item.amount.toLocaleString()}`
).join('\n')}
Total Expenses: KES ${totalExpenses.toLocaleString()}

NET PROFIT: KES ${netProfit.toLocaleString()}
        `;
        filename = `PL-Statement-${dateRange.startDate}-to-${dateRange.endDate}.txt`;
        break;

      default:
        return;
    }

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast.success(`${reportType.toUpperCase()} report downloaded successfully!`);
  };

  const generateTenantStatement = (tenantName: string) => {
    // Mock tenant statement
    const statementContent = `
TENANT STATEMENT
================

Tenant: ${tenantName}
Property: Kamau Heights - A1
Statement Period: January 2025

Date       | Description      | Debit    | Credit   | Balance
-----------|------------------|----------|----------|----------
01/01/2025 | Opening Balance  |          |          | 0
05/01/2025 | Rent - January   | 25,000   |          | 25,000
08/01/2025 | Payment Received |          | 25,000   | 0

Current Balance: KES 0
Status: PAID

Thank you for your timely payment!
    `;

    const blob = new Blob([statementContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Statement-${tenantName.replace(' ', '-')}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast.success(`Statement for ${tenantName} downloaded successfully!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
        <p className="text-gray-600">Generate comprehensive financial reports</p>
      </div>

      {/* Date Range Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Report Period</span>
          </CardTitle>
          <CardDescription>Select date range for reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income Report */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Income Report</span>
            </CardTitle>
            <CardDescription>Detailed breakdown of all rental income</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  KES {incomeData.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Total Income</p>
              </div>
              <div className="space-y-2">
                {incomeData.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="truncate">{item.tenant}</span>
                    <span className="font-medium">KES {item.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => generateReport("income")} 
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Arrears Report */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <span>Arrears Report</span>
            </CardTitle>
            <CardDescription>Outstanding balances and overdue payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">
                  KES {arrearsData.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Total Arrears</p>
              </div>
              <div className="space-y-2">
                {arrearsData.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="truncate">{item.tenant}</span>
                    <Badge variant="destructive" className="text-xs">
                      {item.daysOverdue}d
                    </Badge>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => generateReport("arrears")} 
                className="w-full bg-yellow-600 hover:bg-yellow-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* P&L Report */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span>P&L Statement</span>
            </CardTitle>
            <CardDescription>Profit and loss analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  KES {(incomeData.reduce((sum, item) => sum + item.amount, 0) - 
                        expenseData.reduce((sum, item) => sum + item.amount, 0)).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Net Profit</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Income:</span>
                  <span className="text-green-600 font-medium">
                    KES {incomeData.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Expenses:</span>
                  <span className="text-red-600 font-medium">
                    KES {expenseData.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                  </span>
                </div>
              </div>
              <Button 
                onClick={() => generateReport("pl")} 
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Statement
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tenant Statements */}
      <Card>
        <CardHeader>
          <CardTitle>Tenant Statements</CardTitle>
          <CardDescription>Generate individual tenant statements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["John Kamau", "Mary Wanjiku", "Sarah Muthoni"].map((tenant) => (
              <div key={tenant} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{tenant}</p>
                  <p className="text-sm text-gray-500">Current Balance: KES 0</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => generateTenantStatement(tenant)}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Statement
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
