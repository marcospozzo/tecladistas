"use client";

import { constants } from "@/utils/utils";
import axios from "axios";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa6";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function FotosPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = use(params);
  const [photos, setPhotos] = useState<ReactImageGalleryItem[]>([]);

  useEffect(() => {
    axios
      .get(`/api/photos/${year}`)
      .then((res) => setPhotos(res.data))
      .catch((error) => console.error("Error fetching photos:", error));
  }, [year]);

  return (
    <>
      <ImageGallery
        showPlayButton={false}
        thumbnailPosition="top"
        showIndex={true}
        lazyLoad={true}
        items={photos}
      />
      <div className="flex justify-center gap-x-2 mt-4">
        <FaCamera className="self-center" />
        <Link
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
          href={constants.PHOTOGRAPHERS_INSTAGRAM_URL}
        >
          {constants.PHOTOGRAPHERS_INSTAGRAM}
        </Link>
      </div>
    </>
  );
}
