// app/(Kambaz)/layout.tsx
"use client";
import { ReactNode, useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import KambazNavigation from "./Navigation";

export default function KambazLayout({ 
  children 
}: { 
  children: ReactNode 
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Provider store={store}>
        <div className="p-4">Loading...</div>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <div className="d-flex">
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
          className="flex-fill"
          style={{
            marginLeft: '120px',
            minHeight: '100vh'
          }}
        >
          {children}
        </div>
      </div>
    </Provider>
  );
}