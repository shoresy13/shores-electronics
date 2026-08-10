import React from "react";
import { Link } from "react-router";
import { Card } from "./Card.jsx";

const getHDImageUrl = (url) => {
    if (!url || typeof url !== "string") return url;
    if (url.includes("cloudinary.com") && !url.includes("q_auto:best")) {
        return url.replace("/upload/", "/upload/q_auto:best,f_auto/");
    }
    return url;
};

export const ProductCard = ({ product }) => {
    if (!product) return null;

    return (
        <Card
            padding="p-4 sm:p-5"
            className="bg-white text-[#1925aa] border border-[#1925aa]/80 hover:border-[#1925aa] flex flex-col justify-between w-full group hover:-translate-y-0.5 hover:bg-[#1925aa]/2 transition-all duration-200"
        >
            <div className="flex flex-col sm:flex-row gap-4 h-full items-center sm:items-stretch">
                {/* Image */}
                <div className="w-full sm:w-2/5 aspect-square bg-[#1925aa]/5 border border-[#1925aa] overflow-hidden flex items-center justify-center relative shrink-0 p-1">
                    {product.images && product.images.length > 0 ? (
                        <img
                            src={getHDImageUrl(product.images[0])}
                            alt={product.name}
                            className="w-full h-full object-contain m-auto"
                        />
                    ) : (
                        <span className="text-[10px] font-mono uppercase opacity-50">
                            NO PREVIEW
                        </span>
                    )}
                </div>

                {/* Content & Specs */}
                <div className="flex flex-col justify-between flex-1 min-w-0 w-full">
                    <div>
                        {/* Title & Price */}
                        <div className="flex justify-between items-baseline mb-2 pb-1.5 border-b border-[#1925aa]/20 gap-2">
                            <h3 className="font-['Zalando_Sans_Expanded'] text-xs sm:text-sm font-bold uppercase tracking-wide truncate">
                                {product.name}
                            </h3>
                            <span className="font-mono text-xs sm:text-sm font-bold shrink-0">
                                £{product.price?.toFixed(2)}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs font-mono uppercase tracking-tight leading-relaxed line-clamp-2 mb-3 text-[#1925aa]/80">
                            {product.description}
                        </p>

                        {/* Specs Table */}
                        {product.specs && (
                            <div className="bg-[#1925aa]/5 p-2 border border-[#1925aa]/20 text-[10px] font-mono uppercase mb-3 space-y-1">
                                {product.specs.cpu && (
                                    <div className="flex justify-between border-b border-[#1925aa]/10 pb-0.5 gap-2">
                                        <span className="opacity-60">CPU:</span>
                                        <span className="font-bold truncate text-right">{product.specs.cpu}</span>
                                    </div>
                                )}
                                {product.specs.gpu && (
                                    <div className="flex justify-between border-b border-[#1925aa]/10 pb-0.5 gap-2">
                                        <span className="opacity-60">GPU:</span>
                                        <span className="font-bold truncate text-right">{product.specs.gpu}</span>
                                    </div>
                                )}
                                {product.specs.ram && (
                                    <div className="flex justify-between gap-2">
                                        <span className="opacity-60">RAM:</span>
                                        <span className="font-bold truncate text-right">{product.specs.ram}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Action Button */}
                    <Link
                        to={`/products/${product._id}`}
                        className="block w-full text-center bg-[#1925aa] text-white font-mono text-xs font-bold py-2 uppercase tracking-widest group-hover:bg-[#1925aa]/90 active:translate-y-px border border-[#1925aa] transition-all"
                    >
                        SEE MORE
                    </Link>
                </div>
            </div>
        </Card>
    );
};