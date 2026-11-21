import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';

// Layout utama (parent route): Navbar + <Outlet/> + Footer
export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="mx-auto w-full max-w-[1440px] px-margin-mobile py-space-lg md:px-margin">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
