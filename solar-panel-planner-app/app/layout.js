import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Toast from "@/components/Toast";

export const metadata = {
  title: "BrightGrid",
  description: "Solar panel evaluations planner for the city of Los Angeles",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen mx-auto">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toast />
      </body>
    </html>
  );
}
