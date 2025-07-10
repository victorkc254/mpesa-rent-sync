
import { Building2, Users, Banknote, FileText, TrendingUp, Receipt, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent as SidebarContentPrimitive,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: TrendingUp },
  { id: "properties", label: "Properties", icon: Building2 },
  { id: "payments", label: "Rent Payments", icon: Banknote },
  { id: "bills", label: "Other Bills", icon: Receipt },
  { id: "reports", label: "Reports", icon: FileText },
];

function SidebarContentComponent({ activeTab, setActiveTab, onItemClick }: AppSidebarProps & { onItemClick?: () => void }) {
  return (
    <>
      <div className="flex items-center space-x-2 p-4 border-b border-green-100">
        <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">R</span>
        </div>
        <span className="font-semibold text-green-800">RentEasy</span>
      </div>

      <div className="p-4">
        <h4 className="text-green-700 font-medium mb-3">Management</h4>
        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onItemClick?.();
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-green-100 text-green-800 border-r-2 border-green-600"
                    : "hover:bg-green-50 text-gray-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}

export function AppSidebar({ activeTab, setActiveTab }: AppSidebarProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContentComponent 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            onItemClick={() => {
              // Close the sheet when an item is clicked
              const closeButton = document.querySelector('[data-state="open"] button[aria-label="Close"]') as HTMLButtonElement;
              closeButton?.click();
            }}
          />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sidebar className="border-r border-green-100">
      <SidebarHeader className="border-b border-green-100">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-semibold text-green-800">RentEasy</span>
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContentPrimitive>
        <SidebarGroup>
          <SidebarGroupLabel className="text-green-700 font-medium">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveTab(item.id)}
                      isActive={activeTab === item.id}
                      className={`w-full justify-start ${
                        activeTab === item.id
                          ? "bg-green-100 text-green-800 border-r-2 border-green-600"
                          : "hover:bg-green-50 text-gray-700"
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContentPrimitive>
    </Sidebar>
  );
}

export function MobileMenuTrigger({ activeTab, setActiveTab }: AppSidebarProps) {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SidebarContentComponent 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          onItemClick={() => {
            // Close the sheet when an item is clicked
            const closeButton = document.querySelector('[data-state="open"] button[aria-label="Close"]') as HTMLButtonElement;
            closeButton?.click();
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
