import React from "react";
import { Routes, Route, Outlet } from "react-router";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import { Home } from "./pages/Home.jsx"
import { Services } from "./pages/Services.jsx"
import { Products } from "./pages/Products.jsx"
import { Contact } from "./pages/Contact.jsx"

export function Layout() {
    return (
        <div className="min-h-screen bg-white text-black font-mono selection:bg-[#1925aa] selection:text-white">
            <Navbar />
            <main className="max-w-7xl mx-auto min-h-[calc(100vh-80px)]">
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
            </Route>
        </Routes>
    );
}