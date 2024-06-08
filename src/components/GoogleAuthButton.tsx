import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function GoogleAuthButton() {
  const handleOnClick = async () => {
    signIn("google", { redirect: false, callbackUrl: "/emails" });
  };
  return (
    <div>
      <Button onClick={handleOnClick}>signin with google</Button>
    </div>
  );
}
