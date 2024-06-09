import React from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function SingOutButton() {
  const { status } = useSession();
  const handleOnclick = () => {
    localStorage.clear();
    signOut({ callbackUrl: "/" });
  };
  return <>{status && <Button onClick={handleOnclick}>log out</Button>}</>;
}
