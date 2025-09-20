import { isValidEmail, isValidPassword } from "../../src/lib/auth";

describe("Login API - Integration Tests", () => {
  describe("Authentication Logic", () => {
    it("should validate email correctly", () => {
      expect(isValidEmail("admin@example.com")).toBe(true);
      expect(isValidEmail("invalid-email")).toBe(false);
    });

    it("should validate password correctly", () => {
      expect(isValidPassword("password123")).toBe(true);
      expect(isValidPassword("short")).toBe(false);
    });

    it("should authenticate user with valid credentials", async () => {
      const { authenticateUser } = await import("../../src/lib/auth");

      const credentials = {
        email: "admin@example.com",
        password: "password123",
      };

      const user = await authenticateUser(credentials);

      expect(user).toEqual({
        id: "1",
        email: "admin@example.com",
        name: "Usuario Admin",
      });
    });

    it("should reject invalid credentials", async () => {
      const { authenticateUser } = await import("../../src/lib/auth");

      const credentials = {
        email: "wrong@example.com",
        password: "password123",
      };

      await expect(authenticateUser(credentials)).rejects.toThrow(
        "Credenciales incorrectas"
      );
    });
  });
});
