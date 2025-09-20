import { NextRequest, NextResponse } from "next/server";
import { isValidEmail, isValidPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Email inválido" },
        { status: 400 }
      );
    }

    if (!isValidPassword(password)) {
      return NextResponse.json(
        { success: false, message: "Contraseña inválida" },
        { status: 400 }
      );
    }

    if (email === "admin@admin.com" && password === "admin") {
      return NextResponse.json(
        {
          success: true,
          message: "Login exitoso",
          user: {
            id: "1",
            email: email,
            name: "Usuario Admin",
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Credenciales incorrectas" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
