import React, { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className=" max-w-5xl m-auto h-screen">{children}</div>
    </>
  );
}
