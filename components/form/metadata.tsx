import React from "react";
import { Metadata } from "@/app/interfaces";

interface MetadataFormProps {
  onProcessMetadata: (metadata: Metadata) => void;
  formData: Metadata;
}

const MetadataForm = ({
  onProcessMetadata,
  formData = {
    title: "",
    author: "",
    genre: "",
    language: "en",
  },
}: MetadataFormProps) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;

    const updatedMetadata: Metadata = {
      ...formData,
      [id]: value,
    };

    onProcessMetadata(updatedMetadata);
  };

  return (
    <form className="p-4 mx-auto" onSubmit={(e) => e.preventDefault()}>
      <div className="mb-4 flex flex-col lg:flex-row gap-6">
        <div className="items-center gap-2">
          <label
            className="block text-sm font-medium text-gray-700 min-w-[65px] mb-1"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            value={formData.title} // Usar formData directamente
            className="block w-full h-[42px] border border-gray-300 rounded-md p-2"
            type="text"
            id="title"
            onChange={handleChange} // Actualizar datos al cambiar
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
            value={formData.author} // Usar formData directamente
            className="block w-full h-[42px] border border-gray-300 rounded-md p-2"
            type="text"
            id="author"
            onChange={handleChange} // Actualizar datos al cambiar
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
            value={formData.genre} // Usar formData directamente
            className="block w-full h-[42px] border border-gray-300 rounded-md p-2"
            type="text"
            id="genre"
            onChange={handleChange} // Actualizar datos al cambiar
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
            value={formData.language} // Usar formData directamente
            className="block w-full h-[42px] border border-gray-300 rounded-md p-2 mb-1"
            id="language"
            onChange={handleChange} // Actualizar datos al cambiar
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default MetadataForm;
