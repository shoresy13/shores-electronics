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
                <div className="w-full max-w-[1600px] mx-auto px-6 min-h-[calc(100vh-5rem)] flex items-center justify-center">
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
                <div className="w-full max-w-[1600px] mx-auto px-6 min-h-[calc(100vh-5rem)] flex items-center justify-center">
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
        <div className="text-[#1925aa] font-mono overflow-x-hidden">
            <section className="w-full max-w-[1600px] mx-auto px-6 py-4 lg:py-6 lg:h-[calc(100vh-5rem)] flex flex-col justify-between">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1 min-h-0">

                    {/* Left Column */}
                    <div className="lg:col-span-6 flex flex-col min-h-0">
                        <Card padding="p-3 flex-1 flex flex-col justify-between min-h-0">
                            <div className="w-full flex-1 bg-[#1925aa]/5 border-2 border-[#1925aa] overflow-hidden flex items-center justify-center relative min-h-0 p-1">
                                {product.images && product.images.length > 0 ? (
                                    <img
                                        src={getHDImageUrl(product.images[selectedImage])}
                                        alt={product.name}
                                        className="w-full h-full object-contain m-auto"
                                    />
                                ) : (
                                    <span className="text-xs sm:text-sm uppercase opacity-50">
                                        NO MEDIA PREVIEW
                                    </span>
                                )}
                            </div>

                            {/* Image Thumbnails */}
                            {product.images && product.images.length > 1 && (
                                <div className="flex gap-2.5 justify-center items-center overflow-x-auto shrink-0 pt-2.5 w-full">
                                    {product.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`w-14 h-14 border-2 shrink-0 bg-[#1925aa]/5 overflow-hidden flex items-center justify-center transition-all ${
                                                selectedImage === idx
                                                    ? "border-[#1925aa] ring-1 ring-[#1925aa]"
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

                    {/* Right Column */}
                    <div className="lg:col-span-6 flex flex-col min-h-0">
                        <Card padding="p-5 flex-1 flex flex-col justify-between min-h-0">
                            <div className="flex flex-col justify-between flex-1 min-h-0 pr-1">
                                <div>
                                    {/* Title and Price */}
                                    <div className="border-b-2 border-[#1925aa] pb-2.5 mb-3 flex justify-between items-baseline gap-4 shrink-0">
                                        <h1 className="font-['Zalando_Sans_Expanded'] text-lg sm:text-xl lg:text-2xl font-bold uppercase tracking-wider truncate">
                                            {product.name}
                                        </h1>
                                        <span className="font-['Zalando_Sans_Expanded'] text-lg sm:text-xl lg:text-2xl font-bold shrink-0">
                                            £{product.price?.toFixed(2)}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <div className="mb-3">
                                        <h4 className="font-['Zalando_Sans_Expanded'] text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">
                                            DESCRIPTION
                                        </h4>
                                        <p className="font-mono text-xs sm:text-sm uppercase tracking-wide text-[#1925aa]/90 leading-relaxed whitespace-pre-line">
                                            {product.description}
                                        </p>
                                    </div>

                                    {/* Hardware Specs */}
                                    {product.specs && (
                                        <div className="border-t border-[#1925aa] pt-2 mb-3">
                                            <h4 className="font-['Zalando_Sans_Expanded'] text-xs sm:text-sm font-bold uppercase tracking-wider mb-1.5">
                                                HARDWARE SPECS
                                            </h4>
                                            <div className="bg-[#1925aa]/5 p-2.5 border border-[#1925aa] text-[11px] uppercase space-y-1">
                                                {Object.entries(product.specs).map(([key, val]) => (
                                                    val ? (
                                                        <div key={key} className="flex justify-between border-b border-[#1925aa]/20 pb-0.5 gap-2">
                                                            <span className="font-bold opacity-70 shrink-0">{key}:</span>
                                                            <span className="font-bold truncate text-right">{val}</span>
                                                        </div>
                                                    ) : null
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Gaming Benchmarks */}
                                    {product.benchmarks && product.benchmarks.length > 0 && (
                                        <div className="border-t border-[#1925aa] pt-2 mb-3">
                                            <h4 className="font-['Zalando_Sans_Expanded'] text-xs sm:text-sm font-bold uppercase tracking-wider mb-1.5 flex items-center justify-between">
                                                <span>PERFORMANCE BENCHMARKS</span>
                                            </h4>

                                            <div className="bg-[#1925aa]/5 border border-[#1925aa] overflow-x-auto">
                                                <table className="w-full text-left text-xs sm:text-sm uppercase font-mono border-collapse">
                                                    <thead>
                                                    <tr className="border-b border-[#1925aa]/40 bg-[#1925aa]/10 text-xs opacity-80">
                                                        <th className="py-1.5 px-3">Title</th>
                                                        <th className="py-1.5 px-2">Preset</th>
                                                        <th className="py-1.5 px-2">Resolution</th>
                                                        <th className="py-1.5 px-3 text-right">Avg FPS</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-[#1925aa]/20">
                                                    {product.benchmarks.map((bm, index) => (
                                                        <tr key={index} className="hover:bg-[#1925aa]/5">
                                                            <td className="py-1 px-3 font-bold truncate max-w-32.5">
                                                                {bm.game}
                                                            </td>
                                                            <td className="py-1 px-2 opacity-80 text-xs">
                                                                {bm.settings}
                                                            </td>
                                                            <td className="py-1 px-2 opacity-80 text-xs">
                                                                {bm.resolution}
                                                            </td>
                                                            <td className="py-1 px-3 text-right font-bold text-[#1925aa]">
                                                                    <span className="bg-[#1925aa] text-white px-2 py-0.5 text-xs inline-block font-mono">
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
                                <div className="pt-1 space-y-1.5 shrink-0 mt-2">
                                    <Link
                                        to={`/contact?subject=Inquiry regarding ${encodeURIComponent(product.name)}`}
                                        className="block w-full text-center bg-[#1925aa] text-white font-mono text-xs sm:text-sm font-bold py-3 uppercase tracking-widest hover:bg-transparent hover:text-[#1925aa] border border-[#1925aa] transition-all"
                                    >
                                        INQUIRE ABOUT THIS BUILD &rarr;
                                    </Link>
                                    <Link
                                        to="/products"
                                        className="block w-full text-center bg-transparent text-[#1925aa] font-mono text-xs font-bold py-0.5 uppercase tracking-wider hover:underline"
                                    >
                                        &larr; RETURN TO CATALOG
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    </div>

                </div>
            </section>
        </div>
    );
};