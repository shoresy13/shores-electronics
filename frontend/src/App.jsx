import React from "react";
import { Routes, Route, Outlet } from "react-router";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import NoticeModal from "./components/NoticeModal.jsx";

import { Home } from "./pages/Home.jsx";
import { Services } from "./pages/Services.jsx";
import { Products } from "./pages/Products.jsx";
import { Contact } from "./pages/Contact.jsx";
import { Login } from "./pages/Login.jsx";

import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from "./pages/TermsOfService";

export function Layout() {
    return (
        <div className="min-h-screen bg-white text-black font-mono selection:bg-[#1925aa] selection:text-white flex flex-col">
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
                <Route path="login" element={<Login />} /> {/* <--- 2. Add Login Route */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
            </Route>
        </Routes>
    );
}