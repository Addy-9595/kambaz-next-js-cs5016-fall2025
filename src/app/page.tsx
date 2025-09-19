import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Kambaz Application</h1>
      <p>Welcome to the Kambaz App landing page!</p>
      <nav>
        <ul>
          <li>
            <Link href="/Labs/Lab1">Go to Lab Exercises</Link><br />
          </li>
          <li>
            <Link href="/Account/Signin">Sign In</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}