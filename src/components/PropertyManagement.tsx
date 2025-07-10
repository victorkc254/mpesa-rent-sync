
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Users, Plus, MapPin, Home } from "lucide-react";
import { toast } from "sonner";

interface Unit {
  id: string;
  name: string;
  rent: number;
  tenant?: {
    name: string;
    phone: string;
  };
  status: "occupied" | "vacant";
}

interface Property {
  id: string;
  name: string;
  location: string;
  units: Unit[];
}

const PropertyManagement = () => {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: "1",
      name: "Kamau Heights",
      location: "Kileleshwa, Nairobi",
      units: [
        { id: "1", name: "A1", rent: 25000, tenant: { name: "John Kamau", phone: "0712345678" }, status: "occupied" },
        { id: "2", name: "A2", rent: 25000, status: "vacant" },
        { id: "3", name: "A3", rent: 25000, tenant: { name: "Sarah Muthoni", phone: "0723456789" }, status: "occupied" },
      ]
    },
    {
      id: "2",
      name: "Riverside Apartments",
      location: "Westlands, Nairobi",
      units: [
        { id: "4", name: "B1", rent: 20000, tenant: { name: "James Kimani", phone: "0734567890" }, status: "occupied" },
        { id: "5", name: "B2", rent: 18000, tenant: { name: "Mary Wanjiku", phone: "0745678901" }, status: "occupied" },
      ]
    }
  ]);

  const [newProperty, setNewProperty] = useState({ name: "", location: "" });
  const [newUnit, setNewUnit] = useState({ name: "", rent: "", propertyId: "" });
  const [newTenant, setNewTenant] = useState({ name: "", phone: "", unitId: "" });

  const addProperty = () => {
    if (!newProperty.name || !newProperty.location) {
      toast.error("Please fill in all property details");
      return;
    }

    const property: Property = {
      id: Date.now().toString(),
      name: newProperty.name,
      location: newProperty.location,
      units: []
    };

    setProperties([...properties, property]);
    setNewProperty({ name: "", location: "" });
    toast.success("Property added successfully!");
  };

  const addUnit = () => {
    if (!newUnit.name || !newUnit.rent || !newUnit.propertyId) {
      toast.error("Please fill in all unit details");
      return;
    }

    setProperties(properties.map(property => {
      if (property.id === newUnit.propertyId) {
        const unit: Unit = {
          id: Date.now().toString(),
          name: newUnit.name,
          rent: parseInt(newUnit.rent),
          status: "vacant"
        };
        return { ...property, units: [...property.units, unit] };
      }
      return property;
    }));

    setNewUnit({ name: "", rent: "", propertyId: "" });
    toast.success("Unit added successfully!");
  };

  const addTenant = () => {
    if (!newTenant.name || !newTenant.phone || !newTenant.unitId) {
      toast.error("Please fill in all tenant details");
      return;
    }

    setProperties(properties.map(property => ({
      ...property,
      units: property.units.map(unit => {
        if (unit.id === newTenant.unitId) {
          return {
            ...unit,
            tenant: { name: newTenant.name, phone: newTenant.phone },
            status: "occupied" as const
          };
        }
        return unit;
      })
    })));

    setNewTenant({ name: "", phone: "", unitId: "" });
    toast.success("Tenant added successfully!");
  };

  const getTotalUnits = (property: Property) => property.units.length;
  const getOccupiedUnits = (property: Property) => property.units.filter(unit => unit.status === "occupied").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Property Management</h2>
          <p className="text-gray-600">Manage your properties, units, and tenants</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
              <DialogDescription>Enter the details for your new property</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="property-name">Property Name</Label>
                <Input
                  id="property-name"
                  value={newProperty.name}
                  onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
                  placeholder="e.g., Kamau Heights"
                />
              </div>
              <div>
                <Label htmlFor="property-location">Location</Label>
                <Input
                  id="property-location"
                  value={newProperty.location}
                  onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
                  placeholder="e.g., Kileleshwa, Nairobi"
                />
              </div>
              <Button onClick={addProperty} className="w-full bg-green-600 hover:bg-green-700">
                Add Property
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-green-600" />
                    <span>{property.name}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-1 mt-1">
                    <MapPin className="h-4 w-4" />
                    <span>{property.location}</span>
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {getOccupiedUnits(property)}/{getTotalUnits(property)} occupied
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Property Stats */}
                <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{getTotalUnits(property)}</p>
                    <p className="text-sm text-gray-500">Total Units</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{getOccupiedUnits(property)}</p>
                    <p className="text-sm text-gray-500">Occupied</p>
                  </div>
                </div>

                {/* Units List */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Units</h4>
                  {property.units.map((unit) => (
                    <div key={unit.id} className="flex items-center justify-between p-2 bg-white border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Home className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">{unit.name}</p>
                          <p className="text-sm text-gray-500">KES {unit.rent.toLocaleString()}/month</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {unit.tenant ? (
                          <div>
                            <p className="text-sm font-medium">{unit.tenant.name}</p>
                            <p className="text-xs text-gray-500">{unit.tenant.phone}</p>
                          </div>
                        ) : (
                          <Badge variant="outline">Vacant</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Plus className="h-3 w-3 mr-1" />
                        Add Unit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Unit to {property.name}</DialogTitle>
                        <DialogDescription>Enter the unit details</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="unit-name">Unit Name</Label>
                          <Input
                            id="unit-name"
                            value={newUnit.name}
                            onChange={(e) => setNewUnit({ ...newUnit, name: e.target.value, propertyId: property.id })}
                            placeholder="e.g., A1, House 5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="unit-rent">Monthly Rent (KES)</Label>
                          <Input
                            id="unit-rent"
                            type="number"
                            value={newUnit.rent}
                            onChange={(e) => setNewUnit({ ...newUnit, rent: e.target.value })}
                            placeholder="25000"
                          />
                        </div>
                        <Button onClick={addUnit} className="w-full bg-green-600 hover:bg-green-700">
                          Add Unit
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Users className="h-3 w-3 mr-1" />
                        Add Tenant
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Tenant to {property.name}</DialogTitle>
                        <DialogDescription>Select a unit and enter tenant details</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="tenant-unit">Select Unit</Label>
                          <select
                            id="tenant-unit"
                            className="w-full p-2 border rounded-md"
                            value={newTenant.unitId}
                            onChange={(e) => setNewTenant({ ...newTenant, unitId: e.target.value })}
                          >
                            <option value="">Select a unit</option>
                            {property.units.filter(unit => unit.status === "vacant").map(unit => (
                              <option key={unit.id} value={unit.id}>
                                {unit.name} - KES {unit.rent.toLocaleString()}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="tenant-name">Tenant Name</Label>
                          <Input
                            id="tenant-name"
                            value={newTenant.name}
                            onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <Label htmlFor="tenant-phone">Phone Number</Label>
                          <Input
                            id="tenant-phone"
                            value={newTenant.phone}
                            onChange={(e) => setNewTenant({ ...newTenant, phone: e.target.value })}
                            placeholder="0712345678"
                          />
                        </div>
                        <Button onClick={addTenant} className="w-full bg-green-600 hover:bg-green-700">
                          Add Tenant
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PropertyManagement;
