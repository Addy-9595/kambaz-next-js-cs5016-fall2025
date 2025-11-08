"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// Account page component
export default function AccountPage() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/SignIn");
    } else {
      router.push("/Account/Profile");
    }
  }, [currentUser, router]);

  return null;
}