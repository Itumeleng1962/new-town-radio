export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-black text-white uppercase mb-8">
                Privacy <span className="text-brand-lemon">Policy</span>
            </h1>

            <div className="prose prose-invert max-w-none space-y-8 text-neutral-300">
                <p className="text-lg text-neutral-400">
                    <strong>Last Updated:</strong> January 18, 2026
                </p>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">1. Information We Collect</h2>
                    <p>
                        When you use Newtown Radio's website and services, we may collect the following types of information:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Personal Information:</strong> Name, email address, payment information when you make donations or purchases.</li>
                        <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, shows listened to, and time spent.</li>
                        <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers.</li>
                        <li><strong>Cookies:</strong> We use cookies to enhance your experience and analyze site traffic.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Provide and improve our radio streaming services</li>
                        <li>Process donations and membership payments</li>
                        <li>Send you newsletters and updates (with your consent)</li>
                        <li>Analyze website usage and improve user experience</li>
                        <li>Respond to your inquiries and provide customer support</li>
                        <li>Comply with legal obligations</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">3. Information Sharing</h2>
                    <p>
                        We do not sell your personal information. We may share your information with:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Service Providers:</strong> Payment processors, email service providers, and analytics tools.</li>
                        <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
                        <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">4. Cookies and Tracking</h2>
                    <p>
                        We use cookies and similar technologies to enhance your experience. You can control cookies through your browser settings, but disabling them may affect site functionality.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">5. Data Security</h2>
                    <p>
                        We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">6. Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Access your personal information</li>
                        <li>Correct inaccurate data</li>
                        <li>Request deletion of your data</li>
                        <li>Opt-out of marketing communications</li>
                        <li>Object to data processing</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">7. Children's Privacy</h2>
                    <p>
                        Our services are not directed to children under 13. We do not knowingly collect personal information from children.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">8. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">9. Contact Us</h2>
                    <p>
                        If you have questions about this Privacy Policy, please contact us at:
                    </p>
                    <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 mt-4">
                        <p><strong>Email:</strong> privacy@newtownradio.co.za</p>
                        <p><strong>Address:</strong> 123 Pulse Avenue, Newtown, Johannesburg, 2001</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
