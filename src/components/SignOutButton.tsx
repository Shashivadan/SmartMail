import React from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function () {
  const { status } = useSession();
  return (
    <>
      {status && (
        <Button onClick={() => signOut({ callbackUrl: "/" })}>log out</Button>
      )}
    </>
  );
}
