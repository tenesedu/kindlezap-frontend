'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {

    const faqItems = [
        {
            question: "What is KindleZap?",
            answer: "KindleZap is a platform that allows you to convert and send PDFs directly to your Kindle device or app for free reading. Simply upload a PDF, enter your Kindle email address, and we'll send the file straight to your device."
        },
        {
            question: "How do I send a PDF to my Kindle?",
            answer: "To send a PDF to your Kindle, follow these simple steps:\n• Step 1: Upload the PDF you want to convert.\n• Step 2: Enter the email address associated with your Kindle account.\n• Step 3: Click \"Send to Kindle\" and your file will be delivered in a Kindle-compatible format."
        },
        {
            question: "Do I need to pay to use this service?",
            answer: "No! KindleZap is completely free to use. You can upload and send as many PDFs as you like, with no hidden fees."
        },
        {
            question: "Can I upload any PDF to this platform?",
            answer: "No, you are only allowed to upload PDFs that you own or have permission to share. By uploading a PDF, you confirm that you have the legal right to distribute it. Please ensure that all uploaded content complies with copyright laws."
        },
        {
            question: "How do I know if the PDF is legal to upload?",
            answer: "You can upload a PDF if:\n• You purchased or created the content.\n• You have explicit permission from the copyright holder to share or distribute it.\nIf you are unsure, do not upload the file. You are fully responsible for ensuring that the content complies with copyright regulations."
        },
        {
            question: "What happens if I upload copyrighted content without permission?",
            answer: "Uploading copyrighted material without permission is a violation of copyright laws and our Terms of Service. If we detect or are notified about infringing content, we may:\n• Remove the content.\n• Suspend or terminate your account.\n• Take appropriate legal action if necessary."
        },
        {
            question: "How do I get my Kindle email address?",
            answer: "To find your Kindle email address:\n1. Go to the \"Manage Your Content and Devices\" section of your Amazon account.\n2. Under the \"Devices\" tab, select your Kindle.\n3. Your Kindle email address will appear as something like [yourname]@kindle.com."
        },
        {
            question: "Can I upload non-PDF files (e.g., EPUB, DOCX)?",
            answer: "Currently, our platform only supports PDF files. If you have other formats (like EPUB or DOCX), you can convert them to PDF using free online tools, then upload the converted PDF to our platform."
        },
        {
            question: "How long does it take to send a PDF to my Kindle?",
            answer: "Once you upload the PDF and enter your Kindle email address, the file will typically be sent within a few minutes. However, depending on the size of the file and your internet connection, it may take longer."
        },
        {
            question: "Can I send multiple PDFs to my Kindle at once?",
            answer: "At this time, we only support sending one PDF at a time. However, you can upload and send PDFs consecutively, one after the other."
        },
        {
            question: "What should I do if I don't receive my PDF on Kindle?",
            answer: "If you don't receive the PDF on your Kindle:\n• Check your Kindle email address to make sure it was entered correctly.\n• Check your Spam/Junk folder for the email.\n• Ensure that your Kindle device is connected to the internet.\n• Try sending the PDF again.\nIf you're still having trouble, contact us at [Insert Contact Email] for assistance."
        },
        {
            question: "How can I delete my account?",
            answer: "If you'd like to delete your account or request the removal of your data, please contact us at [Insert Contact Email]. We will process your request promptly and ensure that your data is removed in accordance with our privacy policy."
        },
        {
            question: "Is my personal information safe?",
            answer: "Yes! We take your privacy seriously. We only collect the information necessary to provide our services, and we will never share your personal data with third parties without your consent. For more information, please read our full Privacy Policy."
        },
        {
            question: "What if I need help or have more questions?",
            answer: "If you have any questions or need assistance, feel free to reach out to our support team. You can contact us at:\n• Email: [Insert Contact Email]\n• Phone: [Insert Contact Number]\n• Live Chat: Available [Insert Hours of Operation]"
        }
    ]

    return (
        <div>

            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="bg-white shadow-xl rounded-2xl p-8 mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions (FAQ)</h2>
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger className="text-left">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-gray-600 whitespace-pre-line">{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </main>
        </div>
    )
}