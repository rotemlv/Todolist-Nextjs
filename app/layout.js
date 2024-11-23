import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Get er done!',
  description: 'Your goto app for task management! (bi..)',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 font-sans">
        <nav className="bg-white shadow p-4">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-blue-600 hover:text-blue-800">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/test" className="text-blue-600 hover:text-blue-800">
                Test
              </Link>
            </li>
          </ul>
        </nav>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
