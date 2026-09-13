import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import StickyContactBar from "./StickyContactBar";
import ScrollToTop from "./ScrollToTop";
import ScrollProgressBar from "./ScrollProgressBar";
import MotionToggle from "./MotionToggle";
import ChatAssistant from "./ChatAssistant";
import { ThemeProvider } from "../context/ThemeContext";
import { MotionProvider } from "../lib/smoothScroll";

export default function Layout() {
  return (
    <ThemeProvider>
      <MotionProvider>
        <div className="min-h-screen flex flex-col bg-paper dark:bg-[#081220] text-ink dark:text-slate-100 transition-colors duration-200">
          <ScrollProgressBar />
          <ScrollToTop />
          <Navbar />
          <main className="flex-1 pb-16 lg:pb-0">
            <Outlet />
          </main>
          <Footer />
          <StickyContactBar />
          <MotionToggle />
          <ChatAssistant />
        </div>
      </MotionProvider>
    </ThemeProvider>
  );
}
