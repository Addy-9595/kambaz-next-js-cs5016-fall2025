import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
    <div>
      <header>
        <h1>Kambaz Project</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/Labs/Lab1">Lab 1</a></li>
            <li><a href="/Labs/Lab2">Lab 2</a></li>
            <li><a href="/Labs/Lab3">Lab 3</a></li>
            <li><a href="/Kambaz">Kambaz Application</a></li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Your Full Name - Section: Your Section</p>
      </footer>
    </div>
    </body>
    </html>
  );
}