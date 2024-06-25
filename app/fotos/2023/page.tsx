"use client";

import {
  PHOTOGRAPHERS_INSTAGRAM,
  PHOTOGRAPHERS_INSTAGRAM_URL,
} from "@/utils/constants";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa6";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default async function Page() {
  const [photos, setPhotos] = useState<ReactImageGalleryItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/photos/2023`);
        setPhotos(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-center gap-x-2 mb-4">
        <FaCamera className="self-center" />
        <Link
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
          href={PHOTOGRAPHERS_INSTAGRAM_URL}
        >
          {PHOTOGRAPHERS_INSTAGRAM}
        </Link>
      </div>
      <ImageGallery
        showPlayButton={false}
        thumbnailPosition="top"
        showIndex={true}
        lazyLoad={true}
        items={photos}
        // items={photos.map(
        //   (photo): ReactImageGalleryItem => ({
        //     original: photo.original,
        //     thumbnail: photo.thumbnail,
        //     loading: "lazy",
        //     thumbnailLoading: "lazy",
        //   })
        // )}
      />
    </>
  );
}
