import React, { useState } from "react";
import { Card } from "../../components/Card";
import { ProductDetailActions } from "./ProductDetailActions.jsx";

const getHDImageUrl = (url) => {
    if (!url || typeof url !== "string") return url;
    if (url.includes("cloudinary.com") && !url.includes("q_auto:best")) {
        return url.replace("/upload/", "/upload/q_auto:best,f_auto/");
    }
    return url;
};

export const ProductOverview = ({
                                    product,
                                    handleBuyNow,
                                    checkoutLoading,
                                    isOutOfStock,
                                }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    const validSpecs = product.specs
        ? Object.entries(product.specs).filter(([_, val]) => Boolean(val))
        : [];

    return (
        <section className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 py-4 lg:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-y-6 gap-x-8 lg:gap-x-10 2xl:gap-x-12 items-stretch">
                {/* Left Column */}
                <div className="lg:col-span-6 flex flex-col min-h-0">
                    <Card padding="p-3 sm:p-4" className="bg-white text-[#1925aa] border border-[#1925aa] flex flex-col justify-between h-full">
                        <div className="w-full h-64 sm:h-96 lg:h-160 bg-[#1925aa]/5 border border-[#1925aa] overflow-hidden flex items-center justify-center p-2 relative">
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
                            <div className="flex gap-2 overflow-x-auto pt-3 shrink-0 justify-center">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`w-10 h-10 sm:w-12 sm:h-12 border shrink-0 bg-[#1925aa]/5 overflow-hidden flex items-center justify-center transition-all ${
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

                {/* Right Column */}
                <div className="lg:col-span-6 flex flex-col min-h-0">
                    <Card padding="p-3 sm:p-5" className="bg-white text-[#1925aa] border border-[#1925aa] flex flex-col justify-between h-full">
                        <div>
                            {/* Title and Price */}
                            <div className="border-b-2 border-[#1925aa] pb-2 mb-3 flex justify-between items-baseline gap-2">
                                <h1 className="font-['Zalando_Sans_Expanded'] text-sm sm:text-lg lg:text-xl font-bold uppercase tracking-wider truncate">
                                    {product.name}
                                </h1>
                                <span className="font-mono text-sm sm:text-lg lg:text-xl font-bold shrink-0">
                                    £{product.price?.toFixed(2)}
                                </span>
                            </div>

                            {/* Description */}
                            <div className="mb-4">
                                <h2 className="font-['Zalando_Sans_Expanded'] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1">
                                    DESCRIPTION
                                </h2>
                                <p className="font-mono text-[11px] sm:text-xs uppercase tracking-wide text-[#1925aa]/90 leading-relaxed whitespace-pre-line">
                                    {product.description}
                                </p>
                            </div>

                            {/* Hardware Specs */}
                            {validSpecs.length > 0 && (
                                <div className="border-t border-[#1925aa]/20 pt-3 mb-4">
                                    <h2 className="font-['Zalando_Sans_Expanded'] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2">
                                        HARDWARE SPECS
                                    </h2>
                                    <div className="bg-[#1925aa]/5 p-2 sm:p-2.5 border border-[#1925aa]/20 text-[10px] sm:text-xs font-mono uppercase space-y-1">
                                        {validSpecs.map(([key, val], idx) => {
                                            const isLast = idx === validSpecs.length - 1;
                                            return (
                                                <div
                                                    key={key}
                                                    className={`flex flex-col sm:flex-row sm:justify-between pb-1 sm:pb-0.5 gap-0.5 sm:gap-2 ${
                                                        !isLast ? "border-b border-[#1925aa]/10" : ""
                                                    }`}
                                                >
                                                    <span className="opacity-60 shrink-0 font-semibold">{key}:</span>
                                                    <span className="font-bold sm:text-right wrap-break-word">{val}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Gaming Benchmarks */}
                            {product.benchmarks && product.benchmarks.length > 0 && (
                                <div className="border-t border-[#1925aa]/20 pt-3 mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h2 className="font-['Zalando_Sans_Expanded'] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                                            PERFORMANCE BENCHMARKS
                                        </h2>
                                    </div>

                                    <div className="bg-[#1925aa]/5 border border-[#1925aa]/20 overflow-x-auto">
                                        <table className="w-full text-left text-[10px] sm:text-xs uppercase font-mono border-collapse">
                                            <thead>
                                            <tr className="border-b border-[#1925aa]/20 bg-[#1925aa]/10 text-[9px] sm:text-[10px] opacity-80">
                                                <th className="py-1 px-2">Title</th>
                                                <th className="hidden sm:table-cell py-1 px-2">Preset</th>
                                                <th className="py-1 px-2">Resolution</th>
                                                <th className="py-1 px-2 text-right whitespace-nowrap">Avg FPS</th>
                                            </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#1925aa]/10">
                                            {product.benchmarks.map((bm, index) => (
                                                <tr key={index} className="hover:bg-[#1925aa]/5">
                                                    <td className="py-1.5 px-2 font-bold">
                                                        <div>{bm.game}</div>
                                                        <div className="sm:hidden text-[8px] font-normal opacity-70 leading-none mt-0.5">
                                                            {bm.settings}
                                                        </div>
                                                    </td>
                                                    <td className="hidden sm:table-cell py-1 px-2 opacity-80 text-[11px] whitespace-nowrap">
                                                        {bm.settings}
                                                    </td>
                                                    <td className="py-1.5 px-2 opacity-80 text-[9px] sm:text-[11px] whitespace-nowrap">
                                                        {bm.resolution}
                                                    </td>
                                                    <td className="py-1.5 px-2 text-right font-bold text-[#1925aa] whitespace-nowrap">
                                                            <span className="bg-[#1925aa] text-white px-1.5 py-0.5 text-[9px] sm:text-[10px] inline-block font-mono">
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
                        <ProductDetailActions
                            handleBuyNow={handleBuyNow}
                            checkoutLoading={checkoutLoading}
                            isOutOfStock={isOutOfStock}
                        />
                    </Card>
                </div>
            </div>
        </section>
    );
};