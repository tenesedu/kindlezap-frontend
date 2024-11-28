import React, { useState } from "react";

interface KindleSimulatorProps {
  htmlContent: string; // El contenido HTML que quieres mostrar
  onClose: (isClosed: boolean) => void;
}

const KindleSimulator: React.FC<KindleSimulatorProps> = ({
  htmlContent,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center py-5 bg-red">
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div
          className=" p-6"
          style={{
            position: "relative",
            border: "1px solid lightgray",
            borderRadius: "30px",
          }}
        >
          <button
            onClick={handleClose}
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              backgroundColor: "transparent",
              color: "white",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            ✕
          </button>
          <div className="kindle ">
            <div className="screen" style={{ position: "relative" }}>
              {/* Renderizar el contenido HTML con scroll */}
              <div
                id="book-content"
                style={{ overflowY: "auto", height: "100%" }}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KindleSimulator;
