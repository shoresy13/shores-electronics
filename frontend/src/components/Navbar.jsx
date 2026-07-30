import { useState } from "react";
import { NavLink } from "react-router";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const links = [
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "Products", path: "/products" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <nav className="relative bg-[#1925aa] text-white font-mono border-b border-white/20 select-none">
            <div className="max-w-[1600px] mx-auto px-6 sm:px-6 flex items-stretch justify-between h-20">

                {/* Logo */}
                <NavLink
                    to="/"
                    className="flex items-center gap-4 py-3 group"
                >
                    <img
                        src="/logo-white.svg"
                        alt="Shores Electronics Logo"
                        className="h-10 w-10"
                    />
                    <div className="flex flex-col uppercase font-bold tracking-widest text-white text-xs sm:text-sm leading-tight">
                        <span>Shores</span>
                        <span>Electronics</span>
                    </div>
                </NavLink>

                {/* Desktop Navlinks */}
                <div className="hidden md:flex items-center space-x-6">
                    <div className="flex items-center space-x-6 text-xs uppercase tracking-widest">
                        {links.map((link, index) => (
                            <div key={link.name} className="flex items-center space-x-6">
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `transition-all duration-150 py-1 ${
                                            isActive
                                                ? "text-white font-extrabold underline underline-offset-8 decoration-white decoration-2"
                                                : "text-white/70 hover:text-white hover:underline hover:underline-offset-8 decoration-white/40"
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>

                                {/* Separator Bar */}
                                {index < links.length - 1 && (
                                    <span className="text-white/40 font-normal select-none">|</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex items-center md:hidden">
                    <button
                        aria-label="Toggle menu"
                        className="relative flex flex-col justify-center items-center w-10 h-10 border border-white/30 p-2 focus:outline-none"
                        onClick={() => setOpen(!open)}
                    >
                        <span
                            className={`block h-0.5 w-5 bg-white transition-all duration-300 absolute ${
                                open ? "rotate-45" : "-translate-y-1.5"
                            }`}
                        />
                        <span
                            className={`block h-0.5 w-5 bg-white transition-all duration-300 ${
                                open ? "opacity-0 scale-0" : "opacity-100"
                            }`}
                        />
                        <span
                            className={`block h-0.5 w-5 bg-white transition-all duration-300 absolute ${
                                open ? "-rotate-45" : "translate-y-1.5"
                            }`}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Navlinks */}
            {open && (
                <div className="md:hidden absolute left-0 right-0 top-full z-50 bg-[#1925aa] border-b border-white/20 px-6 py-6 flex flex-col space-y-4 shadow-2xl">
                    {links.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `text-xs uppercase tracking-widest py-2 border-b border-white/10 transition-colors ${
                                    isActive
                                        ? "text-white font-extrabold underline underline-offset-4"
                                        : "text-white/70 hover:text-white"
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
}