"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const router = useRouter();
  // Redirect to Signin if not authenticated
  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
    }
  }, [currentUser, router]);
  
  if (currentUser) {
    return children;
  }
  
  return null;
}