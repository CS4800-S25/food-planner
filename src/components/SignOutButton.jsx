"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/login?message=signedout" })}
      variant="default"
      className="mt-4 w-full max-w-xs"
    >
      Sign Out
    </Button>
  );
}