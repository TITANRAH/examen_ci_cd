export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
}

export function authenticateUser(credentials: LoginCredentials): Promise<User> {
  return new Promise((resolve, reject) => {
    if (!isValidEmail(credentials.email)) {
      reject(new Error("Email inválido"));
      return;
    }

    if (!isValidPassword(credentials.password)) {
      reject(new Error("Contraseña inválida"));
      return;
    }

    if (
      credentials.email === "admin@example.com" &&
      credentials.password === "password123"
    ) {
      resolve({
        id: "1",
        email: credentials.email,
        name: "Usuario Admin",
      });
    } else {
      reject(new Error("Credenciales incorrectas"));
    }
  });
}

export function calculateStats(numbers: number[]): {
  sum: number;
  average: number;
  min: number;
  max: number;
} {
  if (numbers.length === 0) {
    return { sum: 0, average: 0, min: 0, max: 0 };
  }

  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const average = sum / numbers.length;
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  return { sum, average, min, max };
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
