import { useSession } from "next-auth/react";
import React from "react";

export default function profile() {
  const { data: session } = useSession();
  return <div>profile</div>;
}
