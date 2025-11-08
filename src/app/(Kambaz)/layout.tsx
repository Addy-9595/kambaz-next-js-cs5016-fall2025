"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "./store";
import KambazNavigation from "./Navigation";

export default function KambazLayout({ 
  children 
}: { 
  children: ReactNode 
}) {
  return (
    <Provider store={store}>
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        <div 
          className="d-none d-md-block bg-black"
          style={{
            width: '120px',
            minHeight: '100vh',
            position: 'fixed',
            left: 0,
            top: 0
          }}
        >
          <KambazNavigation />
        </div>
        <div 
          style={{
            marginLeft: '120px',
            width: 'calc(100% - 120px)',
            minHeight: '100vh'
          }}
        >
          {children}
        </div>
      </div>
    </Provider>
  );
}