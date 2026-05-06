"use client";
import CheckAuth from "@/components/check-auth";

export default function ProtectedLayout({ children }) {
  return <CheckAuth protectedRoute={true}> { children } </CheckAuth>;
}