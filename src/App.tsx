// src/App.tsx
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Index from "@/pages/Index";
import Menu from "@/pages/Menu";
import About from "@/pages/About";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import Reserve from "@/pages/Reserve";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import NotFound from "@/pages/NotFound";

import PageFade from "@/components/motion/PageFade";
import { ShadcnToaster } from "@/components/ui/toaster";
import { SonnerToaster } from "@/components/ui/sonner";
import { ToastProviderLocal } from "@/hooks/use-toast";

// ---------- helpers ----------
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// Layout that adds Navbar/Footer and animates route changes
function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <Navbar />
      <ScrollToTop />

      {/* Home: hero owns the viewport; others: pad for sticky navbar */}
      <main className={isHome ? "min-h-[70vh]" : "min-h-[70vh] pt-16 md:pt-24"}>
        <AnimatePresence mode="wait" initial={false}>
          {/* key by path so PageFade crossfades on route change */}
          <PageFade key={location.pathname}>
            <Outlet />
          </PageFade>
        </AnimatePresence>
      </main>

      <Footer />
      <ShadcnToaster />
      <SonnerToaster />
    </>
  );
}

// ---------- routes ----------
const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { index: true, element: <Index /> },
        { path: "menu", element: <Menu /> },
        { path: "about", element: <About /> },
        { path: "gallery", element: <Gallery /> },
        { path: "contact", element: <Contact /> },
        { path: "reserve", element: <Reserve /> },
        { path: "privacy", element: <PrivacyPolicy /> },
        { path: "terms", element: <TermsOfService /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  // ✅ enable v7 behaviors here to silence warnings
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

// ---------- app ----------
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProviderLocal>
        <RouterProvider router={router} />
      </ToastProviderLocal>
    </QueryClientProvider>
  );
}
