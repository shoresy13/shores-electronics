import React, { useState } from "react";
import { Card } from "../../components/Card.jsx";

export const ContactForm = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <Card padding="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs uppercase tracking-widest font-bold mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="ENTER YOUR NAME"
                        className="w-full bg-transparent border border-[#1925aa] px-3 py-2 text-xs uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-[#1925aa] placeholder-[#1925aa]/40"
                    />
                </div>

                <div>
                    <label className="block text-xs uppercase tracking-widest font-bold mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="NAME@EXAMPLE.COM"
                        className="w-full bg-transparent border border-[#1925aa] px-3 py-2 text-xs uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-[#1925aa] placeholder-[#1925aa]/40"
                    />
                </div>

                <div>
                    <label className="block text-xs uppercase tracking-widest font-bold mb-1">
                        Message
                    </label>
                    <textarea
                        rows="3"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="DESCRIBE YOUR NEEDS..."
                        className="w-full bg-transparent border border-[#1925aa] px-3 py-2 text-xs uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-[#1925aa] placeholder-[#1925aa]/40 resize-none"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#1925aa] text-white font-bold text-xs uppercase tracking-widest py-3 px-6 hover:bg-white hover:text-[#1925aa] border border-[#1925aa] transition-colors duration-150 ease-in-out cursor-pointer"
                >
                    Submit Form
                </button>
            </form>
        </Card>
    );
};