import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 shadow-lg">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" legacyBehavior>
            <a className="text-white dark:text-gray-300 hover:underline hover:text-gray-100 dark:hover:text-gray-200">Home</a>
          </Link>
        </li>
        <li>
          <Link href="/todo" legacyBehavior>
            <a className="text-white dark:text-gray-300 hover:underline hover:text-gray-100 dark:hover:text-gray-200">TODO List</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;