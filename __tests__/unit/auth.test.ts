import {
  isValidEmail,
  isValidPassword,
  authenticateUser,
  calculateStats,
  formatDate,
  generateId,
} from "../../src/lib/auth";

describe("Auth Utilities - Unit Tests", () => {
  describe("isValidEmail", () => {
    it("should return true for valid email addresses", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name@domain.co.uk")).toBe(true);
      expect(isValidEmail("test+tag@example.org")).toBe(true);
    });

    it("should return false for invalid email addresses", () => {
      expect(isValidEmail("invalid-email")).toBe(false);
      expect(isValidEmail("@example.com")).toBe(false);
      expect(isValidEmail("test@")).toBe(false);
      expect(isValidEmail("")).toBe(false);
    });
  });

  describe("isValidPassword", () => {
    it("should return true for valid passwords", () => {
      expect(isValidPassword("password123")).toBe(true);
      expect(isValidPassword("MyPass123")).toBe(true);
      expect(isValidPassword("Secure@123")).toBe(true);
    });

    it("should return false for invalid passwords", () => {
      expect(isValidPassword("short")).toBe(false);
      expect(isValidPassword("12345678")).toBe(false);
      expect(isValidPassword("password")).toBe(false);
      expect(isValidPassword("")).toBe(false);
    });
  });

  describe("authenticateUser", () => {
    it("should authenticate user with valid credentials", async () => {
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

    it("should reject invalid email", async () => {
      const credentials = { email: "invalid-email", password: "password123" };

      await expect(authenticateUser(credentials)).rejects.toThrow(
        "Email inválido"
      );
    });

    it("should reject invalid password", async () => {
      const credentials = { email: "admin@example.com", password: "short" };

      await expect(authenticateUser(credentials)).rejects.toThrow(
        "Contraseña inválida"
      );
    });

    it("should reject incorrect credentials", async () => {
      const credentials = {
        email: "wrong@example.com",
        password: "password123",
      };

      await expect(authenticateUser(credentials)).rejects.toThrow(
        "Credenciales incorrectas"
      );
    });
  });

  describe("calculateStats", () => {
    it("should calculate correct statistics for valid numbers", () => {
      const numbers = [1, 2, 3, 4, 5];
      const stats = calculateStats(numbers);

      expect(stats).toEqual({
        sum: 15,
        average: 3,
        min: 1,
        max: 5,
      });
    });

    it("should handle empty array", () => {
      const stats = calculateStats([]);

      expect(stats).toEqual({
        sum: 0,
        average: 0,
        min: 0,
        max: 0,
      });
    });

    it("should handle single number", () => {
      const stats = calculateStats([42]);

      expect(stats).toEqual({
        sum: 42,
        average: 42,
        min: 42,
        max: 42,
      });
    });
  });

  describe("formatDate", () => {
    it("should format date correctly", () => {
      const date = new Date("2024-01-15");
      const formatted = formatDate(date);
      expect(formatted).toContain("enero");
      expect(formatted).toContain("2024");
      expect(formatted.length).toBeGreaterThan(10);
    });
  });

  describe("generateId", () => {
    it("should generate unique IDs", () => {
      const id1 = generateId();
      const id2 = generateId();

      expect(id1).toBeDefined();
      expect(id2).toBeDefined();
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe("string");
    });
  });
});
