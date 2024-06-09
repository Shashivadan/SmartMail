import { useSession } from "next-auth/react";
import React from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import SignOutButton from "./SignOutButton";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <>
      {session?.user && (
        <div>
          <div className="flex justify-between p-4 bg-slate-200 rounded-lg">
            <div className="flex items-center justify-center">
              <Avatar>
                {session.user.image && (
                  <AvatarImage src={session?.user?.image} alt="@shadcn" />
                )}
              </Avatar>
              <div className="space-y-0.5 font-medium dark:text-white text-left= rtl:text-right ms-3">
                <div>{session.user.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {session.user.email}
                </div>
              </div>
            </div>
            <SignOutButton />
          </div>
        </div>
      )}
    </>
  );
}
