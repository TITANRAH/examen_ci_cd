import { useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setError("");
    setLoading(true);

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
        setError(data.message || "Error al iniciar sesión");
        return { success: false, error: data.message };
      }
    } catch (err) {
      console.log("Error de conexión", err);
      setError("Error de conexión");
      return { success: false, error: "Error de conexión" };
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
