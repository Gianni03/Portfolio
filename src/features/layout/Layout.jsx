import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-white">
      <Header />
      
      <main className="grow container mx-auto px-4 py-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
