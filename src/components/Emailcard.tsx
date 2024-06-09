"use client";

import React from "react";
import Modal from "./Modal";
import { useState } from "react";

export default function Emailcard({
  id,
  body,
  snippet,
  subject,
  from,
  classification,
}: any) {
  const [isvisbale, setIsvisbale] = useState<boolean>(false);
  return (
    <div className=" min-w-full">
      <button
        onClick={() => setIsvisbale(!isvisbale)}
        className=" bg-slate-300 rounded-lg"
      >
        <div className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-muted">
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="font-semibold">{from}</div>
              </div>
              <div className="ml-auto text-xs text-foreground">
                {classification ? <>{classification}</> : <>Not classified</>}
              </div>
            </div>
            <div className="text-xs font-medium">{subject}</div>
          </div>
          <div className="line-clamp-2 text-xs text-muted-foreground">
            {snippet}
          </div>
        </div>
      </button>
      <Modal isvisable={isvisbale} setIsvisbale={setIsvisbale} body={body} />
    </div>
  );
}
