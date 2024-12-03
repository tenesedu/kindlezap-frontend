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

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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
  const [currentMetadataFormSlide, setCurrentMetadataFormSlide] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [email, setEmail] = useState("");

  const [responseState, setResponseState] = useState<
    "success" | "error" | "loading" | null
  >(null);
  const [message, setMessage] = useState("");

  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const [summaryContent, setSummaryContent] = useState(false);
  const [showSummaryContent, setShowSummaryContent] = useState<
    Array<{ summary: string }>
  >([]);

  const [metadataForm, setMetadataForm] = useState<Metadata>();

  const [forms, setForms] = useState<Array<Metadata>>([
    {
      title: "",
      author: "",
      genre: "",
      language: "en",
    },
  ]);

  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const [filesConverted, setFilesConverted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDisclaimer(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileArray = Array.from(event.target.files);
      setFiles([...files, ...fileArray]);

      const newForms = fileArray.map(() => ({
        title: "",
        author: "",
        genre: "",
        language: "en",
      }));

      setForms((prevForms) => [...prevForms, ...newForms]);
    }
  };

  const handleConvert = async () => {
    if (!files.length) {
      alert("Please select files to convert first.");
      return;
    }

    const formData = new FormData();
    for (const file of files) {
      formData.append("file", file);
    }

    setResponseState("loading");
    setMessage("converting file/s...");

    try {
      const response = await fetch(`${apiUrl}/summarize`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setResponseState("success");
        setMessage("Books converted successfully!");

        setTimeout(() => {
          setResponseState(null);
        }, 2000);

        const data = await response.json();
        console.log(data.summary.summary);

        setShowSummaryContent(data.summary.summary);
        setHtmlContent(data.html);
        setFilesConverted(true);
        setSummaryContent(true);
      } else {
        alert("Error converting files. Please try again.");
        setResponseState("error");
        setMessage("Error converting files");

        setTimeout(() => {
          setResponseState(null);
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error converting files. Please try again.");
    }
  };

  const handleSend = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!files.length || !email) {
      alert("Please provide both files and an email.");
      return;
    }

    setResponseState("loading");
    setMessage("Sending to kindle...");

    const formData = new FormData();
    formData.append("email", email);

    // Append all files
    files.forEach((file, index) => {
      formData.append("files", file);
    });

    // Append all metadata forms
    formData.append("metadata", JSON.stringify(forms));

    if (htmlContent) {
      try {
        const response = await fetch(`${apiUrl}/send`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          setResponseState("success");
          setMessage("Books sent successfully!");

          setTimeout(() => {
            setResponseState(null);
          }, 3000);
        } else {
          setResponseState("error");
          setMessage("Failed to send your books");
          setTimeout(() => {
            setResponseState(null);
          }, 3000);
        }
      } catch (error) {
        console.error("Error:", error);
        setResponseState("error");
        setMessage("Network error or server is down.");

        setTimeout(() => {
          setResponseState(null);
        }, 3000);
      }
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

  const handleSimulatorClose = (isClosed: boolean) => {
    setShowPreview(isClosed);
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
        </div>
        <div className="flex items-stretch space-x-8">
          <div className="bg-white shadow-xl rounded-2xl p-8 mb-12 w-1/2 h-auto">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Upload Your PDF
            </h3>
            <form className="space-y-6">
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
                    multiple
                    accept=".pdf"
                  />
                </label>
                {files.length > 0 && (
                  <div>
                    <p className="mt-2 text-sm text-gray-500">
                      Selected files:
                    </p>
                    <ul className="mt-1 text-sm text-purple-500 list-disc list-inside">
                      {files.map((f, index) => (
                        <li key={f.name} className="flex items-center">
                          <span>{f.name}</span>
                          <button
                            onClick={() => {
                              const newFiles = files.filter(
                                (_, i) => i !== index
                              );
                              setFiles(newFiles);
                              const newForms = forms.filter(
                                (_, i) => i !== index
                              );
                              setForms(newForms);
                            }}
                            className="ml-2 text-gray-500 hover:text-gray-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
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

              <div className="flex gap-4">
                <Button
                  onClick={handleConvert}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-md transition-colors w-1/2"
                >
                  Convert Files
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
              <Button
                value="send"
                onClick={handleSend}
                className={`text-white font-bold hover:bg-purple-700 py-3 px-6 rounded-md transition-colors w-full ${
                  filesConverted
                    ? "bg-purple-600 hover:bg-purple-700 cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!filesConverted}
              >
                Send to Kindle
              </Button>
            </form>
          </div>
          <div className="bg-white shadow-xl rounded-2xl p-8 mb-12 w-full md:w-1/2 h-auto">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between">
                <h4 className="text-xl font-semibold text-gray-800">
                  Kindle Metadata
                </h4>

                {showPreview && htmlContent && (
                  <KindleSimulator
                    htmlContent={htmlContent}
                    onClose={handleSimulatorClose}
                  />
                )}
              </div>
              {summaryContent ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="">
                      <h5 className="font-medium text-gray-700">
                        Form {currentMetadataFormSlide + 1} of {files.length}
                      </h5>
                      <p className="text-xs text-gray-400">
                        {files[currentMetadataFormSlide]?.name}
                      </p>
                    </div>

                    <div className="space-x-2">
                      <Button
                        className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                        disabled={currentMetadataFormSlide === 0}
                        onClick={() =>
                          setCurrentMetadataFormSlide((prev) =>
                            Math.max(0, prev - 1)
                          )
                        }
                      >
                        Previous
                      </Button>
                      <Button
                        className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                        disabled={currentMetadataFormSlide === files.length}
                        onClick={() =>
                          setCurrentMetadataFormSlide((prev) =>
                            Math.min(prev + 1, files.length - 1)
                          )
                        }
                      >
                        Next
                      </Button>
                    </div>
                  </div>

                  <MetadataForm
                    formData={forms[currentMetadataFormSlide]}
                    onProcessMetadata={(updatedMetadata) =>
                      setForms((prevForms) =>
                        prevForms.map((form, index) =>
                          index === currentMetadataFormSlide
                            ? updatedMetadata
                            : form
                        )
                      )
                    }
                  />
                </div>
              ) : (
                <p className="2xl:text-base xl:text-sm text-xs italic text-gray-500">
                  Convert your files to add the metadata of the books here.
                </p>
              )}

              <div className="">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  Summary Content
                </h4>
                {summaryContent ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h5 className="font-medium text-gray-700">
                        File {currentSlide + 1} of {files.length}
                      </h5>
                      <div className="space-x-2">
                        <Button
                          onClick={() =>
                            setCurrentSlide((prev) => Math.max(0, prev - 1))
                          }
                          disabled={currentSlide === 0}
                          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                        >
                          Previous
                        </Button>
                        <Button
                          onClick={() =>
                            setCurrentSlide((prev) =>
                              Math.min(files.length - 1, prev + 1)
                            )
                          }
                          disabled={currentSlide === files.length - 1}
                          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                    <div className="max-h-48 overflow-y-scroll p-4 border border-gray-300 rounded">
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        {files[currentSlide]?.name}
                      </p>
                      <p className="2xl:text-base xl:text-sm text-xs italic">
                        {showSummaryContent[currentSlide]?.summary}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="max-h-48 overflow-y-scroll p-4 border border-gray-300 rounded">
                    <p className="2xl:text-base xl:text-sm text-xs italic text-gray-500">
                      Convert your files to see their summaries here.
                    </p>
                  </div>
                )}
              </div>
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
