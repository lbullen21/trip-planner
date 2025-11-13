import Navbar from "../components/Navbar.component";
import MainBody from "../components/Main.component";

export default function Home() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100">
      <main className="flex w-11/12 min-h-screen sm:items-start flex-col">
        <Navbar />
        <MainBody />
      </main>
    </div>
  );
}
