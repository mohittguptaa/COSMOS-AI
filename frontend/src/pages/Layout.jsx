import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AnimCurs from "../components/AnimCurs";
import LoadingScreen from "../components/LoadingScreen";
import { useEffect, useState } from "react";

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an immediate "loaded" state for demonstration purposes
    // Replace this section with any asynchronous loading or initialization logic
    setIsLoading(false);
  }, []);

  if (isLoading) {
    // Return loading screen without any transition animation
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 ">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full ">
      <AnimCurs />
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60"></div>

      {/* Page Content */}
      <div className="relative z-10 text-center text-white">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;