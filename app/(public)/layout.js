"use client";
import CheckAuth from "@/components/check-auth";

export default function AuthLayout({ children }) {
  return <CheckAuth protectedRoute={false}> { children } </CheckAuth>;
}