"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  return (
    <Button
      variant="ghost"
      onClick={() => signOut({ callbackUrl: "/login?message=signedout" })}
      className="px-14 py-2 rounded font-medium bg-[#fef3c7] text-[#92400e] hover:bg-[#fde68a]"
    >
      Sign Out
    </Button>
  );
}