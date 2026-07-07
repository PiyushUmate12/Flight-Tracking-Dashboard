import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import HomeContent from "@/components/dashboard/HomeContent";

export default function Home() {
  return (
    <>
      <Navbar />

      <main
        style={{
          paddingTop: 68,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <HomeContent />

        <Footer />
      </main>
    </>
  );
}
