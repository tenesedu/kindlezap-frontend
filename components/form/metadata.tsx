import React, { useState } from "react";
import { Metadata } from "@/app/interfaces";

interface MetadataFormProps {
  onProcessMetadata: (metadata: Metadata) => void;
}

const MetadataForm = ({ onProcessMetadata }: MetadataFormProps) => {
  const [metadata, setMetadata] = useState<Metadata>({
    title: "",
    author: "",
    genre: "",
    language: "en",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    event.preventDefault();

    const { id, value } = event.target;

    setMetadata((prevMetadata) => ({
      ...prevMetadata,
      [id]: value,
    }));

    if (onProcessMetadata) {
      onProcessMetadata({
        ...metadata,
        [id]: value,
      });
    }
  };

  return (
    <div>
      <form className="p-4 mx-auto">
        <div className="mb-4 flex flex-col lg:flex-row gap-6">
          <div className="items-center gap-2">
            <label
              className="block text-sm font-medium text-gray-700 min-w-[65px] mb-1"
              htmlFor="title"
            >
              Title:
            </label>
            <input
              value={metadata.title}
              className="block w-full h-[42px] border border-gray-300 rounded-md p-2"
              type="text"
              id="title"
              onChange={handleChange}
            />
          </div>
          <div className="items-center gap-2">
            <label
              className="block text-sm font-medium text-gray-700 min-w-[65px] mb-1"
              htmlFor="author"
            >
              Author:
            </label>
            <input
              value={metadata.author}
              className="block w-full h-[42px] border border-gray-300 rounded-md p-2"
              type="text"
              id="author"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="items-center gap-2">
            <label
              className="block text-sm font-medium text-gray-700 min-w-[65px] mb-1"
              htmlFor="genre"
            >
              Genre:
            </label>
            <input
              value={metadata.genre}
              className="block w-full h-[42px] border border-gray-300 rounded-md p-2"
              type="text"
              id="genre"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 items-center gap-2">
            <label
              className="block text-sm font-medium text-gray-700 min-w-[65px] mb-1"
              htmlFor="language"
            >
              Language:
            </label>
            <select
              value={metadata.language}
              className="block w-full h-[42px] border border-gray-300 rounded-md p-2 mb-1 "
              id="language"
              onChange={handleChange}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MetadataForm;
