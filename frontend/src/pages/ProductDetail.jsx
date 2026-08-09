import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import API from "../../utils/axios.js";
import { Card } from "../components/Card";

const getHDImageUrl = (url) => {
    if (!url || typeof url !== "string") return url;
    if (url.includes("cloudinary.com") && !url.includes("q_auto:best")) {
        return url.replace("/upload/", "/upload/q_auto:best,f_auto/");
    }
    return url;
};

export const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchProduct = async () => {
            try {
                setLoading(true);
                const { data } = await API.get(`/api/products/${id}`);
                setProduct(data);
            } catch (err) {
                console.error("Error fetching product details:", err);
                setError(err.response?.data?.message || "SYSTEM NOT FOUND OR DIRECTORY ERROR");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="text-[#1925aa] font-mono">
                <div className="w-full max-w-[1600px] mx-auto px-6 py-10 flex items-center justify-center">
                    <div className="text-xs sm:text-sm uppercase font-bold animate-pulse tracking-widest">
                        FETCHING SYSTEM SPECIFICATIONS...
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="text-[#1925aa] font-mono">
                <div className="w-full max-w-[1600px] mx-auto px-6 py-10 flex items-center justify-center">
                    <div className="w-full max-w-xl border border-dashed border-[#1925aa]/40 bg-[#1925aa]/2 p-6 text-center">
                        <span className="text-xs sm:text-sm font-bold tracking-widest uppercase">
                            [ 404 - INVALID PRODUCT ID ]
                        </span>
                        <p className="text-xs sm:text-sm uppercase tracking-wider text-[#1925aa]/70 mt-2">
                            {error || "THE REQUESTED SYSTEM SPECIFICATION COULD NOT BE FOUND"}
                        </p>
                        <Link
                            to="/products"
                            className="inline-block mt-4 bg-[#1925aa] text-white text-xs sm:text-sm font-bold py-2.5 px-6 uppercase tracking-widest border border-[#1925aa] hover:bg-transparent hover:text-[#1925aa] transition-all"
                        >
                            &larr; BACK TO DIRECTORY
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="text-[#1925aa] font-mono">
            <div>
                <section className="w-full max-w-[1600px] mx-auto px-6 py-6 lg:py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-8 lg:gap-x-10 2xl:gap-x-12 items-stretch">

                        {/* Left Column */}
                        <div className="lg:col-span-6 flex flex-col min-h-0">
                            <Card padding="p-4" className="bg-white text-[#1925aa] border border-[#1925aa] flex flex-col justify-between h-full">
                                <div className="w-full h-72 sm:h-96 lg:h-160 bg-[#1925aa]/5 border border-[#1925aa] overflow-hidden flex items-center justify-center p-2 relative">
                                    {product.images && product.images.length > 0 ? (
                                        <img
                                            src={getHDImageUrl(product.images[selectedImage])}
                                            alt={product.name}
                                            className="w-full h-full object-contain m-auto"
                                        />
                                    ) : (
                                        <span className="text-xs uppercase font-mono opacity-50">
                                            NO MEDIA PREVIEW
                                        </span>
                                    )}
                                </div>

                                {product.images && product.images.length > 1 && (
                                    <div className="flex gap-2.5 overflow-x-auto pt-3 shrink-0 justify-center">
                                        {product.images.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedImage(idx)}
                                                className={`w-12 h-12 border shrink-0 bg-[#1925aa]/5 overflow-hidden flex items-center justify-center transition-all ${
                                                    selectedImage === idx
                                                        ? "border-[#1925aa] ring-2 ring-[#1925aa]"
                                                        : "border-[#1925aa]/30 opacity-60 hover:opacity-100"
                                                }`}
                                            >
                                                <img
                                                    src={getHDImageUrl(img)}
                                                    alt={`Thumb ${idx}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </Card>
                        </div>

                        {/* Right Side */}
                        <div className="lg:col-span-6 flex flex-col min-h-0">
                            <Card padding="p-4 sm:p-5" className="bg-white text-[#1925aa] border border-[#1925aa] flex flex-col justify-between h-full">
                                <div>
                                    {/* Title and Price */}
                                    <div className="border-b-2 border-[#1925aa] pb-2 mb-3 flex justify-between items-baseline gap-4">
                                        <h1 className="font-['Zalando_Sans_Expanded'] text-base sm:text-lg lg:text-xl font-bold uppercase tracking-wider truncate">
                                            {product.name}
                                        </h1>
                                        <span className="font-mono text-base sm:text-lg lg:text-xl font-bold shrink-0">
                                            £{product.price?.toFixed(2)}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <div className="mb-4">
                                        <h2 className="font-['Zalando_Sans_Expanded'] text-xs font-bold uppercase tracking-wider mb-1">
                                            DESCRIPTION
                                        </h2>
                                        <p className="font-mono text-xs uppercase tracking-wide text-[#1925aa]/90 leading-relaxed whitespace-pre-line">
                                            {product.description}
                                        </p>
                                    </div>

                                    {/* Hardware Specs */}
                                    {product.specs && (
                                        <div className="border-t border-[#1925aa]/20 pt-3 mb-4">
                                            <h2 className="font-['Zalando_Sans_Expanded'] text-xs font-bold uppercase tracking-wider mb-2">
                                                HARDWARE SPECS
                                            </h2>
                                            <div className="bg-[#1925aa]/5 p-2.5 border border-[#1925aa]/20 text-[11px] sm:text-xs font-mono uppercase space-y-1">
                                                {Object.entries(product.specs).map(([key, val]) => (
                                                    val ? (
                                                        <div key={key} className="flex justify-between border-b border-[#1925aa]/10 pb-0.5 gap-2">
                                                            <span className="opacity-60 shrink-0">{key}:</span>
                                                            <span className="font-bold truncate text-right">{val}</span>
                                                        </div>
                                                    ) : null
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Gaming Benchmarks */}
                                    {product.benchmarks && product.benchmarks.length > 0 && (
                                        <div className="border-t border-[#1925aa]/20 pt-3 mb-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <h2 className="font-['Zalando_Sans_Expanded'] text-xs font-bold uppercase tracking-wider">
                                                    PERFORMANCE BENCHMARKS
                                                </h2>
                                            </div>

                                            <div className="bg-[#1925aa]/5 border border-[#1925aa]/20 overflow-x-auto">
                                                <table className="w-full text-left text-xs uppercase font-mono border-collapse">
                                                    <thead>
                                                    <tr className="border-b border-[#1925aa]/20 bg-[#1925aa]/10 text-[10px] opacity-80">
                                                        <th className="py-1.5 px-2.5">Title</th>
                                                        <th className="py-1.5 px-2">Preset</th>
                                                        <th className="py-1.5 px-2">Resolution</th>
                                                        <th className="py-1.5 px-2.5 text-right">Avg FPS</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-[#1925aa]/10">
                                                    {product.benchmarks.map((bm, index) => (
                                                        <tr key={index} className="hover:bg-[#1925aa]/5">
                                                            <td className="py-1 px-2.5 font-bold truncate max-w-27.5">
                                                                {bm.game}
                                                            </td>
                                                            <td className="py-1 px-2 opacity-80 text-[10px] sm:text-[11px]">
                                                                {bm.settings}
                                                            </td>
                                                            <td className="py-1 px-2 opacity-80 text-[10px] sm:text-[11px]">
                                                                {bm.resolution}
                                                            </td>
                                                            <td className="py-1 px-2.5 text-right font-bold text-[#1925aa]">
                                                                    <span className="bg-[#1925aa] text-white px-1.5 py-0.5 text-[10px] inline-block font-mono">
                                                                        {bm.fps} FPS
                                                                    </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-3 space-y-1.5 shrink-0">
                                    <Link
                                        to={`/contact?subject=Inquiry regarding ${encodeURIComponent(product.name)}`}
                                        className="block w-full text-center bg-[#1925aa] text-white font-mono text-xs font-bold py-2.5 uppercase tracking-widest hover:bg-transparent hover:text-[#1925aa] border border-[#1925aa] transition-all"
                                    >
                                        BUY NOW
                                    </Link>
                                    <Link
                                        to="/products"
                                        className="block w-full text-center bg-transparent text-[#1925aa] font-mono text-xs font-bold py-0.5 uppercase tracking-wider hover:underline"
                                    >
                                        RETURN TO PRODUCTS
                                    </Link>
                                </div>
                            </Card>
                        </div>

                    </div>
                </section>
            </div>

        </div>
    );
};