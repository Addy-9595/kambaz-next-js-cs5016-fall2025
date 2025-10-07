"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const OUTLOOK_URL = "https://outlook.live.com/";

export default function InboxPage() {
    const router = useRouter();

    useEffect(() => {
        window.location.href = OUTLOOK_URL;
    }, []);

    return (
        <main>
            <h1>Redirecting to Microsoft Outlook...</h1>
        </main>
    );
}