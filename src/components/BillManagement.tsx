
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Receipt, DollarSign, Calendar, Trash2, Edit, Zap, Droplets, Wifi, Car } from "lucide-react";
import { toast } from "sonner";

interface Bill {
  id: string;
  type: "electricity" | "water" | "internet" | "parking" | "maintenance" | "security" | "other";
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  propertyName: string;
  unitName?: string;
  status: "pending" | "paid" | "overdue";
  createdDate: string;
}

const BillManagement = () => {
  const [bills, setBills] = useState<Bill[]>([
    {
      id: "1",
      type: "electricity",
      title: "Electricity Bill - December 2024",
      description: "Monthly electricity consumption",
      amount: 3500,
      dueDate: "2025-01-15",
      propertyName: "Kamau Heights",
      unitName: "A1",
      status: "pending",
      createdDate: "2025-01-01"
    },
    {
      id: "2",
      type: "water",
      title: "Water Bill - December 2024",
      description: "Monthly water usage",
      amount: 1200,
      dueDate: "2025-01-10",
      propertyName: "Riverside Apartments",
      unitName: "B2",
      status: "paid",
      createdDate: "2025-01-01"
    },
    {
      id: "3",
      type: "maintenance",
      title: "Plumbing Repair",
      description: "Fix leaking pipes in unit C3",
      amount: 8000,
      dueDate: "2025-01-20",
      propertyName: "Garden View",
      unitName: "C3",
      status: "overdue",
      createdDate: "2024-12-28"
    }
  ]);

  const [newBill, setNewBill] = useState({
    type: "",
    title: "",
    description: "",
    amount: "",
    dueDate: "",
    propertyName: "",
    unitName: ""
  });

  const billTypes = [
    { value: "electricity", label: "Electricity", icon: Zap },
    { value: "water", label: "Water", icon: Droplets },
    { value: "internet", label: "Internet", icon: Wifi },
    { value: "parking", label: "Parking", icon: Car },
    { value: "maintenance", label: "Maintenance", icon: Receipt },
    { value: "security", label: "Security", icon: Receipt },
    { value: "other", label: "Other", icon: Receipt }
  ];

  const addBill = () => {
    if (!newBill.type || !newBill.title || !newBill.amount || !newBill.dueDate || !newBill.propertyName) {
      toast.error("Please fill in all required fields");
      return;
    }

    const bill: Bill = {
      id: Date.now().toString(),
      type: newBill.type as Bill["type"],
      title: newBill.title,
      description: newBill.description,
      amount: parseInt(newBill.amount),
      dueDate: newBill.dueDate,
      propertyName: newBill.propertyName,
      unitName: newBill.unitName,
      status: new Date(newBill.dueDate) < new Date() ? "overdue" : "pending",
      createdDate: new Date().toISOString().split('T')[0]
    };

    setBills([bill, ...bills]);
    setNewBill({
      type: "",
      title: "",
      description: "",
      amount: "",
      dueDate: "",
      propertyName: "",
      unitName: ""
    });
    
    toast.success("Bill added successfully!");
  };

  const markAsPaid = (billId: string) => {
    setBills(bills.map(bill => 
      bill.id === billId ? { ...bill, status: "paid" as const } : bill
    ));
    toast.success("Bill marked as paid!");
  };

  const deleteBill = (billId: string) => {
    setBills(bills.filter(bill => bill.id !== billId));
    toast.success("Bill deleted successfully!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getBillIcon = (type: string) => {
    const billType = billTypes.find(bt => bt.value === type);
    const Icon = billType?.icon || Receipt;
    return <Icon className="h-5 w-5" />;
  };

  const totalPending = bills.filter(b => b.status === "pending").reduce((sum, bill) => sum + bill.amount, 0);
  const totalOverdue = bills.filter(b => b.status === "overdue").reduce((sum, bill) => sum + bill.amount, 0);
  const totalPaid = bills.filter(b => b.status === "paid").reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bill Management</h2>
          <p className="text-gray-600">Manage utilities and other property bills</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Bill
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Bill</DialogTitle>
              <DialogDescription>Create a new bill for property expenses</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="bill-type">Bill Type</Label>
                <Select value={newBill.type} onValueChange={(value) => setNewBill({ ...newBill, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bill type" />
                  </SelectTrigger>
                  <SelectContent>
                    {billTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center space-x-2">
                          <type.icon className="h-4 w-4" />
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bill-title">Title</Label>
                <Input
                  id="bill-title"
                  value={newBill.title}
                  onChange={(e) => setNewBill({ ...newBill, title: e.target.value })}
                  placeholder="e.g., Electricity Bill - January 2025"
                />
              </div>
              <div>
                <Label htmlFor="bill-description">Description</Label>
                <Textarea
                  id="bill-description"
                  value={newBill.description}
                  onChange={(e) => setNewBill({ ...newBill, description: e.target.value })}
                  placeholder="Brief description of the bill"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bill-amount">Amount (KES)</Label>
                  <Input
                    id="bill-amount"
                    type="number"
                    value={newBill.amount}
                    onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
                    placeholder="5000"
                  />
                </div>
                <div>
                  <Label htmlFor="bill-due-date">Due Date</Label>
                  <Input
                    id="bill-due-date"
                    type="date"
                    value={newBill.dueDate}
                    onChange={(e) => setNewBill({ ...newBill, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bill-property">Property</Label>
                  <Input
                    id="bill-property"
                    value={newBill.propertyName}
                    onChange={(e) => setNewBill({ ...newBill, propertyName: e.target.value })}
                    placeholder="Property name"
                  />
                </div>
                <div>
                  <Label htmlFor="bill-unit">Unit (Optional)</Label>
                  <Input
                    id="bill-unit"
                    value={newBill.unitName}
                    onChange={(e) => setNewBill({ ...newBill, unitName: e.target.value })}
                    placeholder="Unit name"
                  />
                </div>
              </div>
              <Button onClick={addBill} className="w-full bg-green-600 hover:bg-green-700">
                Add Bill
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Pending Bills</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">KES {totalPending.toLocaleString()}</p>
            <p className="text-yellow-100">{bills.filter(b => b.status === "pending").length} bills</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-600 to-red-500 text-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Receipt className="h-5 w-5" />
              <span>Overdue Bills</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">KES {totalOverdue.toLocaleString()}</p>
            <p className="text-red-100">{bills.filter(b => b.status === "overdue").length} bills</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-600 to-green-500 text-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Paid Bills</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">KES {totalPaid.toLocaleString()}</p>
            <p className="text-green-100">{bills.filter(b => b.status === "paid").length} bills</p>
          </CardContent>
        </Card>
      </div>

      {/* Bills List */}
      <Card>
        <CardHeader>
          <CardTitle>All Bills</CardTitle>
          <CardDescription>Manage your property bills and expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bills.map((bill) => (
              <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    {getBillIcon(bill.type)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{bill.title}</p>
                    <p className="text-sm text-gray-500">{bill.description}</p>
                    <p className="text-xs text-gray-400">
                      {bill.propertyName}{bill.unitName && ` - ${bill.unitName}`} • Due: {bill.dueDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-bold text-gray-900">KES {bill.amount.toLocaleString()}</p>
                    <Badge className={getStatusColor(bill.status)}>
                      {bill.status}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    {bill.status !== "paid" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAsPaid(bill.id)}
                        className="text-green-600 border-green-600 hover:bg-green-50"
                      >
                        Mark Paid
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteBill(bill.id)}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillManagement;
