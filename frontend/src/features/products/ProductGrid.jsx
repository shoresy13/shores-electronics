import React, { useState, useEffect, useMemo } from "react";
import { ProductCard } from "../../components/ProductCard.jsx";
import API from "../../../utils/axios.js";

export const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState("");
    const [priceRange, setPriceRange] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [inStockOnly, setInStockOnly] = useState(false);

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

    // Filter and Sort Logic
    const filteredProducts = useMemo(() => {
        return products
            .filter((product) => {
                const query = searchQuery.toLowerCase().trim();
                const matchesSearch =
                    !query ||
                    product.name?.toLowerCase().includes(query) ||
                    product.description?.toLowerCase().includes(query) ||
                    product.specs?.cpu?.toLowerCase().includes(query) ||
                    product.specs?.gpu?.toLowerCase().includes(query);

                // Stock Check
                const isOutOfStock = product.stock <= 0 || product.inStock === false;
                const isAvailable = !isOutOfStock;
                const matchesStock = !inStockOnly || isAvailable;

                // Price Filter
                const price = product.price || 0;
                let matchesPrice = true;
                if (priceRange === "under1000") matchesPrice = price < 1000;
                if (priceRange === "1000to1500") matchesPrice = price >= 1000 && price <= 1500;
                if (priceRange === "over1500") matchesPrice = price > 1500;

                return matchesSearch && matchesStock && matchesPrice;
            })
            .sort((a, b) => {
                if (sortBy === "price-asc") return (a.price || 0) - (b.price || 0);
                if (sortBy === "price-desc") return (b.price || 0) - (a.price || 0);
                if (sortBy === "newest") return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
                return 0;
            });
    }, [products, searchQuery, priceRange, sortBy, inStockOnly]);

    const resetFilters = () => {
        setSearchQuery("");
        setPriceRange("all");
        setSortBy("newest");
        setInStockOnly(false);
    };

    return (
        <section className="w-full bg-white text-[#1925aa] py-10 lg:py-14 font-mono">
            <div className="max-w-[1600px] mx-auto px-6">

                {/* Header */}
                <div className="mb-6 border-b-2 border-[#1925aa] pb-3 flex justify-between items-baseline gap-2">
                    <div className="min-w-0">
                        <h2 className="font-['Zalando_Sans_Expanded'] text-xs sm:text-base md:text-xl font-bold uppercase tracking-wider truncate">
                            PRODUCTS INVENTORY
                        </h2>
                    </div>
                    <span className="text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#1925aa]/70 shrink-0 whitespace-nowrap">
                        [{filteredProducts.length} / {products.length} SYSTEMS]
                    </span>
                </div>

                {/* Filter & Search Bar */}
                <div className="mb-8 p-3 bg-[#1925aa]/5 border border-[#1925aa] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs uppercase font-bold">

                    {/* Search Input */}
                    <div>
                        <label className="block text-[10px] text-[#1925aa]/70 mb-1">SEARCH BUILD / SPEC:</label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="E.G. RTX 4070, RYZEN..."
                            className="w-full bg-white border border-[#1925aa] p-2 text-xs text-[#1925aa] focus:outline-none focus:ring-1 focus:ring-[#1925aa]"
                        />
                    </div>

                    {/* Price Range Filter */}
                    <div>
                        <label className="block text-[10px] text-[#1925aa]/70 mb-1">PRICE BRACKET:</label>
                        <select
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="w-full bg-white border border-[#1925aa] p-2 text-xs text-[#1925aa] focus:outline-none focus:ring-1 focus:ring-[#1925aa] cursor-pointer"
                        >
                            <option value="all">ALL PRICES</option>
                            <option value="under1000">UNDER £1,000</option>
                            <option value="1000to1500">£1,000 - £1,500</option>
                            <option value="over1500">OVER £1,500</option>
                        </select>
                    </div>

                    {/* Sorting */}
                    <div>
                        <label className="block text-[10px] text-[#1925aa]/70 mb-1">SORT BY:</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full bg-white border border-[#1925aa] p-2 text-xs text-[#1925aa] focus:outline-none focus:ring-1 focus:ring-[#1925aa] cursor-pointer"
                        >
                            <option value="newest">LATEST ARRIVALS</option>
                            <option value="price-asc">PRICE: LOW TO HIGH</option>
                            <option value="price-desc">PRICE: HIGH TO LOW</option>
                        </select>
                    </div>

                    {/* Toggle & Reset */}
                    <div className="flex items-end gap-2">
                        <button
                            type="button"
                            onClick={() => setInStockOnly(!inStockOnly)}
                            className={`flex-1 py-2 px-2 border text-[11px] transition-all cursor-pointer truncate ${
                                inStockOnly
                                    ? "bg-[#1925aa] text-white border-[#1925aa]"
                                    : "bg-white text-[#1925aa] border-[#1925aa] hover:bg-[#1925aa]/10"
                            }`}
                        >
                            {inStockOnly ? "[✓] IN STOCK ONLY" : "[ ] IN STOCK ONLY"}
                        </button>

                        {(searchQuery || priceRange !== "all" || sortBy !== "newest" || inStockOnly) && (
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="py-2 px-3 bg-white text-red-600 border border-red-600 text-[11px] hover:bg-red-600 hover:text-white transition-all cursor-pointer shrink-0"
                            >
                                RESET
                            </button>
                        )}
                    </div>
                </div>

                {/* Content Grid */}
                {loading ? (
                    <div className="text-xs font-mono uppercase font-bold py-16 text-center animate-pulse tracking-widest">
                        FETCHING PRODUCT DIRECTORY...
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="w-full py-16 border border-dashed border-[#1925aa]/40 bg-[#1925aa]/2 flex flex-col items-center justify-center text-center px-4">
                        <span className="text-xs sm:text-sm font-mono uppercase font-bold tracking-widest text-[#1925aa]">
                            [ NO MATCHING SYSTEMS ]
                        </span>
                        <p className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#1925aa]/70 mt-1">
                            NO BUILDS MATCH YOUR APPLIED FILTERS
                        </p>
                        <button
                            onClick={resetFilters}
                            className="mt-4 bg-[#1925aa] text-white text-xs font-bold py-2 px-4 border border-[#1925aa] hover:bg-transparent hover:text-[#1925aa] transition-all cursor-pointer"
                        >
                            CLEAR FILTERS
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};