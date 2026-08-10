import React, { useState } from "react";
import axios from "axios";
import { Card } from "../../components/Card.jsx";

export const ContactForm = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState({ loading: false, success: "", error: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: "", error: "" });

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/contact`,
                formData
            );

            setStatus({
                loading: false,
                success: data.message || "MESSAGE SENT SUCCESSFULLY, PLEASE CHECK YOUR INBOX",
                error: "",
            });

            setFormData({ name: "", email: "", message: "" });
        } catch (err) {
            setStatus({
                loading: false,
                success: "",
                error: err.response?.data?.message || "MESSAGE SENDING FAILED, PLEASE TRY AGAIN.",
            });
        }
    };

    return (
        <Card padding="p-6 sm:p-8" className="h-full">
            <form onSubmit={handleSubmit} className="h-full flex flex-col justify-between space-y-4">

                {/* Status Banners */}
                {status.error && (
                    <div className="p-3 border border-red-600 bg-red-600/5 text-red-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 bg-red-600 rounded-full inline-block shrink-0 animate-pulse" />
                        <span>{status.error}</span>
                    </div>
                )}
                {status.success && (
                    <div className="p-3 border border-emerald-600 bg-emerald-600/5 text-emerald-700 font-bold text-xs uppercase tracking-wider flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block shrink-0 animate-pulse" />
                        <span>{status.success}</span>
                    </div>
                )}

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
                        className="w-full bg-transparent border border-[#1925aa] px-3 py-2 text-xs tracking-wider focus:outline-none focus:ring-1 focus:ring-[#1925aa] placeholder-[#1925aa]/40"
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
                        className="w-full bg-transparent border border-[#1925aa] px-3 py-2 text-xs tracking-wider focus:outline-none focus:ring-1 focus:ring-[#1925aa] placeholder-[#1925aa]/40"
                    />
                </div>

                <div className="flex-1 flex flex-col">
                    <label className="block text-xs uppercase tracking-widest font-bold mb-1">
                        Message
                    </label>
                    <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="DESCRIBE YOUR NEEDS..."
                        className="w-full flex-1 min-h-20 bg-transparent border border-[#1925aa] px-3 py-2 text-xs tracking-wider focus:outline-none focus:ring-1 focus:ring-[#1925aa] placeholder-[#1925aa]/40 resize-none"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={status.loading}
                    className="w-full bg-[#1925aa] text-white font-bold text-xs uppercase tracking-widest py-3 px-6 hover:bg-white hover:text-[#1925aa] border border-[#1925aa] transition-colors duration-150 ease-in-out cursor-pointer disabled:opacity-50"
                >
                    {status.loading ? "SENDING..." : "SUBMIT FORM →"}
                </button>
            </form>
        </Card>
    );
};