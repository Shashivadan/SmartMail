import React, { PropsWithChildren } from "react";

export default function ({ children }: PropsWithChildren) {
  return (
    <>
      <div className=" max-w-5xl m-auto bg-slate-200 h-screen">{children}</div>
    </>
  );
}
