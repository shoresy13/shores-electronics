import React from "react";
import { Routes, Route, Outlet } from "react-router";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

const UnderDevelopmentBanner = () => (
    <div className="pt-55 pb-16 flex flex-col items-center justify-center text-center">
        <div className="border border-[#1925aa] bg-[#1925aa]/5 px-6 py-8 rounded-none max-w-md w-full select-none">
            <p className="text-[#1925aa] font-mono text-sm md:text-base font-bold uppercase tracking-widest mb-2">
                Website Under Development
            </p>
            <p className="text-[#1925aa]/80 font-mono text-xs uppercase tracking-wider">
                Please check back soon for updates.
            </p>
        </div>
    </div>
);

export const Home = () => (
    <div className="p-8 sm:p-12 text-[#1925aa] font-mono">
        <h1 className="text-xl font-bold uppercase tracking-widest border-b-2 border-[#1925aa] pb-2 mb-4">
            Home
        </h1>
        <UnderDevelopmentBanner />
    </div>
);

export const Services = () => (
    <div className="p-8 sm:p-12 text-[#1925aa] font-mono">
        <h1 className="text-xl font-bold uppercase tracking-widest border-b-2 border-[#1925aa] pb-2 mb-4">
            Services
        </h1>
        <UnderDevelopmentBanner />
    </div>
);

export const Products = () => (
    <div className="p-8 sm:p-12 text-[#1925aa] font-mono">
        <h1 className="text-xl font-bold uppercase tracking-widest border-b-2 border-[#1925aa] pb-2 mb-4">
            Products
        </h1>
        <UnderDevelopmentBanner />
    </div>
);

export const Contact = () => (
    <div className="p-8 sm:p-12 text-[#1925aa] font-mono">
        <h1 className="text-xl font-bold uppercase tracking-widest border-b-2 border-[#1925aa] pb-2 mb-4">
            Contact
        </h1>
        <UnderDevelopmentBanner />
    </div>
);

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