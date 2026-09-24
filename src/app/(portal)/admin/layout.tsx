"use client";

import React from "react";
import { Outlet } from "react-router-dom";
import { PortalSidebar } from "@/components/layout/PortalSidebar";
import { PortalHeader } from "@/components/layout/PortalHeader";

export default function AdminLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans overflow-hidden">
      <PortalSidebar role="ADMIN" />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto overflow-x-hidden w-full" id="admin-portal-scroll-area">
        <PortalHeader userRole="ADMIN" />
        <div className="flex-1 transition-opacity duration-150 ease-out">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
}
