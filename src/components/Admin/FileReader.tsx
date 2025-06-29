import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface FileReadersProps {
  setImageSrc: (src: string | null) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

// דחיסת תמונה
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
        if (!ctx) return reject(new Error("Canvas error"));

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
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

const FileReaders: React.FC<FileReadersProps> = ({ setImageSrc, setFormData }) => {
  const [images, setImages] = useState<string[]>([]);

  const saveImage = async (compressedImage: string) => {
    try {
      const docRef = await addDoc(collection(db, "gallery"), {
        url: compressedImage,
      });
      return { id: docRef.id, url: compressedImage };
    } catch (err) {
      console.error("שגיאה בשמירה:", err);
      return null;
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

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
        console.error("שגיאה בדחיסה:", err);
      }
    }

    if (newImageUrls.length > 0) {
      setImageSrc(newImageUrls[0]); // רק להצגה
      setFormData((prev: any) => ({
        ...prev,
        coverImage: newGalleryIds[0],      // רק הראשונה בתור תמונה ראשית
        gallery: [...(prev.gallery || []), ...newGalleryIds.slice(1)], // השאר לגלריה
      }));
      setImages((prev) => [...prev, ...newImageUrls]);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />

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
