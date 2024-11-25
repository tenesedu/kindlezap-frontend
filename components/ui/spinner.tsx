
"use client";

import { Loader2, CheckCircle, XCircle } from "lucide-react";

type ResponseState = "loading" | "success" | "error";

interface SpinnerResponseProps {
    responseState: ResponseState,
    message: string;
}

export default function Spinner({responseState, message}: SpinnerResponseProps){
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div
          className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center min-w-[300px] min-h-[150px] justify-center"
        >
          <div className="flex justify-center items-center h-20">
              {responseState === "loading" && (
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
              )}
              {responseState === "success" && (
                <CheckCircle className="w-12 h-12 text-green-500" />
              )}
              {responseState === "error" && (
                <XCircle className="w-12 h-12 text-red-500" />
              )}
            </div>
            <p
              className={`text-center mt-2 ${
                responseState === "loading"
                  ? "text-blue-500"
                  : responseState === "success"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          </div>
        </div>
      );
    }