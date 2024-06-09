import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function GoogleAuthButton({ apiKey }: { apiKey: string }) {
  const handleOnClick = async () => {
    if (apiKey.length < 5) {
      toast("placse enter a apikey");
      return;
    }

    signIn("google", { redirect: false, callbackUrl: "/emails" });
  };
  return (
    <div>
      <Button onClick={handleOnClick}>signin with google</Button>
    </div>
  );
}
