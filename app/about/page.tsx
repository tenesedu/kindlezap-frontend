'use client'

import { Rocket, BookOpen, Zap, Shield } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

export default function AboutUs() {

    return (
        <div>

            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="bg-white shadow-xl rounded-2xl p-8 mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">About Us</h2>
                    <p className="text-gray-600 mb-6">Welcome to KindleZap!</p>
                    <p className="text-gray-600 mb-6">At KindleZap, our mission is simple: to provide readers with an easy, free, and legal way to read books on their Kindle devices. We believe in making reading accessible to everyone, whether you're a casual reader or an avid bookworm. With our platform, you can convert any PDF you own into a Kindle-friendly format and enjoy reading your favorite books on-the-go — all for free.</p>

                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h3>
                    <p className="text-gray-600 mb-6">We aim to create a world where anyone, regardless of their budget, has access to the books they love. Whether you're looking for free educational materials, novels, or self-published works, KindleZap is your gateway to transforming your PDFs into a Kindle-readable format, effortlessly.</p>

                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">What We Do</h3>
                    <p className="text-gray-600 mb-4">Our platform allows users to:</p>
                    <ul className="list-disc pl-6 mb-6 text-gray-600">
                        <li>Upload and convert PDFs into a Kindle-compatible format.</li>
                        <li>Send PDFs directly to your Kindle device or app via a simple, secure process.</li>
                        <li>Ensure full compliance with copyright laws, so you can be confident that the content you upload is legal and properly obtained.</li>
                    </ul>

                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <Card>
                            <CardContent className="p-6">
                                <BookOpen className="w-12 h-12 text-purple-500 mb-4" />
                                <h4 className="text-xl font-semibold mb-2">Free & Easy</h4>
                                <p className="text-gray-600">We believe reading should be easy and accessible. Our platform is completely free to use, with no hidden fees or subscriptions.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6">
                                <Zap className="w-12 h-12 text-green-500 mb-4" />
                                <h4 className="text-xl font-semibold mb-2">Fast & Reliable</h4>
                                <p className="text-gray-600">Convert and send your PDFs to your Kindle in just a few simple steps. Our service is quick and reliable, getting your content to you fast.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6">
                                <Shield className="w-12 h-12 text-blue-500 mb-4" />
                                <h4 className="text-xl font-semibold mb-2">Respect for Copyright</h4>
                                <p className="text-gray-600">We are committed to respecting the intellectual property of authors and creators. We ask all users to upload only content they own or have permission to share, ensuring we stay compliant with copyright laws.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6">
                                <Rocket className="w-12 h-12 text-pink-500 mb-4" />
                                <h4 className="text-xl font-semibold mb-2">No Ads, No Interruptions</h4>
                                <p className="text-gray-600">Enjoy a smooth, ad-free experience. We focus on providing value to our users, not interrupting your reading time.</p>
                            </CardContent>
                        </Card>
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment to You</h3>
                    <p className="text-gray-600 mb-6">We are here to help you read more. Our team is constantly working to improve the platform, making sure it's easy to use and that you have access to the best possible experience. Whether you're looking to send PDFs from your computer, tablet, or smartphone, KindleZap will be your trusted tool for bringing your books to Kindle.</p>

                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Promise</h3>
                    <p className="text-gray-600 mb-6">We believe in building tools that empower readers. Our goal is to continually improve KindleZap, keep it completely free for our users, and provide a platform that makes reading more enjoyable and convenient than ever.</p>
                </div>
            </main>
        </div>
    )
}