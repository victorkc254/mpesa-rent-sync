
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Banknote, Receipt, Download } from "lucide-react";
import { toast } from "sonner";

interface Payment {
  id: string;
  tenantName: string;
  unitName: string;
  propertyName: string;
  amount: number;
  date: string;
  mpesaCode: string;
  receiptNumber: string;
  status: "completed" | "pending";
}

const PaymentTracking = () => {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "1",
      tenantName: "John Kamau",
      unitName: "A1",
      propertyName: "Kamau Heights",
      amount: 25000,
      date: "2025-01-08",
      mpesaCode: "RBK1A2B3C4",
      receiptNumber: "RE-001-2025",
      status: "completed"
    },
    {
      id: "2",
      tenantName: "Mary Wanjiku",
      unitName: "B2",
      propertyName: "Riverside Apartments",
      amount: 18000,
      date: "2025-01-07",
      mpesaCode: "RBK2B3C4D5",
      receiptNumber: "RE-002-2025",
      status: "completed"
    },
    {
      id: "3",
      tenantName: "Peter Ochieng",
      unitName: "C3",
      propertyName: "Garden View",
      amount: 22000,
      date: "2025-01-06",
      mpesaCode: "RBK3C4D5E6",
      receiptNumber: "RE-003-2025",
      status: "completed"
    }
  ]);

  const [newPayment, setNewPayment] = useState({
    tenantName: "",
    unitName: "",
    propertyName: "",
    amount: "",
    mpesaCode: ""
  });

  const addPayment = () => {
    if (!newPayment.tenantName || !newPayment.amount || !newPayment.mpesaCode) {
      toast.error("Please fill in all required fields");
      return;
    }

    const payment: Payment = {
      id: Date.now().toString(),
      tenantName: newPayment.tenantName,
      unitName: newPayment.unitName,
      propertyName: newPayment.propertyName,
      amount: parseInt(newPayment.amount),
      date: new Date().toISOString().split('T')[0],
      mpesaCode: newPayment.mpesaCode,
      receiptNumber: `RE-${String(payments.length + 1).padStart(3, '0')}-2025`,
      status: "completed"
    };

    setPayments([payment, ...payments]);
    setNewPayment({
      tenantName: "",
      unitName: "",
      propertyName: "",
      amount: "",
      mpesaCode: ""
    });
    
    toast.success("Payment recorded successfully! Receipt generated.");
  };

  const generateReceipt = (payment: Payment) => {
    // In a real app, this would generate and download a PDF
    const receiptContent = `
RENT RECEIPT
============

Receipt No: ${payment.receiptNumber}
Date: ${payment.date}

Property: ${payment.propertyName}
Unit: ${payment.unitName}
Tenant: ${payment.tenantName}

Amount Paid: KES ${payment.amount.toLocaleString()}
M-Pesa Code: ${payment.mpesaCode}

Thank you for your payment!
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Receipt-${payment.receiptNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast.success("Receipt downloaded successfully!");
  };

  const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Tracking</h2>
          <p className="text-gray-600">Record and track rental payments</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Record Payment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record New Payment</DialogTitle>
              <DialogDescription>Enter payment details to generate a receipt</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="tenant-name">Tenant Name</Label>
                <Input
                  id="tenant-name"
                  value={newPayment.tenantName}
                  onChange={(e) => setNewPayment({ ...newPayment, tenantName: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="property-name">Property</Label>
                  <Input
                    id="property-name"
                    value={newPayment.propertyName}
                    onChange={(e) => setNewPayment({ ...newPayment, propertyName: e.target.value })}
                    placeholder="Kamau Heights"
                  />
                </div>
                <div>
                  <Label htmlFor="unit-name">Unit</Label>
                  <Input
                    id="unit-name"
                    value={newPayment.unitName}
                    onChange={(e) => setNewPayment({ ...newPayment, unitName: e.target.value })}
                    placeholder="A1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="amount">Amount (KES)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                  placeholder="25000"
                />
              </div>
              <div>
                <Label htmlFor="mpesa-code">M-Pesa Transaction Code</Label>
                <Input
                  id="mpesa-code"
                  value={newPayment.mpesaCode}
                  onChange={(e) => setNewPayment({ ...newPayment, mpesaCode: e.target.value })}
                  placeholder="RBK1A2B3C4"
                />
              </div>
              <Button onClick={addPayment} className="w-full bg-green-600 hover:bg-green-700">
                Record Payment & Generate Receipt
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-green-600 to-green-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Banknote className="h-5 w-5" />
            <span>Payment Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-green-100">Total Collected</p>
              <p className="text-2xl font-bold">KES {totalPayments.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-green-100">This Month</p>
              <p className="text-2xl font-bold">{payments.length}</p>
              <p className="text-sm text-green-100">payments</p>
            </div>
            <div>
              <p className="text-green-100">Average Payment</p>
              <p className="text-2xl font-bold">
                KES {payments.length > 0 ? Math.round(totalPayments / payments.length).toLocaleString() : '0'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
          <CardDescription>All recorded rental payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Receipt className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{payment.tenantName}</p>
                      <p className="text-sm text-gray-500">
                        {payment.propertyName} - {payment.unitName}
                      </p>
                      <p className="text-xs text-gray-400">
                        {payment.date} • M-Pesa: {payment.mpesaCode}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-bold text-green-600">KES {payment.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{payment.receiptNumber}</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Badge className="bg-green-100 text-green-800">
                      {payment.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => generateReceipt(payment)}
                      className="text-xs"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Receipt
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

export default PaymentTracking;
