"use client";

import React from "react";
import { Outlet } from "react-router-dom";
import { PortalSidebar } from "@/components/layout/PortalSidebar";

export default function AdminLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <PortalSidebar role="ADMIN" />

      <div className="flex-1 flex flex-col min-w-0" id="admin-portal-scroll-area">

        <div className="flex-1 transition-opacity duration-150 ease-out">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
}
