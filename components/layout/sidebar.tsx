"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Boxes,
  Wrench,
  Settings,
  FileText,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const sidebarItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Sales", href: "/sales", icon: ShoppingCart },
  { name: "Inventory", href: "/inventory", icon: Boxes },
  { name: "Products", href: "/products", icon: Package },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Employees", href: "/employees", icon: UserCheck },
  { name: "Attendance", href: "/attendance", icon: Clock },
  { name: "Maintenance", href: "/maintenance", icon: Wrench },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar({ className }: { className?: string }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`flex flex-col h-full ${className} ${
        collapsed ? "w-16" : "w-[220px] lg:w-[280px]"
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b px-4 lg:px-6">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-3 font-semibold">
            <LayoutDashboard className="h-6 w-6" />
            <span className="text-lg">Wellspring WRS</span>
          </Link>
        )}
        <Button
          variant="outline"
          size="icon"
          className={`h-8 w-8 ${collapsed ? "rotate-180" : ""}`}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="grid items-start gap-2 px-4 text-sm font-medium">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:bg-muted hover:text-primary ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      {!collapsed && (
        <div className="mt-auto p-4">
          <Card className="bg-muted/50">
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-base">Upgrade to Pro</CardTitle>
              <CardDescription className="text-xs">
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-4 pt-2">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
