import React from "react";

export const Card = ({ children, className = "", padding = "p-6" }) => {
    return (
        <div className={`border border-[#1925aa] ${padding} bg-white shadow-[4px_4px_0px_0px_#1925aa] flex flex-col justify-between h-full ${className}`}>
            {children}
        </div>
    );
};