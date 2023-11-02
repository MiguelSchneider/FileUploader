import React from "react";
import FileUploader from "./FileUploader/FileUploader";

export function App() {
  return (
    <div>
      <FileUploader
        acceptedTypes={[
          "image/png",
          "image/jpeg",
          "image/gif",
          "application/pdf"
        ]}
        maxFileSizeMB={3}
        uploadMessage="Click or drag file to upload"
        errorMessage="Upload failed - please try again"
        uploaderURL="http://your-api-endpoint/upload"
        defaultFileName="Your file name or instructions here"
      />
      <FileUploader
        acceptedTypes={["application/pdf"]}
        maxFileSizeMB={1}
        uploadMessage="Click  to upload"
        errorMessage="Upload failed - please try again"
        uploaderURL="http://your-api-endpoint/upload"
        defaultFileName="Another file"
      />
    </div>
  );
}
