import BookNavbar from "@/app/components/BookNavbar";
import Footbar from "../components/Footbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-gloock">
      <BookNavbar />
      <Footbar />
      {children}
      <div className="h-32"></div>
    </main>
  );
}
