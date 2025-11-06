"use client";
import { ReactNode } from "react";
import AccountNavigation from "./Navigation";
// Layout component for Account section
export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="d-flex">
      <div className="d-none d-md-block me-4" style={{ width: "200px" }}>
        <AccountNavigation />
      </div>
      <div className="flex-fill">
        {children}
      </div>
    </div>
  );
}