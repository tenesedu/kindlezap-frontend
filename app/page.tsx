'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Upload, Rocket, BookOpen, Send, Check, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const carouselSlides = [
  {
    title: "Revolutionize Your Reading",
    description: "Transform any PDF into a Kindle-friendly format with just a few clicks. Reading has never been this easy!",
    icon: <Rocket className="w-12 h-12 text-purple-500" />
  },
  {
    title: "Seamless Integration",
    description: "Our service works directly with your Kindle email. Set it up once, and you're ready to go!",
    icon: <BookOpen className="w-12 h-12 text-green-500" />
  },
  {
    title: "Lightning-Fast Delivery",
    description: "Upload your PDF, and we'll send it to your Kindle in seconds. It's that quick!",
    icon: <Send className="w-12 h-12 text-blue-500" />
  },
  {
    title: "Read Anywhere, Anytime",
    description: "Access your PDFs on any Kindle device or app. Your library, your way.",
    icon: <Check className="w-12 h-12 text-pink-500" />
  }
]

export default function Component() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [email, setEmail] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showDisclaimer, setShowDisclaimer] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDisclaimer(true)
    }, 7000)

    return () => clearTimeout(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission here
    console.log('File:', file)
    console.log('Email:', email)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-pink-100">
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Rocket className="w-8 h-8 text-purple-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">KindlePDF</h1>
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

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Send PDFs to Your Kindle in Seconds</h2>
          <p className="text-xl text-gray-600 mb-8">Transform any document into a Kindle-friendly format with just a few clicks.</p>
          <div className="mb-8">
            <video
              className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
              controls
              poster="/placeholder.svg?height=400&width=600"
            >
              <source src="/path-to-your-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors">
            Get Started for Free
          </Button>
        </div>

        <Card className="mb-12 bg-white shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {carouselSlides.map((slide, index) => (
                    <div key={index} className="w-full flex-shrink-0 p-8">
                      <div className="flex flex-col items-center text-center">
                        {slide.icon}
                        <h3 className="text-2xl font-semibold text-gray-800 mt-4 mb-2">{slide.title}</h3>
                        <p className="text-gray-600">{slide.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Button variant="outline" size="icon" className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full shadow-md" onClick={prevSlide}>
                <ChevronLeft className="h-6 w-6 text-gray-800" />
              </Button>
              <Button variant="outline" size="icon" className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full shadow-md" onClick={nextSlide}>
                <ChevronRight className="h-6 w-6 text-gray-800" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="bg-white shadow-xl rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Upload Your PDF</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-purple-300 border-dashed rounded-lg cursor-pointer bg-purple-50 hover:bg-purple-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 mb-4 text-purple-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF (MAX. 100MB)</p>
                </div>
                <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept=".pdf" />
              </label>
              {file && <p className="mt-2 text-sm text-gray-500">Selected file: {file.name}</p>}
            </div>
            <div>
              <label htmlFor="kindle-email" className="block text-sm font-medium text-gray-700 mb-2">
                Your Kindle Email Address
              </label>
              <Input
                type="email"
                id="kindle-email"
                placeholder="your-kindle-email@kindle.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              />
              <p className="mt-2 text-sm text-gray-500">Don't forget to add our email to your Amazon approved list for Kindle.</p>
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md transition-colors">
              Send to Kindle
            </Button>
          </form>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose KindlePDF?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <BookOpen className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Vast Compatibility</h4>
              <p className="text-gray-600">Works with all types of PDFs and Kindle devices.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Rocket className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Lightning Fast</h4>
              <p className="text-gray-600">Get your PDFs on your Kindle in seconds, not minutes.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Check className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Secure & Private</h4>
              <p className="text-gray-600">Your documents are encrypted and never stored.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h5 className="text-xl font-semibold mb-4">KindlePDF</h5>
              <p className="text-gray-400">Transforming the way you read PDFs on your Kindle.</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h5 className="text-xl font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h5 className="text-xl font-semibold mb-4">Legal</h5>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2023 KindlePDF. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Dialog open={showDisclaimer} onOpenChange={setShowDisclaimer}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">⚠️ Important Legal Notice ⚠️</DialogTitle>
          </DialogHeader>
          <div className="text-sm">
            <p className="mb-4">By uploading a PDF to our platform, you confirm that:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>You own the content or have explicit permission from the copyright holder to share and distribute this file.</li>
              <li>You will not upload any copyrighted content without the proper authorization to do so.</li>
              <li>You are responsible for ensuring that the content you upload complies with all applicable copyright laws.</li>
              <li>Uploading unauthorized or illegal content may result in account suspension or legal action.</li>
            </ul>
            <p>For more information, please review our Terms of Service and Privacy Policy.</p>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button onClick={() => setShowDisclaimer(false)} className="bg-green-600 hover:bg-green-700 text-white">
              I Agree
            </Button>
            <Button onClick={() => setShowDisclaimer(false)} variant="outline">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}