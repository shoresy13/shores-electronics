import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Card } from "../../components/Card";
import API from "../../../utils/axios.js";

const getHDImageUrl = (url) => {
    if (!url || typeof url !== "string") return url;
    if (url.includes("cloudinary.com") && !url.includes("q_auto:best")) {
        return url.replace("/upload/", "/upload/q_auto:best,f_auto/");
    }
    return url;
};

export const Featured = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                setLoading(true);
                const { data } = await API.get("/api/products");
                const featured = data.filter((p) => p.isFeatured);
                setFeaturedProducts(featured);
            } catch (err) {
                console.error("Error loading featured systems:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatured();
    }, []);

    return (
        <section className="w-full bg-white text-[#1925aa] py-10 lg:py-14">
            <div className="max-w-[1600px] mx-auto px-6">

                {/* Header */}
                <div className="mb-6 border-b-2 border-[#1925aa] pb-3 flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
                    <div>
                        <h2 className="font-['Zalando_Sans_Expanded'] text-base sm:text-lg md:text-xl font-bold uppercase tracking-wider">
                            FEATURED BUILDS
                        </h2>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider bg-[#1925aa] text-white hover:bg-transparent hover:text-[#1925aa] border border-[#1925aa] px-2.5 py-1 transition-all shrink-0 active:translate-y-px"
                        >
                            SEE ALL BUILDS &rarr;
                        </Link>
                    </div>
                </div>

                {/* Content Grid */}
                {loading ? (
                    <div className="text-xs font-mono uppercase font-bold py-16 text-center animate-pulse tracking-widest">
                        LOADING FEATURED DIRECTORY...
                    </div>
                ) : featuredProducts.length === 0 ? (
                    <div className="w-full py-16 border border-dashed border-[#1925aa]/40 bg-[#1925aa]/2 flex flex-col items-center justify-center text-center px-4">
                        <span className="text-xs sm:text-sm font-mono uppercase font-bold tracking-widest text-[#1925aa]">
                            [ SECTION EMPTY ]
                        </span>
                        <p className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#1925aa]/70 mt-1">
                            NO FEATURED SYSTEMS FLAGGED AT THE MOMENT
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                        {featuredProducts.map((product) => (
                            <Card
                                key={product._id}
                                padding="p-4 sm:p-5"
                                className="bg-white text-[#1925aa] border border-[#1925aa]/80 hover:border-[#1925aa] flex flex-col justify-between w-full group hover:-translate-y-0.5 hover:bg-[#1925aa]/2 transition-all duration-200"
                            >
                                <div className="flex flex-col sm:flex-row gap-4 h-full items-center sm:items-stretch">
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

                                    {/* Right Side */}
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
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};