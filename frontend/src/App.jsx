import React, { useEffect } from "react";
import { Routes, Route, Outlet, Navigate, useLocation } from "react-router";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import NoticeModal from "./components/NoticeModal.jsx";

import { Home } from "./pages/Home.jsx";
import { Services } from "./pages/Services.jsx";
import { Products } from "./pages/Products.jsx";
import { Contact } from "./pages/Contact.jsx";

import { ProductDetail } from "./pages/ProductDetail";

import { Login } from "./pages/Login.jsx";
import { AdminDashboard } from "./pages/AdminDashboard.jsx";

import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from "./pages/TermsOfService";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function ProtectedAdminRoute() {
    const userInfo = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;

    if (userInfo && userInfo.token && userInfo.isAdmin) {
        return <Outlet />;
    }

    return <Navigate to="/login" replace />;
}

export function Layout() {
    return (
        <div className="min-h-screen bg-white text-black font-mono selection:bg-[#1925aa] selection:text-white flex flex-col">
            <ScrollToTop />
            <NoticeModal />
            <Navbar />
            <main className="w-full grow min-h-[calc(100vh-80px)]">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="services" element={<Services />} />
                <Route path="products" element={<Products />} />
                <Route path="contact" element={<Contact />} />
                <Route path="login" element={<Login />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route element={<ProtectedAdminRoute />}>
                    <Route path="admin-dashboard" element={<AdminDashboard />} />
                </Route>
            </Route>
        </Routes>
    );
}