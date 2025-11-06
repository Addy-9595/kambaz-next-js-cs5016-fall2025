"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "./store";
import KambazNavigation from "./Navigation";
import "./styles.css";
// Layout component for Kambaz section
export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <div className="d-flex" id="wd-kambaz">
        <div className="d-none d-md-block bg-black">
          <KambazNavigation />
        </div>
        <div className="flex-fill p-4">
          {children}
        </div>
      </div>
    </Provider>
  );
}