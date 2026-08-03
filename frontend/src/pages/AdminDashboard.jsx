import React, { useState, useEffect } from "react";
import { Card } from "../components/Card";

const initialSpecs = {
    cpu: "",
    gpu: "",
    ram: "",
    storage: "",
    motherboard: "",
    psu: "",
    cooler: "",
    case: "",
    os: ""
};

const initialFormState = {
    name: "",
    price: "",
    countInStock: 1,
    description: "",
    images: "",
    specs: initialSpecs
};

export const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState(initialFormState);
    const [editingId, setEditingId] = useState(null);

    const getAuthHeaders = () => {
        const token = localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo")).token
            : "";

        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        };
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/products");
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to fetch products");
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSpecChange = (e) => {
        setFormData({
            ...formData,
            specs: {
                ...formData.specs,
                [e.target.name]: e.target.value
            }
        });
    };

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        const formDataUpload = new FormData();
        files.forEach((file) => formDataUpload.append("images", file));

        try {
            setUploading(true);
            setError(null);

            const token = localStorage.getItem("userInfo")
                ? JSON.parse(localStorage.getItem("userInfo")).token
                : "";

            const res = await fetch("/api/products/upload", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formDataUpload
            });

            const uploadedUrls = await res.json();
            if (!res.ok) throw new Error(uploadedUrls.message || "Image upload failed");

            const existingImages = formData.images
                ? formData.images.split(",").map((s) => s.trim()).filter(Boolean)
                : [];

            const combined = [...existingImages, ...uploadedUrls].join(", ");

            setFormData((prev) => ({ ...prev, images: combined }));
        } catch (err) {
            setError(err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleEdit = (product) => {
        setEditingId(product._id);
        setFormData({
            name: product.name || "",
            price: product.price || "",
            countInStock: product.countInStock ?? 1,
            description: product.description || "",
            images: Array.isArray(product.images) ? product.images.join(", ") : "",
            specs: {
                ...initialSpecs,
                ...(product.specs || {})
            }
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData(initialFormState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const payload = {
            ...formData,
            price: Number(formData.price),
            countInStock: Number(formData.countInStock),
            images: formData.images.split(",").map((s) => s.trim()).filter(Boolean)
        };

        const url = editingId ? `/api/products/${editingId}` : "/api/products";
        const method = editingId ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: getAuthHeaders(),
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Operation failed");

            handleCancel();
            fetchProducts();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("CONFIRM DELETE: Remove product record permanently?")) return;

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "DELETE",
                headers: getAuthHeaders()
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to delete product");

            fetchProducts();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="text-[#1925aa] font-mono border-b-4 border-[#1925aa]">
            <section className="w-full max-w-[1600px] mx-auto px-6 py-10 min-h-[calc(100vh-5rem)] flex flex-col justify-center">

                {error && (
                    <div className="bg-red-50 border border-red-600 text-red-600 px-4 py-2 mb-6 text-xs uppercase font-bold tracking-wide">
                        ERROR: {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Form Panel */}
                    <div className="lg:col-span-6 flex flex-col justify-between">
                        <Card padding="p-6 flex-1 flex flex-col justify-between">
                            <div>
                                <h2 className="font-['Zalando_Sans_Expanded'] text-lg font-bold uppercase tracking-wider mb-4 border-b-2 border-[#1925aa] pb-2">
                                    {editingId ? "EDIT SPECIFICATION" : "ADD NEW ENTRY"}
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-3.5 text-xs uppercase">
                                    <div>
                                        <label className="block font-bold mb-1 tracking-wider">System Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter name"
                                            className="w-full bg-transparent border border-[#1925aa] p-2 focus:outline-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-bold mb-1 tracking-wider">Price (£) *</label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                required
                                                step="0.01"
                                                placeholder="Enter price"
                                                className="w-full bg-transparent border border-[#1925aa] p-2 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-bold mb-1 tracking-wider">Stock Qty *</label>
                                            <input
                                                type="number"
                                                name="countInStock"
                                                value={formData.countInStock}
                                                onChange={handleChange}
                                                required
                                                min="0"
                                                className="w-full bg-transparent border border-[#1925aa] p-2 focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <label className="font-bold tracking-wider">
                                                Images * <span className="opacity-60 text-[10px]"></span>
                                            </label>
                                            <label className="cursor-pointer bg-[#1925aa]/10 hover:bg-[#1925aa] hover:text-white border border-[#1925aa] text-[10px] px-2 py-0.5 font-bold transition-colors uppercase">
                                                {uploading ? "[ UPLOADING... ]" : "[ + CHOOSE FILES ]"}
                                                <input
                                                    type="file"
                                                    multiple
                                                    accept="image/*"
                                                    onChange={handleFileUpload}
                                                    className="hidden"
                                                    disabled={uploading}
                                                />
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            name="images"
                                            value={formData.images}
                                            onChange={handleChange}
                                            required
                                            placeholder="Upload images"
                                            className="w-full bg-transparent border border-[#1925aa] p-2 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-bold mb-1 tracking-wider">Description *</label>
                                        <textarea
                                            name="description"
                                            rows="2"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter description"
                                            className="w-full bg-transparent border border-[#1925aa] p-2 focus:outline-none resize-none"
                                        />
                                    </div>

                                    {/* System Specs */}
                                    <div className="border-t border-[#1925aa]/20 pt-3 mt-3">
                                        <h3 className="font-['Zalando_Sans_Expanded'] text-xs font-bold uppercase tracking-wider mb-2.5">
                                            HARDWARE SPECS
                                        </h3>
                                        <div className="grid grid-cols-2 gap-2.5">
                                            {Object.keys(initialSpecs).map((specKey) => (
                                                <div key={specKey}>
                                                    <label className="block font-bold mb-0.5 text-[10px] tracking-wider uppercase">
                                                        {specKey}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name={specKey}
                                                        value={formData.specs[specKey]}
                                                        onChange={handleSpecChange}
                                                        placeholder={`Enter ${specKey}`}
                                                        className="w-full bg-transparent border border-[#1925aa] p-1.5 text-xs focus:outline-none"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-3 flex gap-3">
                                        <button
                                            type="submit"
                                            disabled={uploading}
                                            className="flex-1 bg-[#1925aa] text-white font-bold py-2.5 uppercase tracking-widest hover:bg-white hover:text-[#1925aa] border border-[#1925aa] transition-colors disabled:opacity-50"
                                        >
                                            {editingId ? "SAVE RECORD" : "COMMIT ENTRY"}
                                        </button>
                                        {editingId && (
                                            <button
                                                type="button"
                                                onClick={handleCancel}
                                                className="px-4 border border-[#1925aa] font-bold uppercase tracking-widest hover:bg-[#1925aa]/10"
                                            >
                                                CANCEL
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </Card>
                    </div>

                    {/* Inventory Panel */}
                    <div className="lg:col-span-6 flex flex-col justify-between">
                        <Card padding="p-6 flex-1 flex flex-col">
                            <h2 className="font-['Zalando_Sans_Expanded'] text-lg font-bold uppercase tracking-wider mb-4 border-b-2 border-[#1925aa] pb-2">
                                ACTIVE INVENTORY [{products.length}]
                            </h2>

                            {loading ? (
                                <div className="text-xs uppercase font-bold py-8 text-center animate-pulse">
                                    READING DATABASE...
                                </div>
                            ) : products.length === 0 ? (
                                <div className="text-xs uppercase opacity-70 py-8 text-center border border-dashed border-[#1925aa]/40">
                                    NO PRODUCTS FOUND IN DATABASE
                                </div>
                            ) : (
                                <div className="overflow-x-auto flex-1">
                                    <table className="w-full text-left text-xs uppercase border-collapse">
                                        <thead>
                                        <tr className="border-b-2 border-[#1925aa]">
                                            <th className="py-2 pr-2">System Name</th>
                                            <th className="py-2 px-2">Price</th>
                                            <th className="py-2 px-2">Stock</th>
                                            <th className="py-2 pl-2 text-right">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#1925aa]/20">
                                        {products.map((p) => (
                                            <tr key={p._id} className="hover:bg-[#1925aa]/5 transition-colors">
                                                <td className="py-2.5 pr-2 font-bold">{p.name}</td>
                                                <td className="py-2.5 px-2">£{p.price?.toFixed(2)}</td>
                                                <td className="py-2.5 px-2">
                                                        <span
                                                            className={`px-1.5 py-0.5 border ${
                                                                p.countInStock > 0
                                                                    ? "border-[#1925aa] text-[#1925aa]"
                                                                    : "border-red-600 text-red-600"
                                                            }`}
                                                        >
                                                            {p.countInStock}
                                                        </span>
                                                </td>
                                                <td className="py-2.5 pl-2 text-right space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(p)}
                                                        className="underline font-bold hover:opacity-70"
                                                    >
                                                        EDIT
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(p._id)}
                                                        className="text-red-600 underline font-bold hover:opacity-70"
                                                    >
                                                        DEL
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
};