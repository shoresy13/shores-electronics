import React from "react";
import { Link } from "react-router";
import { Card } from "../../components/Card";

export const CtaCard = ({
                            title,
                            description,
                            imageLabel,
                            buttonText,
                            buttonLink,
                            className = "",
                            padding = "p-6"
                        }) => {
    return (
        <Card padding={padding} className={`font-mono ${className}`}>
            <div className="flex flex-col flex-1 justify-between mb-4 gap-3">

                {/* Image Placeholder */}
                <div className="w-full min-h-35 flex-1 bg-[#1925aa]/10 border border-[#1925aa] flex items-center justify-center overflow-hidden">
                    <span className="text-[11px] uppercase tracking-widest font-bold text-[#1925aa]/60">
                        {imageLabel}
                    </span>
                </div>

                {/* Text */}
                <div>
                    <h2 className="font-['Zalando_Sans_Expanded'] text-base sm:text-lg font-bold uppercase tracking-wider mb-1">
                        {title}
                    </h2>
                    <p className="text-xs uppercase tracking-wide text-[#1925aa]/80 leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>

            {/* Button */}
            <Link
                to={buttonLink}
                className="block text-center bg-[#1925aa] text-white font-bold text-xs uppercase tracking-widest py-3 px-6 hover:bg-white hover:text-[#1925aa] border border-[#1925aa] transition-colors duration-150 ease-in-out"
            >
                {buttonText}
            </Link>
        </Card>
    );
};