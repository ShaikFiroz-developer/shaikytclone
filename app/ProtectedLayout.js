"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "./auth";

export default function ProtectedLayout({ children }) {
  const { isAuthenticated } = useContext(AuthContext); // Consume authentication status
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin"); // Redirect unauthenticated users to the sign-in page
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
}
