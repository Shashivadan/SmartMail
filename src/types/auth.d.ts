import { DefaultSession } from "@auth/core/types";

declare module "@auth/core/types" {
  interface Session {
    user?: {} & DefaultSession["user"];
  }
  interface User {
    accessToken: string;
    refreshToken: string;
  }
}
