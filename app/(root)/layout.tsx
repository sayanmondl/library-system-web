import Navbar from "@/app/components/Navbar";
import Footbar from "../components/Footbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Navbar />
      <Footbar />
      {children}
      <div className="h-32"></div>
    </main>
  );
}
