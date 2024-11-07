import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import NavbarAdmin from "@/components/NavbarAdmin";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <NavbarAdmin />

      <main className="flex-1">{children}</main>
      <Footer />
    </div> 
  );
}
