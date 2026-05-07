"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function CheckAuth({ children, protectedRoute }) {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);

    if (protectedRoute) {
      if (!token) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    } else {
      if (token) {
        router.push("/");
      } else {
        setLoading(false);
      }
    }
  }, [router, protectedRoute]);

  if (loading) {
    return <div>loading...</div>;
  }
  return children;
}

export default CheckAuth;