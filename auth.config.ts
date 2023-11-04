import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) {
          return true;
        }
        return false;
      } else if (isLoggedIn) {
        return NextResponse.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
