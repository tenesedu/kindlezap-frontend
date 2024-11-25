"use client";

import { useState, useEffect } from "react";
// import Image from 'next/image'
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  Rocket,
  BookOpen,
  Send,
  Check,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { setServers } from "dns";
import Spinner from "@/components/ui/spinner";
import KindleSimulator from "@/components/ui/kindleSimulator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MetadataForm from "@/components/form/metadata";
import { Metadata } from "@/app/interfaces";

const carouselSlides = [
  {
    title: "Revolutionize Your Reading",
    description:
      "Transform any PDF into a Kindle-friendly format with just a few clicks. Reading has never been this easy!",
    icon: <Rocket className="w-12 h-12 text-purple-500" />,
  },
  {
    title: "Seamless Integration",
    description:
      "Our service works directly with your Kindle email. Set it up once, and you're ready to go!",
    icon: <BookOpen className="w-12 h-12 text-green-500" />,
  },
  {
    title: "Lightning-Fast Delivery",
    description:
      "Upload your PDF, and we'll send it to your Kindle in seconds. It's that quick!",
    icon: <Send className="w-12 h-12 text-blue-500" />,
  },
  {
    title: "Read Anywhere, Anytime",
    description:
      "Access your PDFs on any Kindle device or app. Your library, your way.",
    icon: <Check className="w-12 h-12 text-pink-500" />,
  },
];

export default function Component() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState("");

  const [responseState, setResponseState] = useState<
    "success" | "error" | "loading" | null
  >(null);
  const [message, setMessage] = useState("");

  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [htmlLoading, setHtmlLoading] = useState(false);

  const [summaryContent, setSummaryContent] = useState(false);
  const [showSummaryContent, setShowSummaryContent] = useState<string | null>(
    null
  );

  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDisclaimer(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  // const nextSlide = () => {
  //   setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
  // }

  // const prevSlide = () => {
  //   setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)
  // }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const uploadedFile = event.target.files[0];
      setFile(uploadedFile);

      console.log("Hello");
      const formData = new FormData();
      formData.append("file", uploadedFile);

      // OpenAI API Call
      try {
        const response = await fetch(
          "https://kindle-backend-latest.onrender.com/summarize",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();

          // const truncatedSummary =
          //   data.summary.summary.length > 500
          //     ? data.summary.summary.substring(0, 500) + "..."
          //     : data.summary.summary;

          setShowSummaryContent(data.summary.summary);
          setSummaryContent(true);
        } else {
        }
      } catch (error) {}
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setResponseState("loading");
    setMessage("Converting and sending to kindle...");

    if (!file || !email) {
      alert("Please provide both a file and an email.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://kindle-backend-latest.onrender.com/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResponseState("success");
        setMessage("Book sent successfully!");

        setTimeout(() => {
          setResponseState(null);
        }, 3000);
      } else if (response.status === 500) {
        setResponseState("error");
        setMessage("Failed to convert your pdf");
        setTimeout(() => {
          setResponseState(null);
        }, 3000);
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseState("error");
      setMessage("Network error or server is down.");

      setTimeout(() => {
        setResponseState(null);
      }, 3000);
    }
  };

  const handleConvert = async (event: React.FormEvent) => {
    event.preventDefault();

    setHtmlLoading(true);
    const formData = new FormData();

    if (!file) {
      alert("Please provide a file.");
      return;
    }

    formData.append("file", file);

    try {
      const response = await fetch(
        "https://kindle-backend-latest.onrender.com/convert",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.html);
        setHtmlContent(data.html);
        setHtmlLoading(false);
        alert("Conversion successfully!");
      } else {
        alert("Something goes wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("error");
    }
  };

  const handlePreview = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (htmlContent) {
      setShowPreview(true);
    } else {
      alert("Please convert a file to kindle format to view preview content.");
    }
  };

  const handleMetadataChange = (metadata: Metadata) => {
    if (metadata) {
      console.log(metadata);
    }
  };

  return (
    <div>
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Send PDFs to Your Kindle in Seconds
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Transform any document into a Kindle-friendly format with just a few
            clicks.
          </p>
          {/* <div className="mb-8">
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
          </Button> */}
        </div>
        {/* 
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
        </Card> */}

        <div className="flex items-stretch space-x-8">
          <div className="bg-white shadow-xl rounded-2xl p-8 mb-12 w-1/2 h-auto">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Upload Your PDF
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                {responseState && (
                  <Spinner responseState={responseState} message={message} />
                )}
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-purple-300 border-dashed rounded-lg cursor-pointer bg-purple-50 hover:bg-purple-100 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 mb-4 text-purple-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF (MAX. 100MB)</p>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf"
                  />
                </label>
                {file && (
                  <p className="mt-2 text-sm text-gray-500">
                    Selected file: {file.name}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="kindle-email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
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
                <p className="mt-2 text-sm text-gray-500">
                  Don't forget to add our email to your Amazon approved list for
                  Kindle.
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                {/* Botones en una sola fila */}
                <div className="flex space-x-4">
                  <Button
                    value="convert"
                    onClick={handleConvert}
                    className={`text-white font-bold py-3 px-6 rounded-md transition-colors w-1/2 ${
                      file
                        ? "bg-gray-600 hover:bg-gray-700 cursor-pointer"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Convert
                  </Button>
                  <Button
                    value="preview"
                    onClick={handlePreview}
                    className={`text-white font-bold py-3 px-6 rounded-md transition-colors w-1/2 ${
                      htmlContent
                        ? "bg-gray-600 hover:bg-gray-700 cursor-pointer"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Show Preview
                  </Button>
                </div>

                {/* Botón destacado en una fila aparte */}
                <Button
                  value="send"
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md transition-colors"
                >
                  Send to Kindle
                </Button>
              </div>
            </form>
          </div>
          <div className="bg-white shadow-xl rounded-2xl p-8 mb-12 w-full md:w-1/2 h-auto">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between">
                <h4 className="text-xl font-semibold text-gray-800">
                  Kindle Metadata
                </h4>

                {showPreview && htmlContent && (
                  <KindleSimulator htmlContent={htmlContent} />
                )}
              </div>
              <p className="text-sm text-gray-500 mb-4">
                <MetadataForm onProcessMetadata={handleMetadataChange} />
              </p>

              <div className="">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  Summary Content
                </h4>
                {summaryContent ? (
                  <div className="max-h-50 overflow-y-scroll p-4 border border-gray-300 rounded">
                    <p className="2xl:text-base xl:text-sm text-xs italic">
                      {showSummaryContent}
                    </p>
                  </div>
                ) : (
                  <div className="max-h-48 overflow-y-scroll p-4 border border-gray-300 rounded">
                    <p className="2xl:text-base xl:text-sm text-xs italic">
                      Lorem Ipsum es simplemente el texto de relleno de las
                      imprentas y archivos de texto. Lorem Ipsum ha sido el
                      texto de relleno estándar de las industrias desde el año
                      1500, cuando un impresor (N. del T. persona que se dedica
                      a la imprenta) desconocido usó una galería de textos y los
                      mezcló de tal manera que logró hacer un libro de textos
                      especimen. No sólo sobrevivió 500 años, sino que tambien
                      ingresó como texto de relleno en documentos electrónicos,
                      quedando esencialmente igual al original. Fue popularizado
                      en los 60s con la creación de las hojas "Letraset", las
                      cuales contenian pasajes de Lorem Ipsum, y más
                      recientemente con software de autoedición, como por
                      ejemplo Aldus PageMaker, el cual incluye versiones de
                      Lorem Ipsum.
                    </p>
                  </div>
                )}
              </div>
              {/* <div className="mt-4">
                <KindleSimulator htmlContent={htmlContent || ""} />
              </div> */}
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Why Choose KindlePDF?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <BookOpen className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Vast Compatibility</h4>
              <p className="text-gray-600">
                Works with all types of PDFs and Kindle devices.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Rocket className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Lightning Fast</h4>
              <p className="text-gray-600">
                Get your PDFs on your Kindle in seconds, not minutes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Check className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Secure & Private</h4>
              <p className="text-gray-600">
                Your documents are encrypted and never stored.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={showDisclaimer} onOpenChange={setShowDisclaimer}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              ⚠️ Important Legal Notice ⚠️
            </DialogTitle>
          </DialogHeader>
          <div className="text-sm">
            <p className="mb-4">
              By uploading a PDF to our platform, you confirm that:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                You own the content or have explicit permission from the
                copyright holder to share and distribute this file.
              </li>
              <li>
                You will not upload any copyrighted content without the proper
                authorization to do so.
              </li>
              <li>
                You are responsible for ensuring that the content you upload
                complies with all applicable copyright laws.
              </li>
              <li>
                Uploading unauthorized or illegal content may result in account
                suspension or legal action.
              </li>
            </ul>
            <p>
              For more information, please review our Terms of Service and
              Privacy Policy.
            </p>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={() => setShowDisclaimer(false)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              I Agree
            </Button>
            <Button onClick={() => setShowDisclaimer(false)} variant="outline">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
