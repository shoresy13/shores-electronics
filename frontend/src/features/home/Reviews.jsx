import React from "react";
import { Card } from "../../components/Card";

const REVIEWS = [
    {
        id: 1,
        name: "PLACEHOLDER",
        role: "CUSTOM GAMING RIG",
        rating: "★★★★★",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
    },
    {
        id: 2,
        name: "PLACEHOLDER",
        role: "DIAGNOSTIC & REPAIR",
        rating: "★★★★★",
        comment: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo"
    },
    {
        id: 3,
        name: "PLACEHOLDER",
        role: "PRE-BUILT SYSTEM",
        rating: "★★★★★",
        comment: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime."
    }
];

export const Reviews = () => {
    return (
        <section className="w-full bg-[#1925aa] text-white py-12 lg:py-20 border-t-2 border-b-2 border-[#1925aa]">
            <div className="max-w-[1600px] mx-auto px-6">

                {/* Header */}
                <div className="mb-8 border-b-2 border-white pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
                    <div>
                        {/* Section Title - Zalando Sans Expanded */}
                        <h2 className="font-['Zalando_Sans_Expanded'] text-lg sm:text-xl md:text-2xlfont-bold uppercase tracking-wider">
                            WHAT CUSTOMERS SAY
                        </h2>
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-white/80">
                        5.0 STAR RATING AVERAGE
                    </span>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                    {REVIEWS.map((review) => (
                        <Card
                            key={review.id}
                            padding="p-5 md:p-6"
                            className="bg-white text-[#1925aa] flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#1925aa]/20">
                                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#1925aa]/70">
                                        {review.role}
                                    </span>
                                    <span className="text-xs font-bold tracking-widest">
                                        {review.rating}
                                    </span>
                                </div>

                                {/* Review Body - Monospace */}
                                <p className="text-xs font-mono uppercase tracking-wide leading-relaxed mb-4 text-[#1925aa]/90">
                                    "{review.comment}"
                                </p>
                            </div>

                            {/* Client Name */}
                            <div className="pt-2 border-t border-[#1925aa] flex items-center justify-between">
                                <span className="text-xs font-mono font-bold tracking-widest uppercase">
                                    {review.name}
                                </span>
                                <span className="text-[10px] font-mono tracking-widest uppercase text-[#1925aa]/60">
                                    VERIFIED BUYER
                                </span>
                            </div>
                        </Card>
                    ))}
                </div>

            </div>
        </section>
    );
};