import React, { useEffect } from "react";

export default function PrivacyPolicy() {
    const lastUpdated = "July 31, 2026";
    const contactEmail = "contact@shoreselectronics.co.uk";
    const siteUrl = "https://shoreselectronics.co.uk/";
    const dsarUrl = "https://app.termly.io/dsar/fb423e11-9c30-4913-9d54-cc5267d8e8a6";

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen bg-[#1925aa] text-white font-mono text-xs md:text-sm uppercase tracking-wider py-16 px-6 select-none">
            <div className="max-w-4xl mx-auto space-y-10">
                {/* Header */}
                <header className="border-b border-white/20 pb-6 space-y-2">
                    <h1 className="text-2xl md:text-4xl font-bold tracking-wide">
                        Privacy Policy
                    </h1>
                    <p className="text-[10px] text-white/60">
                        Last updated: {lastUpdated}
                    </p>
                </header>

                {/* Introduction */}
                <section className="space-y-4 text-white/90 leading-relaxed">
                    <p>
                        This Privacy Notice for <strong className="text-white">Shores Electronics</strong> ("we", "us", or "our") describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including when you:
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-2 text-white/80">
                        <li>
                            Visit our website at{" "}
                            <a
                                href={siteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-white transition-colors lowercase"
                            >
                                {siteUrl}
                            </a>
                        </li>
                        <li>Engage with us in other related ways, including any marketing or events.</li>
                    </ul>
                    <div className="p-4 border border-white/20 bg-white/5 space-y-2">
                        <p className="font-bold text-white">Questions or concerns?</p>
                        <p className="text-white/80">
                            Reading this Privacy Notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have questions, contact us at{" "}
                            <a
                                href={`mailto:${contactEmail}`}
                                className="underline hover:text-white transition-colors lowercase"
                            >
                                {contactEmail}
                            </a>.
                        </p>
                    </div>
                </section>

                {/* Summary */}
                <section className="space-y-4 border-t border-white/20 pt-8">
                    <h2 className="text-base md:text-lg font-bold text-white tracking-widest">
                        Summary of Key Points
                    </h2>
                    <div className="space-y-4 text-white/80 leading-relaxed">
                        <p>
                            <strong className="text-white">What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us.
                        </p>
                        <p>
                            <strong className="text-white">Do we process any sensitive personal information?</strong> We do not process sensitive personal information.
                        </p>
                        <p>
                            <strong className="text-white">Do we collect any information from third parties?</strong> We do not collect any information from third parties.
                        </p>
                        <p>
                            <strong className="text-white">How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.
                        </p>
                        <p>
                            <strong className="text-white">How do we keep your information safe?</strong> We have adequate organizational and technical processes in place to protect your personal information, though no transmission over the internet is guaranteed 100% secure.
                        </p>
                        <p>
                            <strong className="text-white">How do you exercise your rights?</strong> The easiest way to exercise your rights is by submitting a{" "}
                            <a
                                href={dsarUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-white transition-colors"
                            >
                                Data Subject Access Request
                            </a>{" "}
                            or by contacting us directly.
                        </p>
                    </div>
                </section>

                <div className="space-y-10 border-t border-white/20 pt-8 text-white/80 leading-relaxed">
                    {/* Section 1 */}
                    <section className="space-y-3">
                        <h2 className="text-sm md:text-base font-bold text-white tracking-widest">
                            1. What Information Do We Collect?
                        </h2>
                        <p>We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services.</p>
                        <p className="text-white font-bold">Personal Information Provided by You:</p>
                        <ul className="list-disc list-inside space-y-1 pl-2">
                            <li>Names</li>
                            <li>Email Addresses</li>
                        </ul>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-3">
                        <h2 className="text-sm md:text-base font-bold text-white tracking-widest">
                            2. How Do We Process Your Information?
                        </h2>
                        <p>We process your personal information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with applicable laws.</p>
                    </section>

                    {/* Section 3 */}
                    <section className="space-y-3">
                        <h2 className="text-sm md:text-base font-bold text-white tracking-widest">
                            3. What Legal Bases Do We Rely On?
                        </h2>
                        <p>Under UK GDPR and General Data Protection Regulation (GDPR), we rely on valid legal bases such as Consent, Legal Obligations, and Vital Interests to process your information.</p>
                    </section>

                    {/* Section 4 */}
                    <section className="space-y-3">
                        <h2 className="text-sm md:text-base font-bold text-white tracking-widest">
                            4. When and With Whom Do We Share Information?
                        </h2>
                        <p>We may share your personal information in specific situations, such as during business transfers, mergers, or sale of company assets.</p>
                    </section>

                    {/* Section 5 */}
                    <section className="space-y-3">
                        <h2 className="text-sm md:text-base font-bold text-white tracking-widest">
                            5. How Long Do We Keep Your Information?
                        </h2>
                        <p>We keep your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Notice, unless a longer retention period is required by law.</p>
                    </section>

                    {/* Section 6 */}
                    <section className="space-y-3">
                        <h2 className="text-sm md:text-base font-bold text-white tracking-widest">
                            6. How Do We Keep Your Information Safe?
                        </h2>
                        <p>We maintain appropriate organizational and technical security measures designed to protect your personal data from unauthorized access, modification, or theft.</p>
                    </section>

                    {/* Section 7 */}
                    <section className="space-y-3">
                        <h2 className="text-sm md:text-base font-bold text-white tracking-widest">
                            7. Do We Collect Information From Minors?
                        </h2>
                        <p>We do not knowingly collect data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 years old.</p>
                    </section>

                    {/* Section 8 */}
                    <section className="space-y-3">
                        <h2 className="text-sm md:text-base font-bold text-white tracking-widest">
                            8. What Are Your Privacy Rights?
                        </h2>
                        <p>In regions like the UK and EEA, you have rights to access, rectify, restrict, or erase your personal information. You also have the right to lodge a complaint with the Information Commissioner's Office (ICO).</p>
                        <div className="p-4 border border-white/20 bg-white/5 space-y-2 text-xs">
                            <p className="font-bold text-white">UK Supervisory Authority (ICO):</p>
                            <p>Website: <a href="https://ico.org.uk/make-a-complaint" target="_blank" rel="noopener noreferrer" className="underline hover:text-white lowercase">ico.org.uk/make-a-complaint</a></p>
                            <p>Helpline: 0303 123 1113</p>
                        </div>
                    </section>

                    {/* Section 9 */}
                    <section className="space-y-3">
                        <h2 className="text-sm md:text-base font-bold text-white tracking-widest">
                            9. Controls For Do-Not-Track Features
                        </h2>
                        <p>We do not currently respond to DNT browser signals as no uniform technology standard for recognizing DNT signals has been finalized.</p>
                    </section>

                    {/* Section 10 */}
                    <section className="space-y-3">
                        <h2 className="text-sm md:text-base font-bold text-white tracking-widest">
                            10. Updates To This Notice
                        </h2>
                        <p>We may update this Privacy Notice from time to time. The updated version will be indicated by a revised date at the top of the page.</p>
                    </section>

                    {/* Section 11 */}
                    <section className="space-y-3">
                        <h2 className="text-sm md:text-base font-bold text-white tracking-widest">
                            11. How Can You Contact Us?
                        </h2>
                        <p>
                            If you have questions or comments about this notice, email us at{" "}
                            <a
                                href={`mailto:${contactEmail}`}
                                className="underline hover:text-white transition-colors lowercase"
                            >
                                {contactEmail}
                            </a>.
                        </p>
                    </section>

                    {/* Section 12 */}
                    <section className="space-y-3">
                        <h2 className="text-sm md:text-base font-bold text-white tracking-widest">
                            12. Data Access & Request
                        </h2>
                        <p>
                            To review, update, or delete your data, please submit a{" "}
                            <a
                                href={dsarUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-white transition-colors"
                            >
                                Data Subject Access Request
                            </a>.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}