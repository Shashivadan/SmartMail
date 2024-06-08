"use client";

import GoogleAuthButton from "@/components/GoogleAuthButton";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const [apikey, setApikey] = useState<string>("");

  return (
    <main className=" bg-slate-300 h-screen w-screen flex  flex-col justify-center items-center gap-11">
      <div className="">
        <GoogleAuthButton />
      </div>
      <div>
        <Input
          type="password"
          onChange={(e) => setApikey(e.target.value)}
          placeholder="enter your GPT api key"
          className=" border-black placeholder-slate-700"
        />
      </div>
    </main>
  );
}
