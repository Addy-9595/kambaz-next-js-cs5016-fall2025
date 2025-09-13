import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/Labs/Lab1">Lab 1</Link>
        </li>
        <li>
          <Link href="/Labs/Lab2">Lab 2</Link>
        </li>
        <li>
          <Link href="/Labs/Lab3">Lab 3</Link>
        </li>
        <li>
          <Link href="/Kambaz">Kambaz Application</Link>
        </li>
        <li>
          <a href="https://github.com/your-repo/lab1" target="_blank" rel="noopener noreferrer">Lab 1 Source Code</a>
        </li>
        <li>
          <a href="https://github.com/your-repo/lab2" target="_blank" rel="noopener noreferrer">Lab 2 Source Code</a>
        </li>
        <li>
          <a href="https://github.com/your-repo/lab3" target="_blank" rel="noopener noreferrer">Lab 3 Source Code</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;