"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function KambazPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/Dashboard");
  }, [router]);

  return null;
}