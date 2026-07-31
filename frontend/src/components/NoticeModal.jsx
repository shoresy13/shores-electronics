import React, { useState, useEffect } from "react";
import { Card } from "./Card";

const STORAGE_KEY = "shores_notice_acknowledged";

export default function NoticeModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const isAcknowledged = sessionStorage.getItem(STORAGE_KEY);
        if (!isAcknowledged) {
            setIsOpen(true);
        }
    }, []);

    const handleAcknowledge = () => {
        sessionStorage.setItem(STORAGE_KEY, "true");
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm select-none">
            <Card
                padding="p-6 md:p-8"
                className="w-full max-w-lg h-auto! bg-white text-[#1925aa] shadow-[8px_8px_0px_0px_rgba(25,37,170,1)]"
            >
                <div className="space-y-4 mb-8">
                    <h2 className="text-lg md:text-xl font-bold uppercase tracking-wide leading-tight">
                        Welcome to Shores Electronics
                    </h2>
                    <p className="text-xs md:text-sm uppercase tracking-wide leading-relaxed text-[#1925aa]/90">
                        This site is currently in active development. Please acknowledge this message before continuing to view placeholder content and unfinished pages.
                    </p>
                </div>

                <button
                    onClick={handleAcknowledge}
                    className="w-full py-3 px-6 bg-[#1925aa] text-white text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-[#1925aa] border-2 border-[#1925aa] transition-colors duration-150 active:translate-y-0.5 cursor-pointer"
                >
                    Acknowledge & Continue
                </button>
            </Card>
        </div>
    );
}