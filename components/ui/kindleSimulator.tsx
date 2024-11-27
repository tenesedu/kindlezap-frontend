import React, { useState } from "react";

interface KindleSimulatorProps {
  htmlContent: string; // El contenido HTML que quieres mostrar
}

const KindleSimulator: React.FC<KindleSimulatorProps> = ({ htmlContent }) => {
  return (
    <div className="container d-flex justify-content-center align-items-center py-5 text-center">
      <div className="kindle ">
        <div className="screen">
          {/* Renderizar el contenido HTML con scroll */}
          <div
            id="book-content"
            style={{ overflowY: "auto", height: "100%" }}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default KindleSimulator;
