import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Kambaz Application</h1>
      <p>Welcome to the Kambaz App landing page! Made by Atharva Dalvi MSCS</p>
      <p>Please navigate using the links below:</p>
      <nav>
        <ul>
          <li>
            <Link href="/Labs/Lab1">Go to Lab Exercises</Link><br />
          </li>
          <li>
            <Link href="/Account/SignIn">Sign In</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}