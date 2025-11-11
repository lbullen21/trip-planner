import Navbar from "../components/Navbar.component";

export default function Home() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-50">
      <main className="flex w-11/12 bg-white sm:items-start">
        <Navbar />
      </main>
    </div>
  );
}
