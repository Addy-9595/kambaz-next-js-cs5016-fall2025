"use client";
import Link from "next/link";

export default function Labs() {
  return (
    <div className="container-fluid">
      <h1>Labs</h1>
      <h2>Made by Atharva Dalvi MSCS</h2>
      <p>
        <a href="https://github.com/Addy-9595/kambaz-next-js-cs5016-fall2025" target="_blank">
          GitHub Repository
        </a>
      </p>
      <ul className="nav nav-pills mb-3">
        <li className="nav-item">
          <Link href="/Labs/Lab1" className="nav-link">Lab 1</Link>
        </li>
        <li className="nav-item">
          <Link href="/Labs/Lab2" className="nav-link">Lab 2</Link>
        </li>
        <li className="nav-item">
          <Link href="/Labs/Lab3" className="nav-link">Lab 3</Link>
        </li>
        <li className="nav-item">
          <Link href="/Labs/Lab4" className="nav-link">Lab 4</Link>
        </li>
        <li className="nav-item">
          <Link href="/Labs/Lab5" className="nav-link">Lab 5</Link>
        </li>
        <li className="nav-item">
          <Link href="/Account/Signin" className="nav-link">Kambaz (Login using the credentials given in users.json)</Link>
        </li>
      </ul>
    </div>
  );
}