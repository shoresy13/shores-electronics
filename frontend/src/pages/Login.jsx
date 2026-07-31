import React, { useState } from "react";
import API from "../../utils/axios";
import { Card } from "../components/Card.jsx";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data } = await API.post("/api/users/login", { email, password });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);

            window.location.href = "/";
        } catch (err) {
            setLoading(false);
            setError(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : "INVALID EMAIL OR PASSWORD"
            );
        }
    };

    return (
        <div className="text-[#1925aa] font-mono min-h-[calc(100vh-120px)] flex flex-col justify-center items-center py-12">
            <div className="w-full max-w-150 px-6">
                <Card padding="p-6 sm:p-8">
                    <div className="border-b border-[#1925aa] pb-4 mb-6">
                        <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-widest">
                            Admin Login
                        </h1>
                    </div>

                    {/* Error Banner */}
                    {error && (
                        <div className="mb-6 p-3 border border-[#1925aa] bg-red-100 text-red-700 font-bold text-xs uppercase tracking-wider">
                            [ ERROR ]: {error}
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="NAME@EXAMPLE.COM"
                                className="w-full bg-transparent border border-[#1925aa] px-3 py-2 text-xs uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-[#1925aa] placeholder-[#1925aa]/40"
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-widest font-bold mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••••••"
                                className="w-full bg-transparent border border-[#1925aa] px-3 py-2 text-xs uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-[#1925aa] placeholder-[#1925aa]/40"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1925aa] text-white font-bold text-xs uppercase tracking-widest py-3 px-6 hover:bg-white hover:text-[#1925aa] border border-[#1925aa] transition-colors duration-150 ease-in-out cursor-pointer disabled:opacity-50 mt-2"
                        >
                            {loading ? "AUTHENTICATING..." : "SYSTEM LOGIN →"}
                        </button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Login;