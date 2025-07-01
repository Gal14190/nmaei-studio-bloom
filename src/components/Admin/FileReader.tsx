import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface FileReadersProps {
  setImageSrc: (src: string | null) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const compressImage = (
  file: File,
  quality: number = 0.7,
  maxWidth: number = 800,
  maxHeight: number = 800
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas context unavailable"));
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height *= maxWidth / width;
            width = maxWidth;
          } else {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedDataUrl);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

const FileReaders: React.FC<FileReadersProps> = ({ setImageSrc, setFormData }) => {
  const [images, setImages] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState<string>("");

  const saveImage = async (imageUrl: string) => {
    try {
      const docRef = await addDoc(collection(db, "gallery"), {
        url: imageUrl,
      });
      return { id: docRef.id, url: imageUrl };
    } catch (err) {
      console.error("שגיאה בשמירת התמונה:", err);
      return null;
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // איפוס URL כשקובץ נבחר
    setUrlInput("");

    const newImageUrls: string[] = [];
    const newGalleryIds: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const compressed = await compressImage(file);
        const saved = await saveImage(compressed);
        if (saved) {
          newImageUrls.push(saved.url);
          newGalleryIds.push(saved.id);
        }
      } catch (err) {
        console.error("שגיאה בדחיסת התמונה:", err);
      }
    }

    if (newImageUrls.length > 0) {
      setImageSrc(newImageUrls[0]);
      setFormData((prev: any) => ({
        ...prev,
        coverImage: newGalleryIds[0],
        gallery: [...(prev.gallery || []), ...newGalleryIds.slice(1)],
      }));
      setImages((prev) => [...prev, ...newImageUrls]);
    }
  };

  const handleUrlSubmit = async () => {
    const urls = urlInput
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (urls.length === 0) return;

    // איפוס קבצים
    (document.getElementById("fileInput") as HTMLInputElement).value = "";

    const newImageUrls: string[] = [];
    const newGalleryIds: string[] = [];

    for (const url of urls) {
      const saved = await saveImage(url);
      if (saved) {
        newImageUrls.push(saved.url);
        newGalleryIds.push(saved.id);
      }
    }

    if (newImageUrls.length > 0) {
      setImageSrc(newImageUrls[0]);
      setFormData((prev: any) => ({
        ...prev,
        coverImage: prev.coverImage || newGalleryIds[0],
        gallery: [...(prev.gallery || []), ...(prev.coverImage ? newGalleryIds : newGalleryIds.slice(1))],
      }));
      setImages((prev) => [...prev, ...newImageUrls]);
    }

    setUrlInput(""); // נקה את השדה אחרי שליחה
  };

  return (
    <div>
      <div className="mb-2">
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
      </div>

      <div className="">
        <input
        type="text"
          placeholder="הדבק כאן כתובות URL כל כתובת בשורה נפרדת"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <button
          onClick={handleUrlSubmit}
          className="bg-blue-500 text-white px-4 py-1 rounded mt-2"
        >
          הוסף תמונות מה-URL
        </button>
      </div>

      <div className="flex gap-2 mt-3 flex-wrap">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`uploaded-${idx}`}
            className="w-24 h-24 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
};

export default FileReaders;
