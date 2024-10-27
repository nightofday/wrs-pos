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
  ChevronsUpDown,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

export default function Sidebar({
  className,
  isMobile = false,
  onMobileItemClick,
}: {
  className?: string;
  isMobile?: boolean;
  onMobileItemClick?: () => void;
}) {
  const [collapsed, setCollapsed] = useState(true);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const handleItemClick = () => {
    if (isMobile && onMobileItemClick) {
      onMobileItemClick();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full",
        collapsed && !isMobile ? "w-16" : "w-[200px] lg:w-[260px]",
        className
      )}
    >
      <div className="flex items-center h-14 px-4 border-b bg-muted/40 justify-between lg:h-[60px] lg:px-6">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-3 font-semibold">
            <LayoutDashboard className="h-6 w-6" />
            <span className="text-lg">Wellspring </span>
          </Link>
        )}
        {!isMobile && (
          <Button
            variant="outline"
            size="icon"
            className={`h-8 w-8 transition-all duration-300 ease-in-out hover:bg-muted hover:scale-105 active:scale-95`}
            onClick={() => setCollapsed(!collapsed)}
          >
            <div
              className={`transform transition-all duration-300 ease-in-out ${
                collapsed ? "rotate-180" : ""
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
            </div>
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="grid items-start gap-2 px-4 text-sm font-medium">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-primary",
                collapsed ? "justify-center" : ""
              )}
              onClick={handleItemClick}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t p-2 md:p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full min-h-[40px] md:min-h-[48px]",
                collapsed
                  ? "px-0 hover:bg-transparent hover:text-inherit"
                  : "justify-start px-2"
              )}
            >
              <div
                className={cn(
                  "flex items-center w-full overflow-hidden",
                  collapsed ? "justify-center" : "gap-2 md:gap-3"
                )}
              >
                <Avatar className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0">
                  <AvatarImage
                    src="/avatars/user-avatar.jpg"
                    alt="User avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <>
                    <div className="flex flex-col items-start min-w-0">
                      <p className="text-[11px] md:text-xs font-medium leading-none truncate w-full">
                        John Doe
                      </p>
                      <p className="text-[9px] md:text-[11px] text-muted-foreground hidden md:block truncate w-full">
                        john.doe@example.com
                      </p>
                    </div>
                    <ChevronsUpDown className="ml-auto h-3 w-3 opacity-50 flex-shrink-0" />
                  </>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44 md:w-52">
            <DropdownMenuItem className="text-xs md:text-sm">
              <Settings className="mr-2 h-3 w-3" />
              <span>Profile Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs md:text-sm">
              <LogOut className="mr-2 h-3 w-3" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
