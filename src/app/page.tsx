import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center h-screen justify-center">
      <h1>Examen</h1>
      <p>Sergio Miranda Nuñez</p>

      <Link
        href="/login"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        Iniciar Sesión
      </Link>
      <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
        Inicio
      </Link>
    </main>
  );
}
