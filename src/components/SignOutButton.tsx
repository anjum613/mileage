'use client';
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
    return (
        <Button variant="destructive" onClick={() => signOut({ callbackUrl: "/admin" })}>
            Sign Out
        </Button>
    );
}
