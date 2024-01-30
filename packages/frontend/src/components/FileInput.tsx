import { ChangeEvent, useState } from "react";

export default function FileInput() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".jpg, .jpeg, .png, .gif, .svg, .txt, .doc, .docx, .pdf"
      />
      {selectedFile && <img src={previewSrc} alt="preview" />}
    </>
  );
}
