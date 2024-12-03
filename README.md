# KindleZap 📚

KindleZap is a modern web application that simplifies the process of converting and sending PDFs to your Kindle device. With just a few clicks, transform any PDF into a Kindle-friendly format and deliver it directly to your device.

Backend repository: https://github.com/tenesedu/kindle-backend

## ⚠️ Educational Purposes Disclaimer

**IMPORTANT: This project is strictly for educational and learning purposes only.**

This application was developed as:
- A learning exercise to demonstrate modern web development techniques
- A portfolio project to showcase full-stack development skills
- A practical implementation of file processing and API integration concepts

**Please Note:**
- This is NOT intended for commercial use
- This project should NOT be used to process copyrighted materials without proper authorization
- I assume NO responsibility for any misuse of this application
- If you're interested in converting documents for actual use, please use official Amazon services or other authorized platforms

By using or implementing this project, you acknowledge that you're doing so solely for educational purposes and accept full responsibility for compliance with all relevant laws and regulations.

## ✨ Features

- **PDF to Kindle Conversion**: Convert any PDF file into a Kindle-compatible format
- **Batch Processing**: Upload and convert multiple PDFs simultaneously
- **Metadata Editor**: Customize book metadata (title, author, genre, language)
- **Live Preview**: Preview how your document will look on a Kindle before sending
- **Content Summary**: Automatically generates summaries for uploaded documents
- **Direct Kindle Delivery**: Send converted files directly to your Kindle email

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A valid Kindle email address
- Backend server running (see backend repository)

### Installation

1. Clone the repository:
   - git clone https://github.com/yourusername/kindlezap-frontend.git
    
2. Install dependencies:
   - cd kindlezap-frontend
   - npm install
    
3. Create a `.env` file with your configuration:
   - NEXT_PUBLIC_API_URL=http://localhost:8000

4. Start the development server:
   - npm run dev


## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 13+ with App Router
- **UI Components**: Custom components with Tailwind CSS
- **State Management**: React Hooks
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **TypeScript**: For type safety and better developer experience

## 📱 Usage

1. **Upload PDF(s)**
   - Click the upload area or drag and drop your PDF files
   - Multiple files can be uploaded simultaneously

2. **Convert Files**
   - Click "Convert Files" to process your PDFs
   - Wait for the conversion and summary generation

3. **Edit Metadata**
   - Fill in the title, author, genre, and language for each book
   - Navigate between multiple books using Previous/Next buttons

4. **Preview (Optional)**
   - Click "Show Preview" to see how your book will look on a Kindle
   - Use the Kindle simulator to check formatting

5. **Send to Kindle**
   - Enter your Kindle email address
   - Click "Send to Kindle" to deliver your books

## ⚠️ Important Notes

- Make sure to add our service email to your Amazon approved senders list
- Maximum file size: 100MB per PDF
- Supported input format: PDF only
- You must own the content or have permission to convert and distribute it


## 📧 Contact

Eduardo Tenés - tenes.trillo.eduardo@gmail.com
LinkedIn - (https://www.linkedin.com/in/eduardoten%C3%A9st/)

Project Link: [https://github.com/tenesedu/kindlezap-frontend](https://github.com/yourusername/kindlezap-frontend)
