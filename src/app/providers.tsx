"use client";

import React, { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

export default function ({ children }: PropsWithChildren) {
  return (
    <>
      <SessionProvider>
        <Toaster richColors />
        <div>{children}</div>
      </SessionProvider>
    </>
  );
}
