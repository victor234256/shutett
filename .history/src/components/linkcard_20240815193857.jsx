/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Copy, Download, Trash } from "lucide-react";
import useFetch from "@/useHooks/fetch";
import { deleteUrl } from "@/db/urlAPI";
import { BeatLoader } from "react-spinners";

const Linkcard = ({ url = [], fetchURL }) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef(null);

  const downloadImage = () => {
    const imageURL = url?.qrcode;
    const fileName = url?.title;

    // Create a temporary anchor element to trigger the download
    const anchor = document.createElement("a");
    anchor.href = imageURL;
    anchor.download = fileName;
    anchor.target = "_blank"; // Open in a new tab (for download)
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(`https://shutett.vercel.app/${url?.short_url}`)
      .then(() => {
        setIsCopied(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy text:", err));
  };

  const { loading: deleteLoader, fn: deleteFunction } = useFetch(
    deleteUrl,
    url.id
  );

  return (
    <div className="relative darktext-white flex flex-col md:flex-row gap-5 dark:bg-gray-900 rounded-lg border p-4 bg-white text-gray-900 shadow-xl">
      <img
        src={url?.qrcode}
        className="object-contain h-36 ring ring-blue-500 self-start"
        alt="qr code"
      />
      <span className="flex flex-col gap-2 flex-1">
        <span className="text-2xl hover:underline font-bold">{url?.title}</span>
        <span className="dark:text-blue-200 font-extrabold text-2xl cursor-pointer hover:underline text-blue-400">
          https://shuett/
          {url?.custom_url ? url?.custom_url : url.short_url}
        </span>
        <span className="flex gap-1 text-2xl hover:underline items-center">
          {url?.original_url}
        </span>
        <span className="flex items-end flex-1 text-2xl hover:underline">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </span>
      <div className="flex gap-2">
        <div className="relative group">
          <Button
            variant="ghost"
            onClick={handleCopy}
            className="relative z-10"
          >
            <Copy />
          </Button>
          <div
            className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-md transition-opacity duration-300 ease-in-out ${
              isCopied ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            Copied!
          </div>
        </div>
        <a
          href={url?.qrcode}
          download={url?.title}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 text-blue-500 bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none"
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            downloadImage(); // Trigger the download function
          }}
        >
          <Download />
        </a>
        <Button
          variant="ghost"
          onClick={() => deleteFunction().then(() => fetchURL())}
        >
          {deleteLoader ? <BeatLoader size={5} color="red" /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default Linkcard;
