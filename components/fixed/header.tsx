"use client";
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Upload, Rocket, BookOpen, Send, Check, Menu, X } from 'lucide-react'
import { Button } from '../ui/button'


export default function NavigationHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }


    return (
        <header className="bg-white shadow-md py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Rocket className="w-8 h-8 text-purple-600 mr-2" />
                    <h1 className="text-2xl font-bold text-gray-800">KindleZAP</h1>
                </div>
                <nav className="hidden md:block">
                    <ul className="flex space-x-4">
                        <li><Link href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</Link></li>
                        <li><Link href="#how-it-works" className="text-gray-600 hover:text-purple-600 transition-colors">How It Works</Link></li>
                        <li><Link href="#pricing" className="text-gray-600 hover:text-purple-600 transition-colors">Pricing</Link></li>
                    </ul>
                </nav>
                <div className="md:hidden">
                    <Button variant="ghost" size="icon" onClick={toggleMenu}>
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>
            {isMenuOpen && (
                <nav className="md:hidden mt-4">
                    <ul className="flex flex-col space-y-2">
                        <li><Link href="#features" className="block px-4 py-2 text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition-colors">Features</Link></li>
                        <li><Link href="#how-it-works" className="block px-4 py-2 text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition-colors">How It Works</Link></li>
                        <li><Link href="#pricing" className="block px-4 py-2 text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition-colors">Pricing</Link></li>
                    </ul>
                </nav>
            )}
        </header>
    )
}