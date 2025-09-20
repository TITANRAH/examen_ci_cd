import { useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setError("");
    setLoading(true);

    if (!email || !email.includes("@")) {
      setError("Error");
      setLoading(false);
      return { success: false, error: "Error" };
    }

    if (!password || password.length < 3) {
      setError("Error");
      setLoading(false);
      return { success: false, error: "Error" };
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("auth-token", "fake-jwt-token");
        router.push("/dashboard");
        return { success: true, user: data.user };
      } else {
        setError("Error");
        return { success: false, error: "Error" };
      }
    } catch (err) {
      setError("Error");
      return { success: false, error: "Error" };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    router.push("/login");
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("auth-token");
  };

  return {
    login,
    logout,
    isAuthenticated,
    loading,
    error,
  };
}
