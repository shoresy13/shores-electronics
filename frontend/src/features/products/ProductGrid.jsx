import React, { useState, useEffect } from "react";
import { ProductCard } from "../../components/ProductCard.jsx";
import API from "../../../utils/axios.js";

export const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const { data } = await API.get("/api/products");
                setProducts(data);
            } catch (err) {
                console.error("Error loading products directory:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="w-full bg-white text-[#1925aa] py-10 lg:py-14">
            <div className="max-w-[1600px] mx-auto px-6">

                {/* Header */}
                <div className="mb-6 border-b-2 border-[#1925aa] pb-3 flex justify-between items-baseline gap-2">
                    <div className="min-w-0">
                        <h2 className="font-['Zalando_Sans_Expanded'] text-xs sm:text-base md:text-xl font-bold uppercase tracking-wider truncate">
                            PRODUCTS INVENTORY
                        </h2>
                    </div>
                    <span className="text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#1925aa]/70 shrink-0 whitespace-nowrap">
                        [{products.length} SYSTEMS AVAILABLE]
                    </span>
                </div>

                {/* Content Grid */}
                {loading ? (
                    <div className="text-xs font-mono uppercase font-bold py-16 text-center animate-pulse tracking-widest">
                        FETCHING PRODUCT DIRECTORY...
                    </div>
                ) : products.length === 0 ? (
                    <div className="w-full py-16 border border-dashed border-[#1925aa]/40 bg-[#1925aa]/2 flex flex-col items-center justify-center text-center px-4">
                        <span className="text-xs sm:text-sm font-mono uppercase font-bold tracking-widest text-[#1925aa]">
                            [ DIRECTORY EMPTY ]
                        </span>
                        <p className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#1925aa]/70 mt-1">
                            NO SYSTEMS CURRENTLY LISTED
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};