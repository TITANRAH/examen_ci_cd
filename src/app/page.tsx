import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center h-screen justify-center">
      <h1>Examen CI/CD</h1>
      <p>Sergio Miranda Nuñez</p>

      <Link href="/login">Login</Link>
    </main>
  );
}
